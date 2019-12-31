import { Component, OnInit, ContentChildren, AfterViewInit, QueryList, ViewChild, ElementRef } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {

  @ViewChild("slider") slider: ElementRef;

  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let containerElem = this.slider.nativeElement as HTMLElement;
    this.slides.forEach(s => {
      setTimeout(() => {
        s.widthInPixels = containerElem.offsetWidth;
      }, 0);
    });

  }
}
