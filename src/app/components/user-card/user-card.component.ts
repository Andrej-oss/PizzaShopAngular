import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/User';
import {UserDeleteService} from '../../logic/services/delete.services/user/user-delete.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input()
  user: User;

  constructor(private userDeleteService: UserDeleteService) {
  }

  ngOnInit(): void {
  }

  onDelete(id: number): Subscription {
   return  this.userDeleteService.deleteUser(id).subscribe(data => console.log(data));
  }
}
