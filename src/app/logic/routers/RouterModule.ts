import { Routes } from '@angular/router';
import {FormIngredientPostingComponent} from '../../components/form-ingredient-posting/form-ingredient-posting.component';
import {FormPizzaPostingComponent} from '../../components/form-pizza-posting/form-pizza-posting.component';
import {FormUserAuthenticationComponent} from '../../components/form-user-authentication/form-user-authentication.component';
import {FormUserRegistrationComponent} from '../../components/form-user-registration/form-user-registration.component';

export const routes: Routes = [
  {path: 'ingredient_post', component: FormIngredientPostingComponent},
  {path: 'pizza_post', component: FormPizzaPostingComponent},
  {path: 'authenticate', component: FormUserAuthenticationComponent},
  {path: 'registration', component: FormUserRegistrationComponent}
];

