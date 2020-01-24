import { Action } from '@ngrx/store';
import { Project } from "../models/project";

export const GET_PROJECTS = '[App] Get Projects';
export const GET_PROJECTS_SUCCESS = '[App] Get Projects Success';

export const SAVE_PROJECT = '[App] Save Project';
export const SAVE_PROJECT_SUCCESS = '[App] Save Project Success';

export const SIDE_MENU_CHANGED = '[App] Side Menu Changed';
export const CHANGE_VIEW = "[App] Change View";

export class GetProjects implements Action {
    readonly type = GET_PROJECTS;
    constructor() {}
}

export class GetProjectsSuccess implements Action {
    readonly type = GET_PROJECTS_SUCCESS;
    constructor(public payload: Project[]) {}
}

export class SaveProject implements Action {
    readonly type = SAVE_PROJECT;
    constructor(public payload: Project) {}
}

export class SaveProjectSuccess implements Action {
    readonly type = SAVE_PROJECT_SUCCESS;
    constructor(public payload: Project) {}
}

export class SideMenuChanged implements Action {
    readonly type = SIDE_MENU_CHANGED;
    constructor(public payload: String) {}
}

export class ChangeView implements Action {
    readonly type = CHANGE_VIEW;
    constructor(public payload: String) {}
}

export type Actions =
| GetProjects
| GetProjectsSuccess
| SaveProject
| SaveProjectSuccess
| SideMenuChanged
| ChangeView;