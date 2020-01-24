import * as AppActions from "./app.actions";
import { AppState } from '../models/appState';

const initialState: AppState = {
    loading: false,
    currentSideMenu: "",
    currentView: "Map",
    project: {
        name: "New Project",
        dateLastSaved: null
    }
}

export function appReducer(state: AppState = initialState, action: AppActions.Actions) {

    switch(action.type) {
        case AppActions.GET_PROJECTS:
            console.log("get proj");
            return { ...state,
                loading: true,
            };
        case AppActions.SAVE_PROJECT:
            return { ...state,
                loading: true,
            };
        case AppActions.SIDE_MENU_CHANGED:
            return { ...state,
                currentSideMenu: action.payload
            };
        case AppActions.CHANGE_VIEW:
            return { ...state,
                currentView: action.payload
            };
        default:
            return state;
    }
}