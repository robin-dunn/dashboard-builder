import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/appState';
import * as AppActions from "./app-store/app.actions";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dashboard-app';

  public currentView:string = "";

  public appState$: Observable<AppState>;

  constructor(private store: Store<AppState>){

    this.appState$ = store.select('app');

    this.appState$.subscribe((appState:AppState) => {
      console.log("APP STATE CHANGED", appState);
      this.currentView = appState.currentView;

      // Should this be an EFFECT?
      if (appState.currentSideMenu === "projectManagerHome" && appState.currentView !== "Map") {
        this.store.dispatch(new AppActions.ChangeView("Map"));
      }
    });

    /*this.appService.store.subscribe((value:IAppStoreState) => {
      this.currentView = value.currentView;
      //if (value.currentSideMenu === "projectManagerHome") {
      //  this.appService.store.update((state:IAppStoreState) => state.currentView = "Map");
      //}
    });

    this.appService.store.update((state:IAppStoreState) => state.currentView = "Map");
    */
  }

  ngOnInit(){
    console.log("DATA", this.currentView);
  }
}
