import { Project } from "./project"

export class AppState {
    loading: boolean;
    currentSideMenu: string;
    currentView: string;
    project: Project;
}