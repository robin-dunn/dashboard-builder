import { Component, OnInit, Input } from '@angular/core';
import { SliderViewService } from '../../slider-view.service';

@Component({
  selector: 'app-slide-nav-button',
  templateUrl: './slide-nav-button.component.html',
  styleUrls: ['./slide-nav-button.component.css']
})
export class SlideNavButtonComponent implements OnInit {

  @Input() targetSlideId: string;
  @Input() direction: string;
  @Input() clickHandler: Function;

  constructor(private sliderViewService: SliderViewService) { }

  ngOnInit() {
  }

  public onClick(event) {
    this.sliderViewService.navigate(this.direction, this.targetSlideId);
  }
}
