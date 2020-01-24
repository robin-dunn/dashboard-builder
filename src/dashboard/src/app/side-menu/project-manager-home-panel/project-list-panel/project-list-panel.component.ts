import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MainState } from '../../../main.reducer';
import * as MainActions from "../../../main.actions";
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
  private store: Store<MainState>){
  }

  ngOnInit() {
    // TODO: subscribe to projects
    this.store.select(state => state.projects).subscribe(state => console.log(state));
    this.store.dispatch(new MainActions.GetProjects());
  }

  public clickProject(projectId: number) {
    this.projectManagerService.openProject(projectId);
  }
}
