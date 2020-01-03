import { Component, OnInit, ContentChildren, AfterViewInit, QueryList, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SlideNavButtonComponent } from './slide/slide-nav-button/slide-nav-button.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('animateSlider', [
      state('left', style({ left: "-100%"})),
      state('right', style({ left: "0%"})),
      transition('left=>right', animate('500ms')),
      transition('right=>left', animate('500ms')),
    ])
  ]
})
export class SliderComponent implements OnInit, AfterViewInit {

  @Output() slideChange = new EventEmitter<ISliderNavigationEvent>();
  @ViewChild("slider") slider: ElementRef;
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;

  public currentAnimationState = "right";

  currentSlideId: string;
  breadcrumbIndex: number = -1;
  breadcrumbSlideIds: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let containerElem = this.slider.nativeElement as HTMLElement;

    // Find the starting slide
    let startingSlide = this.slides.find(slide => slide.visible === true);
    this.addSlideToBreadcrumb(startingSlide.slideId);

    this.slides.forEach((slide: SlideComponent) => {
      setTimeout(() => {
        slide.widthInPixels = containerElem.offsetWidth;
      }, 0);

      this.setupNavButtonClickHandlers(slide);
    });
  }

  private addSlideToBreadcrumb(slideId: string) {
    if (this.breadcrumbSlideIds.length < 1) {
      this.breadcrumbIndex = 0;
    }
    this.breadcrumbSlideIds.push(slideId);
  }

  private removeSlideFromBreadcrumb(slideId: string) {
    let slideIndex = this.breadcrumbSlideIds.findIndex(id => id === slideId);
    if (slideIndex >= 0) {
      this.breadcrumbSlideIds.splice(slideIndex, 1);
    }
    this.breadcrumbIndex--;
  }

  private moveToNextSlide(targetSlideId: string) {
    this.makeSlideVisible(targetSlideId);
    this.breadcrumbIndex++;
    this.currentAnimationState = "left";
  }

  private moveToPreviousSlide() {
    let currentSlideId = this.breadcrumbSlideIds[this.breadcrumbIndex];
    this.breadcrumbIndex--;
    let previousSlideId = this.breadcrumbSlideIds[this.breadcrumbIndex];
    this.makeSlideVisible(previousSlideId);
    this.currentAnimationState = "right";
    this.removeSlideFromBreadcrumb(currentSlideId);
  }

  private getSlide(slideId: string) {
    return this.slides.find(slide => slide.slideId === slideId);
  }

  private setupNavButtonClickHandlers(slide: SlideComponent) {
      slide.sliderButtonsInitialized.subscribe((buttons: SlideNavButtonComponent[]) => {

        buttons.forEach(slideNavButton => {

          slideNavButton.clickHandler = (clickEvent) => {

            let targetSlide = this.getSlide(slideNavButton.targetSlideId);
            this.navigate(slideNavButton.direction, slide.slideId, targetSlide.slideId);

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

  public navigate(direction: string, currentSlideId: string, targetSlideId: string) {
    if (direction === "forward") {
      // Make the next slide visible on the reel so its ready to animate in.
      this.addSlideToBreadcrumb(targetSlideId)
      this.moveToNextSlide(targetSlideId);
    } else if (direction === "backward") {
      this.moveToPreviousSlide();
    }
  }

  private makeSlideVisible(slideId: string) {
    this.slides.forEach(s => {
      if (s.slideId === slideId) {
        s.visible = true;
      }
    });
  }
}
