import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartServiceService } from '../service/cart/cart-service.service';
import { Store } from '@ngrx/store';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-grand-total-bar',
  templateUrl: './grand-total-bar.component.html',
  styleUrls: ['./grand-total-bar.component.css'],
})
export class GrandTotalBarComponent implements OnInit {

@Output() showCheckout = new EventEmitter<void>()  

  cartItemCount: number = 0;
  grandTotal: number = 0;

  constructor(
    private cartService: CartServiceService,
    private activeUserStore: Store<{ activeUser: User }>
  ) {}

  ngOnInit(): void {
    this.cartItemCount = this.cartService.cartItemNumber;

    this.activeUserStore.subscribe((user: any) => {
      // console.log("GTB : onInit");
      // console.log(user.activeUser.activeUser.cart.orderDetails);
      user.activeUser.activeUser.cart.orderDetails.forEach(
        (o: { food: { price: number }; number: number }) => {
          this.grandTotal += o.food.price * o.number * 15;
        }
      );
    });

    // console.log(this.grandTotal);
  }

  showCheckoutEvent() {
    this.showCheckout.emit();
    }
}
