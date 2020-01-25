import * as MainActions from "./main.actions";
import { Project } from "./models/project";

export class MainState {
    loading: boolean;
    currentSideMenu: string;
    currentView: string;
    projects: Project[];
    currentProjectId: string;
    currentProject: Project;
    tool: string;
    editMode: Tool;
}

const initialState: MainState = {
    loading: false,
    currentSideMenu: null,
    currentView: "Map",
    projects: [],
    currentProjectId: null,
    currentProject: {
        id: -1,
        name: "",
        saved: false
    },
    tool: null,
    editMode: null
}

export function reducer(state: MainState = initialState, action: MainActions.Actions) {
    console.log("ACTION", action);
    switch(action.type) {
        case MainActions.GET_PROJECTS:
            return { ...state,
                loading: true,
            };
        case MainActions.GET_PROJECTS_SUCCESS:
            return { ...state,
                loading: false,
                projects: action.payload
            };
        case MainActions.OPEN_PROJECT:
            return { ...state,
                loading: true,
                currentProjectId: action.payload.id,
                currentProject: { ...action.payload }
            };
        case MainActions.UPDATE_PROJECT:
            return { ...state,
                loading: true,
                currentProject: action.payload(state.currentProject)
            };
        case MainActions.SAVE_PROJECT:
            return { ...state,
                loading: true,
            };
        case MainActions.SAVE_PROJECT_SUCCESS:
            return { ...state,
                loading: false,
            };
        case MainActions.SELECT_TOOL:
            return { ...state,
                tool: action.payload
            };
        case MainActions.SELECT_EDIT_MODE:
            return { ...state,
                editMode: action.payload
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