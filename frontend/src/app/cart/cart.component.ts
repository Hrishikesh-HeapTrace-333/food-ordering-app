import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../shared/model/user';
import { Item } from '../shared/model/cart';
import { CartServiceService } from '../service/cart/cart-service.service';
import { setActiveUserStateA } from '../store/food.action';
import { Food } from '../shared/model/food';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Item[] = [];
  isCheckout: boolean = false;
  reRenderHeader: boolean = false;
  currentUser: User = {
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
  };

  food: Food = {
    id: 0,
    price: 0,
    name: '',
    favourite: false,
    star: 0,
    tags: [],
    imageUrl: '',
    cookTime: '',
    origins: '',
    facts: [],
    calories: 0,
    nutrition: {
      fat: '',
      carbohydrates: '',
      protein: '',
      sodium: '',
      fiber: '',
    },
  };

  constructor(private store: Store<{ activeUser: User }>, private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((state: any) => {
      if (state && state.activeUser) {
        this.cartItems = state.activeUser.cart.orderDetails;
      }
    });
  }

  showCheckout() {
    this.isCheckout = true;
  }

  hideCheckout() {
    this.isCheckout = false;
  }

  changeRender() {
    this.reRenderHeader = !this.reRenderHeader;
  }

  addToCart(foodId: number) {
    let foodFound = false;

    this.store.select('activeUser').subscribe((state: any) => {
      this.currentUser = JSON.parse(JSON.stringify(state.activeUser));
    });

    let orderDetails: Item[] = this.currentUser.cart.orderDetails;

    orderDetails.forEach((order) => {
      if (order.food.id === foodId) {
        foodFound = true;
        order.number++;
      }
    });

    if (!foodFound) {
      let newOrderDetail = [...orderDetails, { food: this.food, number: 1 }];
      this.currentUser.cart.orderDetails = newOrderDetail;
    }

    this.store.dispatch(setActiveUserStateA({ activeUser: this.currentUser }));
    
    this.cartService.cartItemNumber++;
    this.changeRender();
  }

  cutFromCart(foodId: number) {
    let foodFound = false;

    this.store.select('activeUser').subscribe((state: any) => {
      this.currentUser = JSON.parse(JSON.stringify(state.activeUser));
    });

    let orderDetails: Item[] = this.currentUser.cart.orderDetails;

    orderDetails.forEach((order) => {
      if (order.food.id === foodId) {
        foodFound = true;
        order.number--;
        if (order.number === 0) {
          let newOrderList: Item[] = [];
          orderDetails.forEach((order) => {
            if (order.food.id !== foodId) newOrderList.push(order);
          });
          this.currentUser.cart.orderDetails = newOrderList;
        }
      }
    });

    this.store.dispatch(setActiveUserStateA({ activeUser: this.currentUser }));
    
    this.cartService.cartItemNumber--;
    this.changeRender();
  }
}
