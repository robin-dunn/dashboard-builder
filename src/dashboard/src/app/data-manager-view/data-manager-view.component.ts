import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-data-manager-view',
  templateUrl: './data-manager-view.component.html',
  styleUrls: ['./data-manager-view.component.css']
})
export class DataManagerViewComponent implements OnInit {

  public currentView: string;

  constructor(private store:Store<AppState>) {
    this.store.subscribe(state => {
      this.currentView = state.main.currentChildView;
      console.log("current view", this.currentView);
    })
  }

  ngOnInit() {
  }
}
