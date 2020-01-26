import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from "./main.actions";
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dashboard-app';

  public currentView:string = "";

  constructor(private store: Store<AppState>){

    this.store.subscribe((state:AppState) => {
      this.currentView = state.main.currentView;

      if (state.main.currentSideMenu === "projectManagerHome" && state.main.currentView !== "Map") {
        this.store.dispatch(new AppActions.ChangeView("Map"));
      }

      console.log(state);
    });
  }

  ngOnInit(){
    console.log("DATA", this.currentView);
  }
}
