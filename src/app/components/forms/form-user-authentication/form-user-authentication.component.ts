import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../logic/services/post.service/user/user.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormPizzaPostingComponent} from '../form-pizza-posting/form-pizza-posting.component';
import {SnackBarComponent} from '../../snack-bar/snack-bar-login/snack-bar.component';

@Component({
  selector: 'app-form-user-authentication',
  templateUrl: './form-user-authentication.component.html',
  styleUrls: ['./form-user-authentication.component.css']
})
export class FormUserAuthenticationComponent implements OnInit, OnDestroy {
  error: string;
  hide = true;
  sub: Subscription;
  authForm: FormGroup;
  username: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  authority: string;
  constructor(private userService: UserService,
              private router: Router, private snackBar: MatSnackBar) {
    this.authForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   if (params['registered']){
    //
    //   }
    //   else if (params['accessDenied']){
    //
    //   }
    // })
    this.formCheck();
  }

  onSave(authForm: FormGroup): void{
      this.authForm.disable();
      this.sub = this.userService
      .authenticateUser({username: authForm.controls.username.value, password: authForm.controls.password.value})
      .subscribe((data) => {
        // if (data.role.startsWith('[ROLE_') && data.role.endsWith(']')){
        //  const role = data.role.split('');
        //  role.splice(0, 6);
        //  role.splice(-1, 1);
        //  const s = role.join('');
        //  this.authority = s;
        //  console.log(this.authority);
        // }
        this.error = null;
        console.log(data.role, data.username, 'login success');
        this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
          });
        },
       // this.router.navigate(['/home'])
        (error) => {
        if (error.status === 403){
          this.error = 'Wrong User name or password!!!!!!!!!!';
        }
        console.warn(error);
        this.authForm.enable();
      });
  }
  isAdmin(): boolean{
    return  this.authority === 'ADMIN' ? true : false;
  }
  formCheck(): void{
    if (this.userService.isAuthenticated()){
      this.authForm.disable();
    }
    else if (!this.userService.isAuthenticated()){
      this.authForm.enable();
    }
  }
  onRegistration(): void {
    this.router.navigateByUrl('/registration').then(data => console.log(data));
  }
}
