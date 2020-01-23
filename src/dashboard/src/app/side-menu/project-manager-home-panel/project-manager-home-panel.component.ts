import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../project-manager.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appState';
import * as AppActions from "../../app-store/app.actions";

@Component({
  selector: 'app-project-manager-home-panel',
  templateUrl: './project-manager-home-panel.component.html',
  styleUrls: ['./project-manager-home-panel.component.css']
})
export class ProjectManagerHomePanelComponent implements OnInit {

  constructor(
    private projectManagerService: ProjectManagerService,
    private store: Store<AppState>) {}

  ngOnInit() {
  }

  public clickCreateProject(event) {
    this.projectManagerService.createProject$().subscribe(response => {
      if (response.ok) {

      }
    });
  }

  public clickManageData(event) {
    this.store.dispatch(new AppActions.ChangeView("DataManager"));
  }
}
