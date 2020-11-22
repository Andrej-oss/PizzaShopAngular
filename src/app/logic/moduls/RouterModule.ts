import { Routes } from '@angular/router';
import {FormIngredientPostingComponent} from '../../components/forms/form-ingredient-posting/form-ingredient-posting.component';
import {FormPizzaPostingComponent} from '../../components/forms/form-pizza-posting/form-pizza-posting.component';
import {FormUserAuthenticationComponent} from '../../components/forms/form-user-authentication/form-user-authentication.component';
import {FormUserRegistrationComponent} from '../../components/forms/form-user-registration/form-user-registration.component';
import {AdminPageComponent} from '../../components/admin-page/admin-page.component';

export const routes: Routes = [
  {path: 'ingredient_post', component: FormIngredientPostingComponent},
  {path: 'pizza_post', component: FormPizzaPostingComponent},
  {path: 'authenticate', component: FormUserAuthenticationComponent},
  {path: 'registration', component: FormUserRegistrationComponent},
  {path: 'admin', component: AdminPageComponent}
];

