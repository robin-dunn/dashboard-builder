import { Injectable } from '@angular/core';
import { _AppStore } from './app-store/_appStore';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public subscribeToStore(selector: any) {
    //this.store.subscribe(selector);
  }

  public setCurrentView(viewName: string) {
    //this.store.update(store => store.currentView = viewName);
  }
}
