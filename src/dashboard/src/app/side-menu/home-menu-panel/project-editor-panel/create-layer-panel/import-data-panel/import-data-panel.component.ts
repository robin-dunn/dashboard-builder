import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as MainActions from "../../main.actions";
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-import-data-panel',
  templateUrl: './import-data-panel.component.html',
  styleUrls: ['./import-data-panel.component.css']
})
export class ImportDataPanelComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: ElementRef;

  uploadComplete: boolean;
  uploadedFiles: Array<File>;

  private projectId: number;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.subscribe(state => {
      this.projectId = state.main.currentProjectId;
    })
  }

  ngOnInit() {
  }

  public fileOnChange(event) {
    this.uploadedFiles = event.target.files;

    // TODO: show upload dialog

    for (var i = 0; i < this.uploadedFiles.length; i++) {
      console.log("** uploading layer");
        this.uploadLayer$(this.uploadedFiles[i])
          .subscribe((response) => {
            if (response.ok) {
              this.uploadComplete = true;
              //this.projectManagerService.getLayers();
            }
            //this.closeDialog(this.uploadComplete);
          });
    }
  }

  public uploadFile(event) {
    event.preventDefault();
    if (this.fileUpload)
      this.fileUpload.nativeElement.click();
  }

  public uploadLayer$(uploadFile: File): Observable<HttpResponse<Object>> {

    let httpResponseSubject = new Subject<HttpResponse<Object>>();

    let formData = new FormData();
    formData.append("projectId", this.projectId.toString());
    formData.append("uploads[]", uploadFile, uploadFile.name);

    this.http.post('/api/layer/upload', formData,  {observe: 'response'})
      .subscribe(response => {
        console.log("Upload resp", response);
        if (response.ok) {
          //this.store.update(store => store.layers = store.layers.concat([response.body as any]));
        }
        httpResponseSubject.next(response);
      });

    return httpResponseSubject;
  }
}
