import { Injectable } from '@angular/core';

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
