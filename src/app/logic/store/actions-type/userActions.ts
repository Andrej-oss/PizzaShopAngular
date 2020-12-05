import { Action } from '@ngrx/store';
import {User} from '../../../components/models/User';
import {Cart} from "../../../components/models/Cart";

export enum UserActionsTypes {
  loadedUsers = '[USERS] loaded',
  loadedPrincipal = '[PRINCIPAL] loaded',
  loadedCart = '[CART] user`s loaded',
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
export class CartLoad implements Action{
  readonly type = UserActionsTypes.loadedCart;

  constructor(public payload: Cart[]) {
  }
}
export type UserActions = UsersLoad | PrincipalLoad | CartLoad;

