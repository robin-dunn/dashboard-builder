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
      transition('left=>right', animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')),
      transition('right=>left', animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')),
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

  private moveForward(targetSlideId: string) {
    let currentSlide = this.getCurrentSlide();
    let targetSlide = this.getSlide(targetSlideId);
    this.makeSlideVisible(targetSlideId);
    this.breadcrumbIndex++;
    this.currentAnimationState = "left";
    this.emitSlideChange("forward", currentSlide, targetSlide);
  }

  private moveBackward() {
    let currentSlide = this.getCurrentSlide();
    let targetSlideId = this.breadcrumbSlideIds[this.breadcrumbIndex - 1];
    let targetSlide = this.getSlide(targetSlideId);
    this.makeSlideVisible(targetSlide.slideId);
    this.currentAnimationState = "right";
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
    console.log("'Get current slide", this.breadcrumbIndex, this.breadcrumbSlideIds);
    let currentSlideId = this.breadcrumbSlideIds[this.breadcrumbIndex];
    return this.getSlide(currentSlideId);
  }

  private getSlide(slideId: string) {
    return this.slides.find(slide => slide.slideId === slideId);
  }

  private setupNavButtonClickHandlers(slide: SlideComponent) {
      slide.sliderButtonsInitialized.subscribe((buttons: SlideNavButtonComponent[]) => {
        buttons.forEach(slideNavButton => {
          slideNavButton.clickHandler = (clickEvent) => {
            this.navigate(slideNavButton.direction, slideNavButton.targetSlideId);
          };
        });
      });
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

  private makeSlideVisible(slideId: string) {
    this.slides.forEach(s => {
      if (s.slideId === slideId) {
        s.visible = true;
      }
    });
  }
}
