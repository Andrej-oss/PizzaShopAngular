import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../logic/services/post.service/user/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarRegistrationComponent} from "../../snack-bar/snack-bar-registration/snack-bar-registration.component";

@Component({
  selector: 'app-form-user-registration',
  templateUrl: './form-user-registration.component.html',
  styleUrls: ['./form-user-registration.component.css']
})
export class FormUserRegistrationComponent implements OnInit {
  isLinear = false;
  hide = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  login: FormControl = new FormControl('', [Validators.maxLength(30), Validators.required]);
  name: FormControl = new FormControl('', [Validators.maxLength(30), Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.maxLength(30), Validators.required]);
  password: FormControl = new FormControl('', [Validators.minLength(10),
    Validators.maxLength(30), Validators.required]);
  confirmPassword: FormControl = new FormControl('', [Validators.minLength(10),
    Validators.maxLength(30), Validators.required]);
  email: FormControl = new FormControl('', [Validators.email, Validators.required]);
  city: FormControl = new FormControl('', Validators.required);
  address: FormControl = new FormControl('', Validators.required);
  phone: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  postCode: FormControl = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      login: this.login,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.passwordValidator.bind(this.firstFormGroup));
    this.secondFormGroup = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      city: this.city,
      address: this.address,
      postCode: this.postCode,
      phone: this.phone,
    }, this.phoneValidator.bind(this));
  }

  passwordValidator(form: FormGroup): null | object {
    const {value: password} = form.controls.password;
    const {value: confirmPassword} = form.controls.confirmPassword;
    return password === confirmPassword ? null : {passwordError: true};
  }

  phoneValidator(form: FormGroup): null | object {
    const {value: phone} = form.controls.phone;
    const regexp = /[A-W]/gi;
    const matches = phone.match(regexp);
    console.log(matches);
    if (matches && matches.length) {
      return {phoneError: true};
    } else {
      return null;
    }
  }

  onSave(firstFormGroup: FormGroup, secondFormGroup: FormGroup): void {
    console.log(firstFormGroup.controls, secondFormGroup.controls);
    const user = {
      username: (`${firstFormGroup.controls.login.value}`).trim().toLowerCase(),
      password: `${firstFormGroup.controls.password.value}`.trim(),
      name: `${secondFormGroup.controls.name.value}`.trim(),
      lastName: `${secondFormGroup.controls.lastName.value}`.trim(),
      city: `${secondFormGroup.controls.city.value}`.trim().toLowerCase(),
      address: `${secondFormGroup.controls.address.value}`.trim().toLowerCase(),
      postCode: `${secondFormGroup.controls.postCode.value}`.trim(),
      phone: `${secondFormGroup.controls.phone.value}`.trim(),
      email: `${secondFormGroup.controls.email.value}`.trim().toLowerCase(),
      role: 'ROLE_USER'
    };
    console.log(user);
    this.userService.saveUser(user).subscribe(data => {
      console.log(data);
      this.snackBar.openFromComponent(SnackBarRegistrationComponent, {
        duration: 2000
      });
    });
  }
}
