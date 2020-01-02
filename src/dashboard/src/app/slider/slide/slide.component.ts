import { Component, OnInit, Input, AfterViewInit, QueryList, ContentChildren, ElementRef, Output } from '@angular/core';
import { fromEvent, Subject, Observable, of } from 'rxjs';
import { SlideNavButtonComponent } from './slide-nav-button/slide-nav-button.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, AfterViewInit {

  @Output() sliderButtonsInitialized = new Observable<SlideNavButtonComponent[]>();
  @Input() slideId: string;
  @Input() visible: boolean;
  @Input() title: string;
  @ContentChildren(SlideNavButtonComponent) sliderButtons: QueryList<SlideNavButtonComponent>;

  _widthInPixels: number;

  get widthInPixels(): number {
    return this._widthInPixels;
  }

  @Input('widthInPixels')
  set widthInPixels(value: number) {
    this._widthInPixels = value;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.sliderButtons) {
      this.sliderButtonsInitialized = of(this.sliderButtons.toArray());
    }
  }
}
