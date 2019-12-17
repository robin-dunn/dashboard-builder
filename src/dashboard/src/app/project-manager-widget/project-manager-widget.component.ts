import { Component, OnInit, Input } from '@angular/core';
import { IWidgetConfig } from '../../../../models/widgetConfig';

@Component({
  selector: 'app-project-manager-widget',
  templateUrl: './project-manager-widget.component.html',
  styleUrls: ['./project-manager-widget.component.css']
})
export class ProjectManagerWidgetComponent implements OnInit {

  @Input()
  widgetConfig:IWidgetConfig;

  public layers: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  public btnAddLayerClick(){
    let layerName = prompt("Enter layer name");
    this.layers.push(layerName);
  }
}
