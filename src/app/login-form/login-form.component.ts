import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../shared/model/user';
import { getActiveUserStateA, setActiveUserStateA } from '../store/food.action';
import { data } from 'jquery';
import { CartServiceService } from '../service/cart/cart-service.service';

export interface ValidUser {
  isValid: boolean;
  user: User | undefined;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  r!: any;

  validUser: ValidUser = {
    isValid: false,
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      cart: {
        userId: 0,
        orderDetails: [],
      },
    },
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private activeUserStore: Store<{ user: User }>,
    private cartService : CartServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
    });
  }

  submitForm(): void {
    this.r = this.loginForm.value;
    this.validUser = this.userService.authenticate({
      email: this.r.email,
      password: this.r.password,
    });
  
    if (this.validUser.isValid && this.validUser.user) { // Ensure 'user' is defined
      // Clone the user object to avoid modifying the original state directly
      const updatedUser = { ...this.validUser.user };
  
      // Check if cartService.cart is defined
      if (this.cartService.cart !== undefined) {
        updatedUser.cart = this.cartService.cart; // Update the cloned object
      }
  
      // Dispatch action to update activeUser state
      this.activeUserStore.dispatch(
        setActiveUserStateA({ activeUser: updatedUser })
      );
  
      if (this.userService.isComeFromCheckout) {
        this.router.navigateByUrl('/checkout');
      } else {
        this.router.navigateByUrl('/home');
      }
    }
  }
  
  
}
