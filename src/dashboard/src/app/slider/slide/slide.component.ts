import { Component, OnInit, Input, AfterViewInit, QueryList, ContentChildren, ElementRef, Output } from '@angular/core';
import { fromEvent, Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, AfterViewInit {

  @Output() sliderButtonsEvent = new Observable<HTMLElement[]>();

  @ContentChildren('sliderButton', { read: ElementRef }) sliderButtons: QueryList<ElementRef>;

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
      let buttonElements = this.sliderButtons.toArray().map(button => button.nativeElement as HTMLElement);
      console.log("BE", buttonElements);
      this.sliderButtonsEvent = of(buttonElements);
    }
  }
}
