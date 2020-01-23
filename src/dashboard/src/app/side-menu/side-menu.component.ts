import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddLayerComponent } from './project-manager-home-panel/project-editor-panel/create-layer-panel/import-data-panel/dialog-add-layer/dialog-add-layer.component';
import { Subject } from 'rxjs';
import { SliderViewComponent } from '../slider-view/slider-view.component';
import { ProjectManagerService } from './project-manager.service';
import { IProjectManagerStoreState } from './IProjectManagerStoreState';
import { AppState } from '../models/appState';
import * as AppActions from "../app-store/app.actions";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  providers: [ProjectManagerService]
})
export class SideMenuComponent implements OnInit {

  @Input() widgetConfig: IWidgetConfig;
  @ViewChild("container") container: ElementRef;
  @ViewChild("slider") slider: SliderViewComponent;

  public menuTitle = "Home";

  layerDialogRef: MatDialogRef<DialogAddLayerComponent>;

  public layers: string[] = [];
  public project: any;

  constructor(
    private dialog: MatDialog,
    private projectManagerService: ProjectManagerService,
    private store: Store<AppState>) {}

  public widthSubject = new Subject<number>();
  public navigationDepth = 0;

  ngOnInit() {
    this.projectManagerService.store.subscribe((storeState:IProjectManagerStoreState) => {
      this.project = storeState.project;
      this.layers = storeState.layers.map(layer => layer.name);
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
    this.store.dispatch(new AppActions.SideMenuChanged(eventData.targetSlideId));
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
