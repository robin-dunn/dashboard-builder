import { Component, OnInit, Input } from '@angular/core';
import { IWidgetConfig } from '../../../../models/widgetConfig';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddLayerComponent } from '../dialog-add-layer/dialog-add-layer.component';

@Component({
  selector: 'app-project-manager-widget',
  templateUrl: './project-manager-widget.component.html',
  styleUrls: ['./project-manager-widget.component.css']
})
export class ProjectManagerWidgetComponent implements OnInit {

  @Input()
  widgetConfig:IWidgetConfig;

  layerDialogRef: MatDialogRef<DialogAddLayerComponent>;

  public layers: string[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
  }

  public openAddLayerDialog(){
    this.layerDialogRef = this.dialog.open(DialogAddLayerComponent);
    //this.layers.push(layerName);
  }
}
