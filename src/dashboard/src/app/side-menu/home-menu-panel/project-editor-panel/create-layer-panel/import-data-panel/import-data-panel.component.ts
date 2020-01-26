import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MainActions from "../../../../../main.actions";
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-import-data-panel',
  templateUrl: './import-data-panel.component.html',
  styleUrls: ['./import-data-panel.component.css']
})
export class ImportDataPanelComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: ElementRef;

  uploadedFiles: Array<File>;

  private projectId: number;

  constructor(private store: Store<AppState>) {
    this.store.subscribe(state => {
      this.projectId = state.main.currentProjectId;
    })
  }

  ngOnInit() {
  }

  public fileOnChange(event) {
    this.uploadedFiles = event.target.files;

    if (this.uploadedFiles.length > 0) {
      this.store.dispatch(new MainActions.UploadLayer({
        file: this.uploadedFiles[0],
        projectId: this.projectId
      }))
    }
  }
}
