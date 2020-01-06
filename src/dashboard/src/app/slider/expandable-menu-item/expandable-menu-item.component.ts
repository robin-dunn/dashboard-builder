import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expandable-menu-item',
  templateUrl: './expandable-menu-item.component.html',
  styleUrls: ['./expandable-menu-item.component.css']
})
export class ExpandableMenuItemComponent implements OnInit {

  @Input() title: string = "";

  constructor() { }

  ngOnInit() {
  }

}
