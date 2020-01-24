import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import * as AppActions from "../../../app-store/app.actions";
import { ProjectManagerService } from '../../project-manager.service';

@Component({
  selector: 'app-project-list-panel',
  templateUrl: './project-list-panel.component.html',
  styleUrls: ['./project-list-panel.component.css']
})
export class ProjectListPanelComponent implements OnInit {

  // TODO: get projects from server
  public projects: any[] = [
    {id:1, name:"P1"},
    {id: 2, name:"P2"}
  ];

  constructor(private projectManagerService: ProjectManagerService,
  private store: Store<AppState>){
  }

  ngOnInit() {
    // TODO: subscribe to projects
    this.store.select("app").subscribe(state => console.log(state));
    this.store.dispatch(new AppActions.GetProjects());
  }

  public clickProject(projectId: number) {
    this.projectManagerService.openProject(projectId);
  }
}
