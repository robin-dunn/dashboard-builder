import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../project-manager.service';
import { ProjectManagerStore } from '../projectManagerStore';

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
    this.projectManagerService.subscribeToStore((store:ProjectManagerStore) => {
      this.projectTitle = store.project ? store.project.name : "";
      this.layers = store.layers ? store.layers.map(l => l.name) : [];
    })
  }

  changeProjectTitle(eventData) {
    this.projectManagerService.updateStore(store => store.project.name = eventData);
  }

}
