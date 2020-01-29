import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MainActions from "../../../main.actions";
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-proceed',
  templateUrl: './proceed.component.html',
  styleUrls: ['./proceed.component.css']
})
export class ProceedComponent implements OnInit {

  @Input() title: string;
  @Input() outerClass: string;
  @Input() iconClass: string;
  @Input() showView: string;

  constructor(private store:Store<AppState>) {
  }

  ngOnInit() {
  }

  onClick(event) {
    if (this.showView) {
      this.store.dispatch(new MainActions.ChangeChildView(this.showView));
    }
  }
}
