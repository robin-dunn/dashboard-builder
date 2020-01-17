import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-manager-menu-item',
  templateUrl: './project-manager-menu-item.component.html',
  styleUrls: ['./project-manager-menu-item.component.css']
})
export class ProjectManagerMenuItem implements OnInit {

  @Input() title: string;
  @Input() iconClass: string = "";

  constructor() { }

  ngOnInit() {
  }

}
