import * as MainActions from "./main.actions";
import { Project } from "./models/project";

export class MainState {
    loading: boolean;
    currentSideMenu: string;
    currentView: string;
    projects: Project[];
    project: Project;
}

const initialState: MainState = {
    loading: false,
    currentSideMenu: "",
    currentView: "Map",
    projects: [],
    project: {
        name: "New Project",
        dateLastSaved: null
    }
}

export function reducer(state: MainState = initialState, action: MainActions.Actions) {
    console.log("ACTION", action);
    switch(action.type) {
        case MainActions.GET_PROJECTS:
            return { ...state,
                loading: true,
            };
        case MainActions.SAVE_PROJECT:
            return { ...state,
                loading: true,
            };
        case MainActions.SIDE_MENU_CHANGED:
            return { ...state,
                currentSideMenu: action.payload
            };
        case MainActions.CHANGE_VIEW:
            return { ...state,
                currentView: action.payload
            };
        default:
            return state;
    }
}