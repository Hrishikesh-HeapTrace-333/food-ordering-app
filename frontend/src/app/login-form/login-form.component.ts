import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../shared/model/user';
import { setActiveUserStateA } from '../store/food.action';
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

  validUser: ValidUser = {
    isValid: false,
    user: undefined,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private activeUserStore: Store<{ user: User }>,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async submitForm(): Promise<void> {
    if (this.loginForm.invalid) {
      // Mark all controls as touched to show validation errors
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      this.validUser = await this.userService.authenticate({ email, password });
      console.log('valid user', this.validUser);

      if (this.validUser.isValid && this.validUser.user) {
        const updatedUser = { ...this.validUser.user };

        if (this.cartService.cart) {
          updatedUser.cart = this.cartService.cart;
        }

        this.activeUserStore.dispatch(
          setActiveUserStateA({ activeUser: updatedUser })
        );

        if (this.userService.isComeFromCheckout) {
          this.router.navigateByUrl('/checkout');
        } else {
          this.router.navigateByUrl('/home');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('An error occurred during login. Please try again later.');
    }
  }
}
