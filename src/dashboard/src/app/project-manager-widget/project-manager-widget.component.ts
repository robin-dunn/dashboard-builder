import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddLayerComponent } from './dialog-add-layer/dialog-add-layer.component';
import { LayerService } from '../services/layer.service';
import { Subject } from 'rxjs';
import { LayerStore } from '../services/layerStore';

@Component({
  selector: 'app-project-manager-widget',
  templateUrl: './project-manager-widget.component.html',
  styleUrls: ['./project-manager-widget.component.css']
})
export class ProjectManagerWidgetComponent implements OnInit, AfterViewInit {

  @Input() widgetConfig: IWidgetConfig;
  @ViewChild("container") container: ElementRef;
  @ViewChild("slider") slider: ElementRef;

  public menuTitle = "Home";

  layerDialogRef: MatDialogRef<DialogAddLayerComponent>;

  layerStore: Subject<LayerStore>;
  public layers: string[] = [];

  constructor(
    private dialog: MatDialog,
    private layerService: LayerService) {}

  public widthSubject = new Subject<number>();
  public navigationDepth = 0;

  emitWidthToChild() {
    this.widthSubject.next((this.container.nativeElement as HTMLElement).offsetWidth);
  }

  navigateBack(event) {
    console.log("NAV BACK");
  }

  slideChange(eventData: ISliderNavigationEvent) {
    this.menuTitle = eventData.targetSlideTitle;
    this.navigationDepth += eventData.direction == "forward" ? 1 : -1;
  }

  ngOnInit() {
    this.layerStore = this.layerService.createStore(this.widgetConfig.id);
    this.layerStore.subscribe(layerStore => {
      this.layers = layerStore.layers.map(layer => layer.name)
    });
    this.getLayers();
  }

  ngAfterViewInit() {
    console.log(this.container.nativeElement);
  }

  public openAddLayerDialog(){

    console.log((this.container.nativeElement as HTMLElement).offsetWidth);
    this.layerDialogRef = this.dialog.open(
      DialogAddLayerComponent,
      { data: { storeId: this.widgetConfig.id }
    });

    this.layerDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getLayers();
      }
    });
  }

  private getLayers() {
    this.layerService.getLayers(this.widgetConfig.id);
  }
}
