import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-proceed',
  templateUrl: './proceed.component.html',
  styleUrls: ['./proceed.component.css']
})
export class ProceedComponent implements OnInit {

  @Input() title: string;
  @Input() outerClass: string;
  @Input() iconClass: string;
  @Input() showView: string;

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    if (this.showView) {
      alert("show " + this.showView);
    }
  }
}
