import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { LayerService } from '../../services/layer.service';

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
    private layerService: LayerService,
    private dialogRef: MatDialogRef<DialogAddLayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        this.layerService.uploadLayer$(this.uploadedFiles[i], this.data.storeId as string)
          .subscribe((response) => {
            if (response.status === 200) {
              this.uploadComplete = true;
            }
            this.closeDialog(this.uploadComplete);
          });
    }
  }

  private closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }
}
