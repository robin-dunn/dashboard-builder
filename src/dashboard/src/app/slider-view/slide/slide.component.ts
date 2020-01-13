import { Component, OnInit, Input, AfterViewInit, QueryList, ContentChildren, ElementRef, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SlideNavButtonComponent } from './slide-nav-button/slide-nav-button.component';
import { SliderViewService } from '../slider-view.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, AfterViewInit {

  @Output() sliderButtonsInitialized = new Observable<SlideNavButtonComponent[]>();
  @Input() slideId: string;
  @Input() title: string;
  @ContentChildren(SlideNavButtonComponent) sliderButtons: QueryList<SlideNavButtonComponent>;

  _widthInPixels: number;
  _visible: boolean;

  @Input('widthInPixels')
  set widthInPixels(value: number) {
    this._widthInPixels = value;
  }

  get widthInPixels(): number {
    return this._widthInPixels;
  }

  @Input('visible')
  set visible(value: boolean) {
    console.log("PROP VIS", value, this);
    this._visible = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  constructor(private sliderViewService:SliderViewService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("SLIDE", this, this.sliderButtons);
    if(this.sliderButtons) {
      this.sliderButtonsInitialized = of(this.sliderButtons.toArray());
    }
  }
}
