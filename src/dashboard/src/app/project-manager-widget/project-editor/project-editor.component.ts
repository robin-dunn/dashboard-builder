import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../project-manager.service';
import { ProjectManagerStore } from '../ProjectManagerStore';

@Component({
  selector: "app-project-editor",
  templateUrl: "./project-editor.component.html",
  styleUrls: ["./project-editor.component.css"]
})
export class ProjectEditorComponent implements OnInit {

  constructor(private projectManagerService: ProjectManagerService) { }

  projectTitle = "";

  ngOnInit() {
    this.projectManagerService.subscribeToStore((store:ProjectManagerStore) => {
      this.projectTitle = store.project ? store.project.name : "";
    })
  }

  changeProjectTitle(eventData) {
    this.projectManagerService.updateStore(store => store.project.name = eventData);
  }

}
