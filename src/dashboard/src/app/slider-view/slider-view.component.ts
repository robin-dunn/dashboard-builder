import { Component, OnInit, ContentChildren, AfterViewInit, QueryList, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SliderViewService } from './slider-view.service';

@Component({
  selector: 'app-slider-view',
  templateUrl: './slider-view.component.html',
  styleUrls: ['./slider-view.component.css'],
  animations: [
    trigger('animateSlider', [
      state('right-view', style({ left: "-100%"})),
      state('right-view-no-animation', style({ left: "-100%"})),
      state('left-view', style({ left: "0%"})),
      state('left-view-no-animation', style({ left: "0%"})),
      transition('*=>right-view', animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')),
      transition('*=>left-view', animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')),
    ])
  ],
  providers: [SliderViewService]
})
export class SliderViewComponent implements OnInit, AfterViewInit {

  @Output() slideChange = new EventEmitter<ISliderNavigationEvent>();
  @ViewChild("slider") sliderStageView: ElementRef;
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;

  // Set the initial animation state, i.e. left position is zero.
  public currentAnimationState = "left-view";

  currentSlideId: string;
  breadcrumbIndex: number = -1;
  breadcrumbSlideIds: string[] = [];

  constructor(private sliderViewService: SliderViewService) { }

  ngOnInit() {
    this.sliderViewService.sliderView = this;
  }

  ngAfterViewInit() {
    // Find the starting slide
    let startingSlide = this.slides.find(slide => slide.visible === true);
    this.addSlideToBreadcrumb(startingSlide.slideId);

    this.setSlidesWidth();
  }

  private setSlidesWidth() {
    let containerElem = this.sliderStageView.nativeElement as HTMLElement;
    this.slides.forEach((slide: SlideComponent) => {
      setTimeout(() => {
        slide.widthInPixels = containerElem.offsetWidth;
      }, 0);
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

  private moveForward(targetSlideId: string) {
    let currentSlide = this.getCurrentSlide();
    let targetSlide = this.getSlide(targetSlideId);

    let slidesToShow = [currentSlide.slideId, targetSlideId];
    let slidesToHide = this.slides.map(slide => slide.slideId)
                        .filter(slideId => slidesToShow.indexOf(slideId) < 0);

    /* Set CSS order property of the slides so the current slide
    is on the left and the next slide is on the right */
    currentSlide.cssOrder = 1;
    targetSlide.cssOrder = 2;

    this.showSlides(slidesToShow);
    this.hideSlides(slidesToHide);

    this.breadcrumbIndex++;
    this.currentAnimationState = "right-view";

    // Wait for the slider to animate from the left view to the right view,
    // then hide the previous slide and set the new view as the left view.
    const animationDurationMs = 500;
    setTimeout(() => {
      if (this.breadcrumbIndex > 0) {
        this.hideSlides([currentSlide.slideId]);
      }
      this.currentAnimationState = 'left-view-no-animation';
    }, animationDurationMs);

    this.emitSlideChange("forward", currentSlide, targetSlide);
  }

  private moveBackward() {
    let currentSlide = this.getCurrentSlide();
    let targetSlideId = this.breadcrumbSlideIds[this.breadcrumbIndex - 1];
    let targetSlide = this.getSlide(targetSlideId);

    this.showSlides([targetSlide.slideId]);
    this.currentAnimationState = "right-view-no-animation";

    // Wait a brief moment to allow the slider width and animation state to update,
    // before animating back to the left view.
    setTimeout(() => {
      this.currentAnimationState = 'left-view';
    }, 50);

    this.removeSlideFromBreadcrumb(currentSlide.slideId);
    this.emitSlideChange("backward", currentSlide, targetSlide);
  }

  private emitSlideChange(direction: string, previousSlide: SlideComponent, newSlide: SlideComponent) {
    this.slideChange.emit({
      direction: direction,
      currentSlideId: previousSlide.slideId,
      currentSlideTitle: previousSlide.title,
      targetSlideId: newSlide.slideId,
      targetSlideTitle: newSlide.title
    });
  }

  private getCurrentSlide() {
    let currentSlideId = this.breadcrumbSlideIds[this.breadcrumbIndex];
    return this.getSlide(currentSlideId);
  }

  private getSlide(slideId: string) {
    return this.slides.find(slide => slide.slideId === slideId);
  }

  public navigate(direction: string, targetSlideId?: string) {
    if (direction === "forward") {
      if (!targetSlideId) {
        throw new Error("targetSlideId invalid");
      }
      this.addSlideToBreadcrumb(targetSlideId)
      this.moveForward(targetSlideId);
    } else if (direction === "backward") {
      this.moveBackward();
    }
  }

  private showSlides(slideIds: string[]) {
    this.slides.forEach(s => {
      if (slideIds.indexOf(s.slideId) >= 0) {
        s.visible = true;
      }
    });
  }

  private hideSlides(slideIds: string[]) {
    this.slides.forEach(s => {
      if (slideIds.indexOf(s.slideId) >= 0) {
        s.visible = false;
      }
    });
  }
}
