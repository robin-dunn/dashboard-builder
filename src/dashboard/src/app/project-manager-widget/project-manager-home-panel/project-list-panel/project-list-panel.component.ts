import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list-panel',
  templateUrl: './project-list-panel.component.html',
  styleUrls: ['./project-list-panel.component.css']
})
export class ProjectListPanelComponent implements OnInit {

  public projects: any[] = [{name:"P1"},{name:"P2"}];

  constructor() { }

  ngOnInit() {
  }

}
