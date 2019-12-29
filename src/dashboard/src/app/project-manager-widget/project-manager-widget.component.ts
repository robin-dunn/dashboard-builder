import { Component, OnInit, Input } from '@angular/core';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddLayerComponent } from '../dialog-add-layer/dialog-add-layer.component';
import { LayerService } from '../services/layer.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-manager-widget',
  templateUrl: './project-manager-widget.component.html',
  styleUrls: ['./project-manager-widget.component.css']
})
export class ProjectManagerWidgetComponent implements OnInit {

  @Input()
  widgetConfig: IWidgetConfig;

  layerDialogRef: MatDialogRef<DialogAddLayerComponent>;

  layerStore: Subject<any>;
  public layers: string[] = [];

  constructor(private dialog: MatDialog,
    private layerService: LayerService) {}

  ngOnInit() {
    this.layerService.createStore(this.widgetConfig.id);
    this.getLayers();
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
    this.layerService.getLayers(this.widgetConfig.id);
  }
}
