import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as MainActions from "../../../../main.actions";

@Component({
  selector: 'app-create-layer-panel',
  templateUrl: './create-layer-panel.component.html',
  styleUrls: ['./create-layer-panel.component.css']
})
export class CreateLayerPanelComponent implements OnInit {

  constructor(private store:Store<AppState>) {
  }

  ngOnInit() {
  }

  clickManualPinsTool(event) {
    this.store.dispatch(new MainActions.SelectTool("manualPins"));
  }
}
