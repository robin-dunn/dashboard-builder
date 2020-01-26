import { Action } from '@ngrx/store';
import { Project } from "./models/project";
import { MapPin } from './models/mapPin';
import { Layer } from './models/layer';

export const SIDE_MENU_CHANGED = '[App] Side Menu Changed';
export const CHANGE_VIEW = "[App] Change View";

export const CREATE_PROJECT = '[App] Create Project';
export const CREATE_PROJECT_SUCCESS = '[App] Create Project Success';

export const GET_PROJECTS = '[App] Get Projects';
export const GET_PROJECTS_SUCCESS = '[App] Get Projects Success';
export const GET_PROJECTS_FAILURE = '[App] Get Projects Failure';

export const OPEN_PROJECT = '[App] Open Project';
export const UPDATE_PROJECT = '[App] Update Project';

export const SAVE_PROJECT = '[App] Save Project';
export const SAVE_PROJECT_SUCCESS = '[App] Save Project Success';

export const SELECT_TOOL = '[App] Select Tool';
export const SELECT_EDIT_MODE = '[App] Select Edit Mode';

export const ADD_MAP_PIN = '[App] Add Map Pin';
export const ADD_MAP_PIN_SUCCESS = '[App] Add Map Pin Success';

export const CREATE_LAYER = '[App] Create Layer';
export const CREATE_LAYER_SUCCESS = '[App] Create Layer Success';

export const UPLOAD_LAYER = '[App] Upload Layer';
export const UPLOAD_LAYER_SUCCESS = '[App] Upload Layer Success';

export const GET_PROJECT_LAYERS = '[App] Get Project Layers';
export const GET_PROJECT_LAYERS_SUCCESS = '[App] Get Project Layers Success';

export const GET_SYSTEM_LAYERS = '[App] Get System Layers';
export const GET_SYSTEM_LAYERS_SUCCESS = '[App] Get System Layers Success';

export class SideMenuChanged implements Action {
    readonly type = SIDE_MENU_CHANGED;
    constructor(public payload: string) {}
}

export class ChangeView implements Action {
    readonly type = CHANGE_VIEW;
    constructor(public payload: string) {}
}

export class CreateProject implements Action {
    readonly type = CREATE_PROJECT;
    constructor(public payload: string) {}
}

export class CreateProjectSuccess implements Action {
    readonly type = CREATE_PROJECT_SUCCESS
    constructor(public payload: Project) {}
}

export class GetProjects implements Action {
    readonly type = GET_PROJECTS;
    constructor() {}
}

export class GetProjectsSuccess implements Action {
    readonly type = GET_PROJECTS_SUCCESS;
    constructor(public payload: Project[]) {}
}

export class GetProjectsFailure implements Action {
    readonly type = GET_PROJECTS_FAILURE;
    constructor(public payload: any) {}
}

export class OpenProject implements Action {
    readonly type = OPEN_PROJECT;
    constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload:  (project: Project) => Project) {}
}

export class SaveProject implements Action {
    readonly type = SAVE_PROJECT;
    constructor(public payload: Project) {}
}

export class SaveProjectSuccess implements Action {
    readonly type = SAVE_PROJECT_SUCCESS;
    constructor(public payload: Project) {}
}

export class SelectTool implements Action {
    readonly type = SELECT_TOOL;
    constructor(public payload: string) {}
}

export class SelectEditMode implements Action {
    readonly type = SELECT_EDIT_MODE;
    constructor(public payload: string) {}
}

export class AddMapPin implements Action {
    readonly type = ADD_MAP_PIN;
    constructor(public payload: MapPin) {}
}

export class AddMapPinSuccess implements Action {
    readonly type = ADD_MAP_PIN_SUCCESS;
    constructor(public payload: MapPin) {}
}

export class CreateLayer implements Action {
    readonly type = CREATE_LAYER;
    constructor(public payload: { projectId: number }) {}
}

export class CreateLayerSuccess implements Action {
    readonly type = CREATE_LAYER_SUCCESS;
    constructor(public payload: Layer) {}
}

export class UploadLayer implements Action {
    readonly type = UPLOAD_LAYER;
    constructor(public payload: { file: File, projectId: number, isSystemLayer?: boolean, layerName?: string }) {}
}

export class UploadLayerSuccess implements Action {
    readonly type = UPLOAD_LAYER_SUCCESS;
    constructor(public payload: Layer) {}
}

export class GetProjectLayers implements Action {
    readonly type = GET_PROJECT_LAYERS;
    constructor(public payload: { projectId: number }) {}
}

export class GetProjectLayersSuccess implements Action {
    readonly type = GET_PROJECT_LAYERS_SUCCESS;
    constructor(public payload: Layer[]) {}
}

export class GetSystemLayers implements Action {
    readonly type = GET_SYSTEM_LAYERS;
    constructor() {}
}

export class GetSystemLayersSuccess implements Action {
    readonly type = GET_SYSTEM_LAYERS_SUCCESS;
    constructor(public payload: Layer[]) {}
}

export type Actions =
| SideMenuChanged
| ChangeView
| CreateProject
| CreateProjectSuccess
| GetProjects
| GetProjectsSuccess
| OpenProject
| UpdateProject
| SaveProject
| SaveProjectSuccess
| SelectTool
| SelectEditMode
| AddMapPin
| AddMapPinSuccess
| CreateLayer
| CreateLayerSuccess
| UploadLayer
| UploadLayerSuccess
| GetProjectLayers
| GetProjectLayersSuccess
| GetSystemLayers
| GetSystemLayersSuccess
;