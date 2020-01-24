import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MainActions from "../../../main.actions";
import { Project } from 'src/app/models/project';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-project-list-panel',
  templateUrl: './project-list-panel.component.html',
  styleUrls: ['./project-list-panel.component.css']
})
export class ProjectListPanelComponent implements OnInit {

  public projects: Project[];

  constructor(private store: Store<AppState>){
  }

  ngOnInit() {
    this.store.select(state => state).subscribe(state => {
      console.log(state);
      if (state.main && state.main.projects && state.main.projects.length > 0){
        this.projects = state.main.projects;
      }
    });

    this.store.dispatch(new MainActions.GetProjects());
  }

  public clickProject(projectId: number) {
    let project = this.projects.find(p => p.id === projectId);
    this.store.dispatch(new MainActions.OpenProject(project));
  }
}
