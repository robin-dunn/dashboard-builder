import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../../project-manager.service';

@Component({
  selector: 'app-import-data-panel',
  templateUrl: './import-data-panel.component.html',
  styleUrls: ['./import-data-panel.component.css']
})
export class ImportDataPanelComponent implements OnInit {

  uploadComplete: boolean;
  uploadedFiles: Array<File>;

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
  }

  public fileOnChange(event) {
    this.uploadedFiles = event.target.files;

    // TODO: show upload dialog

    for (var i = 0; i < this.uploadedFiles.length; i++) {
        this.projectManagerService.uploadLayer$(this.uploadedFiles[i])
          .subscribe((response) => {
            if (response.ok) {
              this.uploadComplete = true;
              this.projectManagerService.getLayers();
            }
            //this.closeDialog(this.uploadComplete);
          });
    }
  }
}
