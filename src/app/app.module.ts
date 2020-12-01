import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModules} from './logic/moduls/MaterialModules';
import {ReactiveFormsModule} from '@angular/forms';
import { FormUserRegistrationComponent } from './components/forms/form-user-registration/form-user-registration.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormUserAuthenticationComponent } from './components/forms/form-user-authentication/form-user-authentication.component';
import {RouterModule} from '@angular/router';

import {TokenInterceptor} from './logic/shared/classes/tokenInterceptor';
import { FormIngredientPostingComponent } from './components/forms/form-ingredient-posting/form-ingredient-posting.component';
import {routes} from './logic/moduls/RouterModule';
import '@angular/compiler';
import {FormPizzaPostingComponent} from './components/forms/form-pizza-posting/form-pizza-posting.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar-login/snack-bar.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { SnackBarRegistrationComponent } from './components/snack-bar/snack-bar-registration/snack-bar-registration.component';
import { FormSizePizzaPostComponent } from './components/forms/form-size-pizza-post/form-size-pizza-post.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers} from './logic/store/redusers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { PizzaPageComponent } from './components/pizza/pizza-page/pizza-page.component';
import { PizzaCardComponent } from './components/pizza/pizza-card/pizza-card.component';
import {PizzaChooseSheetComponent} from './components/pizza/pizza-choose-sheet/pizza-choose-sheet.component';
import { IngredientCardComponent } from './components/pizza/ingredient-card/ingredient-card.component';




@NgModule({
  declarations: [
    AppComponent,
    FormUserRegistrationComponent,
    FormUserAuthenticationComponent,
    FormPizzaPostingComponent,
    FormIngredientPostingComponent,
    HeaderComponent,
    NavBarComponent,
    SnackBarComponent,
    AdminPageComponent,
    SnackBarRegistrationComponent,
    FormSizePizzaPostComponent,
    UserCardComponent,
    UserPageComponent,
    PizzaPageComponent,
    PizzaCardComponent,
    PizzaChooseSheetComponent,
    IngredientCardComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
