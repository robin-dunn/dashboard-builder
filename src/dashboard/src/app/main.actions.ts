import { Action } from '@ngrx/store';
import { Project } from "./models/project";

export const SIDE_MENU_CHANGED = '[App] Side Menu Changed';
export const CHANGE_VIEW = "[App] Change View";

export const GET_PROJECTS = '[App] Get Projects';
export const GET_PROJECTS_SUCCESS = '[App] Get Projects Success';
export const GET_PROJECTS_FAILURE = '[App] Get Projects Failure';

export const OPEN_PROJECT = '[App] Open Project';
export const UPDATE_PROJECT = '[App] Update Project';
export const SAVE_PROJECT = '[App] Save Project';
export const SAVE_PROJECT_SUCCESS = '[App] Save Project Success';

export const SELECT_TOOL = '[App] Select Tool';
export const SELECT_EDIT_MODE = '[App] Select Edit Mode';

export class SideMenuChanged implements Action {
    readonly type = SIDE_MENU_CHANGED;
    constructor(public payload: string) {}
}

export class ChangeView implements Action {
    readonly type = CHANGE_VIEW;
    constructor(public payload: string) {}
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

export type Actions =
| SideMenuChanged
| ChangeView
| GetProjects
| GetProjectsSuccess
| OpenProject
| UpdateProject
| SaveProject
| SaveProjectSuccess
| SelectTool
| SelectEditMode;