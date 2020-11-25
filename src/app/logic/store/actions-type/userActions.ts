import { Action } from '@ngrx/store';
import {User} from '../../../components/models/User';

export enum UserActionsTypes {
  loadedUsers = '[USERS] loaded',
  loadedPrincipal = '[PRINCIPAL] loaded'
}
export class UsersLoad implements  Action {
  readonly type = UserActionsTypes.loadedUsers;

  constructor(public payload: User[]) {
  }
}
export class PrincipalLoad implements Action {
  readonly type = UserActionsTypes.loadedPrincipal;

  constructor(public payload: User[]){
  }
}
export type UserActions = UsersLoad | PrincipalLoad;

