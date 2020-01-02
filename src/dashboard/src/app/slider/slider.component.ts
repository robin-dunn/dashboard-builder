import { Component, OnInit, ContentChildren, AfterViewInit, QueryList, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { fromEvent, Observable, Subject } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SlideNavButtonComponent } from './slide/slide-nav-button/slide-nav-button.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('animateSlider', [
      state('centre', style({ left: "0px"})),
      state('left', style({ left: "-100%"})),
      state('right', style({ left: "100%"})),
      transition('centre=>left', animate('500ms')),
      transition('centre=>right', animate('500ms')),
    ])
  ]
})
export class SliderComponent implements OnInit, AfterViewInit {

  @Output() slideChange = new EventEmitter<ISliderNavigationEvent>();
  @ViewChild("slider") slider: ElementRef;
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;

  public currentAnimationState = "centre";

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let containerElem = this.slider.nativeElement as HTMLElement;

    this.slides.forEach((slide: SlideComponent) => {
      setTimeout(() => {
        slide.widthInPixels = containerElem.offsetWidth;
      }, 0);

      this.setupNavButtonClickHandlers(slide);
    });
  }

  private getSlide(slideId: string) {
    return this.slides.find(slide => slide.slideId === slideId);
  }

  private setupNavButtonClickHandlers(slide: SlideComponent) {
      slide.sliderButtonsInitialized.subscribe((buttons: SlideNavButtonComponent[]) => {

        buttons.forEach(slideNavButton => {

          slideNavButton.clickHandler = (clickEvent) => {

            let targetSlide = this.getSlide(slideNavButton.targetSlideId);
            this.setVisibleSlides(slide.slideId, targetSlide.slideId);
            this.transition(slideNavButton.direction);

            this.slideChange.emit({
              currentSlideId: slide.slideId,
              currentSlideTitle: slide.title,
              targetSlideId: targetSlide.slideId,
              targetSlideTitle: targetSlide.title,
              direction: slideNavButton.direction
            });
          };
        });
      });
  }

  public transition(direction: string) {
    if (direction === "forward") {
      this.currentAnimationState = "left";
    } else if (direction === "backward") {
      this.currentAnimationState = "right";
    }
  }

  private setVisibleSlides(currentSlideId: string, targetSlideId: string) {
    this.slides.forEach(s => {
      if (s.slideId === currentSlideId || s.slideId === targetSlideId) {
        s.visible = true;
      } else {
        s.visible = false;
      }
    });
  }
}
