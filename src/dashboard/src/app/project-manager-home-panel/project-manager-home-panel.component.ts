import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../project-manager-widget/project-manager.service';

@Component({
  selector: 'app-project-manager-home-panel',
  templateUrl: './project-manager-home-panel.component.html',
  styleUrls: ['./project-manager-home-panel.component.css']
})
export class ProjectManagerHomePanelComponent implements OnInit {

  constructor(
    private projectManagerService: ProjectManagerService) {}

  ngOnInit() {
  }

  public clickCreateProject(event) {
    this.projectManagerService.createProject$().subscribe(response => {
      if (response.ok) {

      }
    });
  }
}
