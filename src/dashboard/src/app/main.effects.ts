import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as MainActions from "./main.actions";
import { ApiService } from "./api.service";
import { Project } from "./models/project";
import { Layer } from "./models/layer";

@Injectable()
export class MainEffects {
  constructor(private actions: Actions, private apiService: ApiService) {}

  @Effect() /* CREATE_PROJECT */
  createProject = this.actions.pipe(
    ofType<MainActions.CreateProject>(MainActions.CREATE_PROJECT),
    switchMap((action) => {
      return this.apiService.createProject(action.payload).pipe(
        map((project) => new MainActions.CreateProjectSuccess(project))
      );
    })
  );

  @Effect() /* GET_PROJECTS */
  getProjects = this.actions.pipe(
    ofType(MainActions.GET_PROJECTS),
    switchMap((action) => {
      return this.apiService.getProjects().pipe(
        map((data:Project[]) => new MainActions.GetProjectsSuccess(data)),
        catchError(error =>
          of(new MainActions.GetProjectsFailure({ error: error }))
        )
      );
    })
  );

  @Effect() /* OPEN_PROJECT */
  openProject = this.actions.pipe(
    ofType<MainActions.OpenProject>(MainActions.OPEN_PROJECT),
    map((action) => new MainActions.GetProjectLayers({ projectId: action.payload.id }))
  );

  @Effect() /* ADD_MAP_PIN */
  addMapPin = this.actions.pipe(
    ofType<MainActions.AddMapPin>(MainActions.ADD_MAP_PIN),
    switchMap((action) => {
      return this.apiService.addMapPin(action.payload).pipe(
        map((mapPin) => new MainActions.AddMapPinSuccess(mapPin))
      );
    })
  );

  @Effect() /* CREATE_LAYER */
  createLayer = this.actions.pipe(
    ofType<MainActions.CreateLayer>(MainActions.CREATE_LAYER),
    switchMap((action) => {
      return this.apiService.createLayer(action.payload.projectId).pipe(
        map((layer) => new MainActions.CreateLayerSuccess(layer))
      );
    })
  );

  @Effect() /* GET_PROJECT_LAYERS */
  getProjectLayers = this.actions.pipe(
    ofType<MainActions.GetProjectLayers>(MainActions.GET_PROJECT_LAYERS),
    switchMap((action) => {
      return this.apiService.getLayers({ isSystemLayer: false, projectId: action.payload.projectId }).pipe(
        map((layers:Layer[]) => new MainActions.GetProjectLayersSuccess(layers))
      );
    })
  );

  @Effect() /* GET_SYSTEM_LAYERS */
  getSystemLayers = this.actions.pipe(
    ofType<MainActions.GetSystemLayers>(MainActions.GET_SYSTEM_LAYERS),
    switchMap((action) => {
      return this.apiService.getLayers({ isSystemLayer: true }).pipe(
        map((layers:Layer[]) => new MainActions.GetSystemLayersSuccess(layers))
      );
    })
  );

  @Effect() /* UPLOAD_LAYER */
  uploadLayer = this.actions.pipe(
    ofType<MainActions.UploadLayer>(MainActions.UPLOAD_LAYER),
    switchMap((action) => {
      let payload = action.payload;
      return this.apiService.uploadLayer({
        file: payload.file,
        projectId: payload.projectId,
        isSystemLayer: payload.isSystemLayer,
        layerName: payload.layerName
      }).pipe(
        map((layer) => new MainActions.UploadLayerSuccess(layer))
      );
    })
  );

}