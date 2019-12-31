import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-manager-home',
  templateUrl: './project-manager-home.component.html',
  styleUrls: ['./project-manager-home.component.css']
})
export class ProjectManagerHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public nextSlide(slideId: string) {
    alert(slideId);
  }

}
