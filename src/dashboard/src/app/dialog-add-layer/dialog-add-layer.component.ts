import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-add-layer',
  templateUrl: './dialog-add-layer.component.html',
  styleUrls: ['./dialog-add-layer.component.css']
})
export class DialogAddLayerComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: ElementRef

  constructor() { }

  ngOnInit() {
  }

  public onClick(event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click();
  }

  // TODO: handle file upload submit e.g. to new endpoint /api/layer
}
