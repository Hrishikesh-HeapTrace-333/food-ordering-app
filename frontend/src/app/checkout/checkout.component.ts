import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../shared/model/user';
import { Item } from '../shared/model/cart';
import { setActiveUserStateA } from '../store/food.action';
import { Router } from '@angular/router';
import { CartServiceService } from '../service/cart/cart-service.service';
import { UserService } from '../service/user/user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @Output() hideCheckout = new EventEmitter<void>();
  @Output() renderHeaderFooter = new EventEmitter<void>();
  cartItems: Item[] = [];
  showOrder!: boolean;
  isLogged: boolean = false;

  constructor(
    private store: Store<{ activeUser: User }>,
    private router: Router,
    private cartService: CartServiceService,
    private userService: UserService,
    private cd: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((state: any) => {
      if (state && state.activeUser) {
        this.cartItems = state.activeUser.cart.orderDetails;
      }
    });
    this.isLoggedIn();
  }

  closeModal() {
    this.hideCheckout.emit();
  }

  showOrderSuccess() {
    // setTimeout(() => {
      this.showOrder = true;
      let updatedActiveUser;
      this.store.select('activeUser').subscribe((state: any) => {
        updatedActiveUser = JSON.parse(JSON.stringify(state.activeUser));
        console.log(updatedActiveUser);
        updatedActiveUser.cart.orderDetails = [];
        console.log(updatedActiveUser);
      });
  
      this.store.dispatch(setActiveUserStateA({ activeUser: updatedActiveUser }));
      this.cartService.cartItemNumber = 0;
      this.reRenderHeaderFooter();
      this.router.navigateByUrl('/ordersuccess');
    // }, 0); // defer change detection
  }
  

  reRenderHeaderFooter() {
    this.renderHeaderFooter.emit();
  }

  hideOrderSuccess() {
    this.showOrder = false;
    this.closeModal();
  }

  isLoggedIn(): boolean {
    return this.userService.isAuthenticated;
  }

  makeIsComeFromCheckoutTrue(){
    this.userService.isComeFromCheckout = true;
    this.router.navigateByUrl('/login');
  }
}
