import { IProject } from "../../../../models/project";

export interface IProjectManagerStoreState {
    project: IProject;
    layers: any[];
}