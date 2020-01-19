import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu-section',
  templateUrl: './side-menu-section.component.html',
  styleUrls: ['./side-menu-section.component.css']
})
export class SideMenuSectionComponent implements OnInit {

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() expandable: boolean = false;
  @Input() headerHeight: string = "40px";

  constructor() { }

  ngOnInit() {
  }

}
