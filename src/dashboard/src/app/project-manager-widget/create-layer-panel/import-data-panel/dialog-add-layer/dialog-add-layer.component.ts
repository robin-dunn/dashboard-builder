import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { ProjectManagerService } from '../../../project-manager.service';

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

  public uploadComplete: boolean = false;

  constructor(
    private projectManagerService: ProjectManagerService,
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

  private closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }
}
