import { Component, OnInit, ContentChildren, AfterViewInit, QueryList, ViewChild, ElementRef } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { fromEvent } from 'rxjs';

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

    this.slides.forEach((slide: SlideComponent) => {
      setTimeout(() => {
        slide.widthInPixels = containerElem.offsetWidth;
      }, 0);

      this.setupButtonClickHandlers(slide);
    });
  }

  private setupButtonClickHandlers(slide: SlideComponent) {
      slide.sliderButtonsEvent.subscribe((buttons: HTMLElement[]) => {
        buttons.forEach(btn => {
        console.log("ELEM", btn);
          fromEvent(btn, "click").subscribe(clickEvent => {
            console.log("CLICK", clickEvent);
            console.log(btn.getAttribute("data-slider"));
            // TODO: determine if we need to move the slider reel left or right.
          });
        });
      });
  }

  public slideLeft() {

  }

  public slideRight() {

  }
}
