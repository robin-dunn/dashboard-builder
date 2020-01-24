import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../project-manager.service';
import { Store } from '@ngrx/store';
import * as MainActions from "../../main.actions";
import { MainState } from 'src/app/main.reducer';

@Component({
  selector: 'app-project-manager-home-panel',
  templateUrl: './project-manager-home-panel.component.html',
  styleUrls: ['./project-manager-home-panel.component.css']
})
export class ProjectManagerHomePanelComponent implements OnInit {

  constructor(
    private projectManagerService: ProjectManagerService,
    private store: Store<MainState>) {}

  ngOnInit() {
  }

  public clickCreateProject(event) {
    this.projectManagerService.createProject$().subscribe(response => {
      if (response.ok) {

      }
    });
  }

  public clickManageData(event) {
    this.store.dispatch(new MainActions.ChangeView("DataManager"));
  }
}
