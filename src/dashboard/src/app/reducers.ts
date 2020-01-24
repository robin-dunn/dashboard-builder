import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../environments/environment";

import * as fromMain from "./main.reducer";

export interface AppState {
  mainState: fromMain.MainState;
}

export const reducers: ActionReducerMap<AppState> = {
  mainState: fromMain.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
