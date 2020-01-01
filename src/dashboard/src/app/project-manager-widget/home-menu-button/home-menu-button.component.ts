import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-menu-button',
  templateUrl: './home-menu-button.component.html',
  styleUrls: ['./home-menu-button.component.css']
})
export class HomeMenuButtonComponent implements OnInit {

  @Input() buttonText: string;
  @Input() iconClass: string;

  constructor() { }

  ngOnInit() {
  }

}
