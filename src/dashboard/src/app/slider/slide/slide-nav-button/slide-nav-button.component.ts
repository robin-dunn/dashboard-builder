import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-nav-button',
  templateUrl: './slide-nav-button.component.html',
  styleUrls: ['./slide-nav-button.component.css']
})
export class SlideNavButtonComponent implements OnInit {

  @Input() targetSlideId: string;
  @Input() direction: string;
  @Input() clickHandler: Function;

  constructor() { }

  ngOnInit() {
  }

  public onClick(event) {
    if (this.clickHandler) {
    console.log("SB CLICKED 2", this.clickHandler);
      this.clickHandler();
    }
  }

}
