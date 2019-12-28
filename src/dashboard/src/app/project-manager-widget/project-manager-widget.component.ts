import { Component, OnInit, Input } from '@angular/core';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddLayerComponent } from '../dialog-add-layer/dialog-add-layer.component';
import { LayerService } from '../services/layer.service';

@Component({
  selector: 'app-project-manager-widget',
  templateUrl: './project-manager-widget.component.html',
  styleUrls: ['./project-manager-widget.component.css']
})
export class ProjectManagerWidgetComponent implements OnInit {

  @Input()
  widgetConfig: IWidgetConfig;

  layerDialogRef: MatDialogRef<DialogAddLayerComponent>;

  public layers: string[] = [];

  constructor(private dialog: MatDialog,
    private layerService: LayerService) {}

  ngOnInit() {
    this.getLayers();
  }

  public openAddLayerDialog(){
    const me = this;
    this.layerDialogRef = this.dialog.open(DialogAddLayerComponent);

    this.layerDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        me.getLayers();
      }
    });
  }

  private getLayers() {
    const me = this;
    this.layerService.getLayers().subscribe(result => {
      me.layers = Array.isArray(result)
        ? result.map(layer => layer.name)
        : [];
    });
  }
}
