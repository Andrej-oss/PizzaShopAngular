import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {userNode, userReducer} from './userReducer';
import {environment} from '../../../../environments/environment';

export interface State {
  [userNode]: {};
}

export const reducers: ActionReducerMap<State> = {
  [userNode]: userReducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
