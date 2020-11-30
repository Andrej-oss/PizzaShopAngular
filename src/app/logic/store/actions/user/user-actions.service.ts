import { Injectable } from '@angular/core';
import {UserService} from '../../../services/post.service/user/user.service';
import {UserGetService} from '../../../services/get.services/user/user-get.service';
import { Store } from '@ngrx/store';
import {PrincipalLoad, UsersLoad} from '../../actions-type/userActions';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  constructor(private userService: UserService,
              private userGetService: UserGetService,
              private store: Store,
              public themeObjectService: ThemeObjectService) { }

   getUsers(): | {}{
    return  this.userGetService.getAllUsers().subscribe( data => {
      return this.store.dispatch(new UsersLoad(data));
    });
   }
   getPrincipal(name: string): | {}{
    return this.userGetService.getUserByName(name).subscribe( data => {
      return this.store.dispatch(new PrincipalLoad([data]));
     });
   }
}
