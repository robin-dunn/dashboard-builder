import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  public chooseFileOnClick(event) {
    event.preventDefault();
    if (this.fileUpload)
      this.fileUpload.nativeElement.click();
  }

  public cancelOnClick(event) {

  }

  public uploadOnClick(event) {
    this.fileUploadForm.nativeElement.submit();
  }
}
