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
    this.store.select(state => state.main.editMode).subscribe(editMode => {
      console.log(">> Edit Change ["+editMode+"]");
      this.radioEditType = editMode;
      console.log("RET", this.radioEditType);
    });
    //this.selectEditMode(this.radioEditType);
  }

  ngOnInit() {
  }

  onItemChange(event) {
    console.log("TEST", event.target);
    this.selectEditMode(event.target.value);
  }

  selectEditMode(editMode:string) {
    this.store.dispatch(new MainActions.SelectEditMode(editMode));
  }
}
