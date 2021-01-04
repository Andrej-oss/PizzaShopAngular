import {User} from './User';
import {Cart} from './Cart';
import {Purchase} from './Purchase';
import {Comment} from "./Comment";

export interface DefaultUserStore {
  users: User[];
  principal: User;
  cart: Cart[];
  purchases: Purchase[];
  comments: Comment[];
}

export const InitialUserState: DefaultUserStore =  {
  users: [],
  principal: null,
  cart: [],
  purchases: [],
  comments: [],
};
