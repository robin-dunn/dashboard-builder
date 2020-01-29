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
      if (!state.main.currentSideMenu
        || (state.main.currentSideMenu === "projectManagerHome"
            && this.currentView !== "Map")) {
        this.currentView = "Map";
      } else if (state.main.currentSideMenu === "dataManager"){
        this.currentView = "DataManager";
      }

      console.log(state);
    });
  }

  ngOnInit(){
  }
}
