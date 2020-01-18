import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-proceed-inner-button',
  templateUrl: './proceed-inner-button.component.html',
  styleUrls: ['./proceed-inner-button.component.css']
})
export class ProceedInnerButtonComponent implements OnInit {

  @Input() title: string;
  @Input() iconClass: string;

  constructor() { }

  ngOnInit() {
  }

}
