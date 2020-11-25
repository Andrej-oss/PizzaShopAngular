import {User} from './User';

export interface DefaultUserStore {
  users: User[];
  principal: User[];
}

export const InitialUserState: DefaultUserStore =  {
  users: [],
  principal: []
};
