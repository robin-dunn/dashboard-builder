import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MainActions from "../../main.actions";
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-project-manager-home-panel',
  templateUrl: './project-manager-home-panel.component.html',
  styleUrls: ['./project-manager-home-panel.component.css']
})
export class ProjectManagerHomePanelComponent implements OnInit {

  constructor(
    private store: Store<AppState>) {}

  ngOnInit() {
  }

  public clickCreateProject(event) {
    this.store.dispatch(new MainActions.CreateProject(""));
  }

  public clickManageData(event) {
    this.store.dispatch(new MainActions.ChangeView("DataManager"));
  }
}
