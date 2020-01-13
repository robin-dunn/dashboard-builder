import { Injectable } from '@angular/core';
import { SliderViewComponent } from "./slider-view.component";

@Injectable({
  providedIn: 'root'
})
export class SliderViewService {

  constructor() { }

  private _sliderView: SliderViewComponent;

  public get sliderView(): SliderViewComponent {
    return this._sliderView;
  }

  public set sliderView(value: SliderViewComponent) {
    this._sliderView = value;
  }

  public navigate(direction:string, targetSlideId:string) {
    this.sliderView.navigate(direction, targetSlideId);
  }
}
