import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expandable-view',
  templateUrl: './expandable-view.component.html',
  styleUrls: ['./expandable-view.component.css']
})
export class ExpandableViewComponent implements OnInit {

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() headerHeight: string = "40px";

  constructor() { }

  ngOnInit() {
  }

}
