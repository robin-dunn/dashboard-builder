import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as MainActions from "../../../../../main.actions";

@Component({
  selector: 'app-select-feature',
  templateUrl: './select-feature.component.html',
  styleUrls: ['./select-feature.component.css']
})
export class SelectFeatureComponent implements OnInit {

  public radioEditType: string = "editSingle";

  constructor(private store:Store<AppState>) {
    this.selectEditMode(this.radioEditType);
  }

  ngOnInit() {
  }

  onItemChange(event) {
    this.radioEditType = event.target.value;
    this.selectEditMode(this.radioEditType);
  }

  selectEditMode(editMode:string) {
    this.store.dispatch(new MainActions.SelectEditMode(editMode));
  }
}
