import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddLayerComponent } from './dialog-add-layer/dialog-add-layer.component';
import { Subject } from 'rxjs';
import { SliderViewComponent } from '../slider-view/slider-view.component';
import { ProjectManagerService } from './project-manager.service';
import { ProjectManagerStore } from './projectManagerStore';

@Component({
  selector: 'app-project-manager-widget',
  templateUrl: './project-manager-widget.component.html',
  styleUrls: ['./project-manager-widget.component.css'],
  providers: [ProjectManagerService]
})
export class ProjectManagerWidgetComponent implements OnInit {

  @Input() widgetConfig: IWidgetConfig;
  @ViewChild("container") container: ElementRef;
  @ViewChild("slider") slider: SliderViewComponent;

  public menuTitle = "Home";

  layerDialogRef: MatDialogRef<DialogAddLayerComponent>;

  store: Subject<ProjectManagerStore>;
  public layers: string[] = [];
  public project: any;

  constructor(
    private dialog: MatDialog,
    private projectManagerService: ProjectManagerService) {}

  public widthSubject = new Subject<number>();
  public navigationDepth = 0;

  ngOnInit() {
    this.projectManagerService.subscribeToStore((store:ProjectManagerStore) => {
      this.project = store.project;
      this.layers = store.layers.map(layer => layer.name);
    });
    this.getLayers();
  }

  emitWidthToChild() {
    this.widthSubject.next((this.container.nativeElement as HTMLElement).offsetWidth);
  }

  navigateBack(event) {
    this.slider.navigate("backward");
  }

  slideChange(eventData: ISliderNavigationEvent) {
    this.menuTitle = eventData.targetSlideTitle;
    this.navigationDepth += eventData.direction == "forward" ? 1 : -1;
  }

  public openAddLayerDialog(){

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
    this.projectManagerService.getLayers();
  }
}
