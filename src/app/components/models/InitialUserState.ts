import {User} from './User';
import {Cart} from './Cart';

export interface DefaultUserStore {
  users: User[];
  principal: User;
  cart: Cart[];
}

export const InitialUserState: DefaultUserStore =  {
  users: [],
  principal: null,
  cart: [],
};
