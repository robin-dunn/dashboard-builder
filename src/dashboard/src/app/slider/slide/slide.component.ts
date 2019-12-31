import { Component, OnInit, Input, AfterViewInit, QueryList, ContentChildren, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, AfterViewInit {

  @ContentChildren('sliderButton') sliderButtons: QueryList<ElementRef>;

  _widthInPixels: number;

  get widthInPixels(): number {
    return this._widthInPixels;
  }

  @Input('widthInPixels')
  set widthInPixels(value: number) {
    this._widthInPixels = value;
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.sliderButtons) {
      this.sliderButtons.forEach(button => {
        fromEvent(button.nativeElement, "click")
          .subscribe((event) => console.log("clicked", event));
          // TODO: trigger the slide animation from the parent SliderComponent
      });
    }
  }
}
