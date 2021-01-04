import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Observable, of, pipe, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../snack-bar/snack-bar-login/snack-bar.component';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';
import {concatMap, map} from 'rxjs/operators';
import {PizzaService} from '../../../logic/services/pizzaDao/pizza.service';
import {UserService} from '../../../logic/services/userDao/user.service';

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
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private userActionsService: UserActionsService,
              public themeObjectService: ThemeObjectService, private pizzaService: PizzaService) {
    this.authForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.accessDenied) {
        console.log(params);
        this.error = 'Please log in to Pizza shop first';
      }
      console.log(params);
    });
    this.formCheck();
  }

  onSave(authForm: FormGroup): void {
    this.themeObjectService.data.value.isAuthLoad = true;
    this.authForm.disable();
    this.userService
      .authenticateUser({username: authForm.controls.username.value, password: authForm.controls.password.value})
      .pipe(map(data => this.userActionsService.getPrincipal(data.username)))
      // .pipe(mergeMap(async  (data1) => this.userActionsService.getPrincipal(data1.username)),
      //   this.userActionsService.getAllCart(this.themeObjectService.data.value.userId))
      .subscribe((data) => {
          // ToDo 2 async request
          of(setTimeout(() => {
            this.userActionsService.getAllCart(this.themeObjectService.data.value.userId);
          }, 200));
          if (this.themeObjectService.data.value.userId !== 0) {
            of(this.userActionsService.getAllCart(this.themeObjectService.data.value.userId));
          }
          this.error = null;
          console.log(data, 'login success');
          this.themeObjectService.data.value.message = 'Login success';
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
          });
          // tslint:disable-next-line:no-shadowed-variable
          this.router.navigate(['/']).then(data => console.log(data));
        },
        (error) => {
          if (error.status === 403) {
            this.error = 'Wrong User name or password!!!!!!!!!!';
          }
          console.warn(error);
          this.authForm.enable();
        });
  }

  isAdmin(): boolean {
    return this.authority === 'ADMIN' ? true : false;
  }

  formCheck(): void {
    if (this.userService.isAuthenticated()) {
      this.authForm.disable();
    } else if (!this.userService.isAuthenticated()) {
      this.authForm.enable();
    }
  }

  onRegistration(): void {
    this.router.navigateByUrl('/registration').then(data => console.log(data));
  }
}
