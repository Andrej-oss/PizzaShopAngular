import {User} from './User';
import {Cart} from './Cart';
import {Purchase} from './Purchase';

export interface DefaultUserStore {
  users: User[];
  principal: User;
  cart: Cart[];
  purchases: Purchase[];
}

export const InitialUserState: DefaultUserStore =  {
  users: [],
  principal: null,
  cart: [],
  purchases: [],
};
