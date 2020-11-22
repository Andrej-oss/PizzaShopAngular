import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../logic/services/post.service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
  }

  onLogin(): void{
    this.router.navigateByUrl('/authenticate').then(data => console.log(data));
  }

  onRegistration(): void{
    this.router.navigateByUrl('/registration').then(data => console.log(data));
  }

  onAdmin(): void{
    this.router.navigateByUrl('/admin').then(data => console.log(data));
  }
}
