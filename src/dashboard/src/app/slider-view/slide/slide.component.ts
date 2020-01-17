import { Component, OnInit, Input, AfterViewInit, QueryList, ContentChildren, ElementRef, Output, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SlideNavButtonComponent } from './slide-nav-button/slide-nav-button.component';
import { SliderViewService } from '../slider-view.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  @Input() slideId: string;
  @Input() title: string;
  @HostBinding('style.order') @Input('cssOrder') cssOrder: number;

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
    this._visible = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
