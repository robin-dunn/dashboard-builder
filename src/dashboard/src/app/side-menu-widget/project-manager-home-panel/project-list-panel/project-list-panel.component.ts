import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
  }

  public clickProject(projectId: number) {
    this.projectManagerService.openProject(projectId);
  }
}
