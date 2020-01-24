import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../environments/environment";

import * as fromMain from "./main.reducer";

export interface AppState {
  main: fromMain.MainState;
}

export const reducers: ActionReducerMap<AppState> = {
  main: fromMain.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
