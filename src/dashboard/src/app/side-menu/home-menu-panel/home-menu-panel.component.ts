import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MainActions from "../../main.actions";
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-home-menu-panel',
  templateUrl: './home-menu-panel.component.html',
  styleUrls: ['./home-menu-panel.component.css']
})
export class HomeMenuPanelComponent implements OnInit {

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
