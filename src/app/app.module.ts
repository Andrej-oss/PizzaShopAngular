import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModules} from './logic/moduls/MaterialModules';
import {ReactiveFormsModule} from '@angular/forms';
import { FormUserRegistrationComponent } from './components/form-user-registration/form-user-registration.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormUserAuthenticationComponent } from './components/form-user-authentication/form-user-authentication.component';
import {RouterModule} from '@angular/router';
import {UserService} from './logic/services/post.service/user/user.service';
import {TokenInterceptor} from './logic/shared/classes/tokenInterceptor';
import { FormIngredientPostingComponent } from './components/form-ingredient-posting/form-ingredient-posting.component';
import {routes} from './logic/routers/RouterModule';
import '@angular/compiler';
import {FormPizzaPostingComponent} from './components/form-pizza-posting/form-pizza-posting.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    FormUserRegistrationComponent,
    FormUserAuthenticationComponent,
    FormIngredientPostingComponent,
    FormPizzaPostingComponent,
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
