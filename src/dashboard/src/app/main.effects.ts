import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as MainActions from "./main.actions";
import { ApiService } from "./api.service";
import { Project } from "./models/project";

@Injectable()
export class MainEffects {
  constructor(private actions: Actions, private apiService: ApiService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(MainActions.GET_PROJECTS),
    switchMap(() => {
        console.log("EFFECT");
      return this.apiService.getProjects().pipe(
        map((data:Project[]) => new MainActions.GetProjectsSuccess(data)),
        catchError(error =>
          of(new MainActions.GetProjectsFailure({ error: error }))
        )
      );
    })
  );
}