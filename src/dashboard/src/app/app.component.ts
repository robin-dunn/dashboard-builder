import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MainState } from './main.reducer';
import * as AppActions from "./main.actions";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dashboard-app';

  public currentView:string = "";

  public MainState$: Observable<MainState>;

  constructor(private store: Store<MainState>){

    this.MainState$ = store.select('app');

    this.MainState$.subscribe((MainState:MainState) => {
      console.log("APP STATE CHANGED", MainState);
      this.currentView = MainState.currentView;

      // Should this be an EFFECT?
      if (MainState.currentSideMenu === "projectManagerHome" && MainState.currentView !== "Map") {
        this.store.dispatch(new AppActions.ChangeView("Map"));
      }
    });
  }

  ngOnInit(){
    console.log("DATA", this.currentView);
  }
}
