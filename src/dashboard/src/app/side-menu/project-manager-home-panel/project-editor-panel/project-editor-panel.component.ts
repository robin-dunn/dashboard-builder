import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as MainActions from "../../../main.actions";

@Component({
  selector: "app-project-editor-panel",
  templateUrl: "./project-editor-panel.component.html",
  styleUrls: ["./project-editor-panel.component.css"]
})
export class ProjectEditorPanelComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  projectTitle = "";
  layers: string[] = [];

  ngOnInit() {
    this.store.subscribe(state => {
      this.projectTitle = state.main.currentProject ? state.main.currentProject.name : "";
      //this.layers = state.main.layers ? store.layers.map(l => l.name) : [];
    })
  }

  changeProjectTitle(eventData) {
    this.store.dispatch(new MainActions.UpdateProject(p => { p.name = eventData; return p; }));
  }

}
