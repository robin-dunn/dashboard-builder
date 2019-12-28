import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-add-layer',
  templateUrl: './dialog-add-layer.component.html',
  styleUrls: ['./dialog-add-layer.component.css']
})
export class DialogAddLayerComponent implements OnInit {

  @ViewChild('fileUploadForm')
  fileUploadForm: ElementRef

  @ViewChild('fileUpload')
  fileUpload: ElementRef

  uploadedFiles: Array<File>;

  public uploadComplete: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<DialogAddLayerComponent>,
    private http: HttpClient) { }

  ngOnInit() {
  }

  public chooseFileOnClick(event) {
    event.preventDefault();
    if (this.fileUpload)
      this.fileUpload.nativeElement.click();
  }

  public fileOnChange(event) {
    this.uploadedFiles = event.target.files;
  }

  public cancelOnClick(event) {

  }

  public uploadOnClick(event) {

    const me = this;

    let formData = new FormData();

    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    this.http.post('/api/layer', formData,  {observe: 'response'})
      .subscribe((response) => {
        if (response.status === 200)
        {
          me.uploadComplete = true;
        }
        console.log('response received is ', response);
        this.closeDialog(me.uploadComplete);
      });
  }

  private closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }
}
