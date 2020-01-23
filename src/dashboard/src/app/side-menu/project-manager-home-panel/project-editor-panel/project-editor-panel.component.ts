import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../../project-manager.service';
import { IProjectManagerStoreState } from '../../IProjectManagerStoreState';

@Component({
  selector: "app-project-editor-panel",
  templateUrl: "./project-editor-panel.component.html",
  styleUrls: ["./project-editor-panel.component.css"]
})
export class ProjectEditorPanelComponent implements OnInit {

  constructor(private projectManagerService: ProjectManagerService) { }

  projectTitle = "";
  layers: string[] = [];

  ngOnInit() {
    this.projectManagerService.store.subscribe((store:IProjectManagerStoreState) => {
      this.projectTitle = store.project ? store.project.name : "";
      this.layers = store.layers ? store.layers.map(l => l.name) : [];
    })
  }

  changeProjectTitle(eventData) {
    //this.projectManagerService.store.update(store => store.project.name = eventData);
  }

}
