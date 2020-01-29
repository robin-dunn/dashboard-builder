import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MainActions from "../../main.actions";
import { AppState } from 'src/app/reducers';
import { Layer } from 'src/app/models/layer';

@Component({
  selector: 'app-upload-sdl-panel',
  templateUrl: './upload-sdl-panel.component.html',
  styleUrls: ['./upload-sdl-panel.component.css']
})
export class UploadSdlPanelComponent implements OnInit {

  public layerName = "";
  public layers: Layer[];

  private uploadedFiles: Array<File>;

  constructor(private store: Store<AppState>) {
    this.store.subscribe(state => this.layers = state.main.systemLayers);
    this.store.dispatch(new MainActions.GetSystemLayers());
  }

  ngOnInit() {
  }

  public fileOnChange(event) {
    this.uploadedFiles = event.target.files;

    if (this.uploadedFiles.length > 0) {
      this.store.dispatch(new MainActions.UploadLayer({
        file: this.uploadedFiles[0],
        projectId: 0,
        isSystemLayer: true,
        layerName: this.layerName
      }))
    }
  }

}
