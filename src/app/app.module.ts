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
import {NgxStripeModule} from 'ngx-stripe';
import { PaymentComponent } from './components/payment-components-stripe/payment/payment.component';
import { PaymentModalComponent } from './components/payment-components-stripe/payment-modal/payment-modal.component';
import {ToastrModule} from 'ngx-toastr';
import { PizzaCartCardComponent } from './components/pizza/pizza-cart-card/pizza-cart-card.component';
import { PizzaCardCartItemComponent } from './components/pizza/pizza-card-cart-item/pizza-card-cart-item.component';
import { PizzaCartPageComponent } from './components/pizza/pizza-cart-page/pizza-cart-page.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CommentComponent } from './components/comment/comment.component';



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
    PaymentComponent,
    PaymentModalComponent,
    PizzaCartCardComponent,
    PizzaCardCartItemComponent,
    PizzaCartPageComponent,
    StarRatingComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51Hv6uTGmmCaqYLZpH2DedxpEXPGQFNx7eM4i' +
      'aTxkjowLq94xpVY5ORolZnmokcoiwQ51IAMCWsGC0B6cl6c7EbUg00Aefbn2rC'),
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
