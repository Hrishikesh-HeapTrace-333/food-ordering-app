import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { activeUserStateReducer, foodReducer, textFilterReducer, userStateReducer } from './store/food.reducer';
import { AboutPageComponent } from './about-page/about-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PopUpModalComponent } from './pop-up-modal/pop-up-modal.component';
import { CartComponent } from './cart/cart.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CheckoutComponent } from './checkout/checkout.component';
import { GrandTotalBarComponent } from './grand-total-bar/grand-total-bar.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutPageComponent,
    NotFoundPageComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    PopUpModalComponent,
    CartComponent,
    CheckoutComponent,
    GrandTotalBarComponent,
    OrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    TagModule,
    StoreModule.forRoot({ foods: foodReducer, textFilter: textFilterReducer, users: userStateReducer, activeUser: activeUserStateReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
