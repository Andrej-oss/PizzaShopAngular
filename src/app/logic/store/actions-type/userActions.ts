import { Action } from '@ngrx/store';
import {User} from '../../../components/models/User';
import {Cart} from '../../../components/models/Cart';
import {PizzaActionType} from './pizzaAction';

export enum UserActionsTypes {
  loadedUsers = '[USERS] loaded',
  loadedPrincipal = '[PRINCIPAL] loaded',
  loadedCart = '[CART] user`s loaded',
  incrementAmountPizzaCart = '[INCREMENT] amount pizza cart',
  decrementAmountPizzaCart = '[DECREMENT] amount pizza cart',
  deletePizzaCart = '[DELETE] amount pizza cart'
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
export class IncAmountPizzaCart {
  readonly type = UserActionsTypes.incrementAmountPizzaCart;

  constructor(public payload: { cart1: Cart; id: number }) {
  }
}
export class DecAmountPizzaCart {
  readonly type = UserActionsTypes.decrementAmountPizzaCart;

  constructor(public payload: { id: number; cart1: Cart }) {
  }
}
export class DeletePizzaCart {
  readonly type = UserActionsTypes.deletePizzaCart;

  constructor(public payload: { id: number }) {
  }
}
export type UserActions = UsersLoad
  | PrincipalLoad
  | CartLoad
  | IncAmountPizzaCart
  | DecAmountPizzaCart
  | DeletePizzaCart;

