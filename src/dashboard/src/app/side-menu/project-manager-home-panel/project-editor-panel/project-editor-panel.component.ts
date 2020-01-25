import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as MainActions from "../../../main.actions";
import { Layer } from 'src/app/models/layer';

@Component({
  selector: "app-project-editor-panel",
  templateUrl: "./project-editor-panel.component.html",
  styleUrls: ["./project-editor-panel.component.css"]
})
export class ProjectEditorPanelComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public projectTitle = "";
  public layers: Layer[] = [];
  private projectId: number;

  ngOnInit() {
    this.store.subscribe(state => {
      this.projectId = state.main.currentProjectId;
      this.projectTitle = state.main.currentProject ? state.main.currentProject.name : "";
      this.layers = state.main.projectLayers ? state.main.projectLayers : [];
    })
  }

  changeProjectTitle(eventData) {
    this.store.dispatch(new MainActions.UpdateProject(p => { p.name = eventData; return p; }));
  }

  clickCreateLayer(event) {
    if (this.projectId > 0) {
      this.store.dispatch(new MainActions.CreateLayer({ projectId: this.projectId }));
    }
  }

}
