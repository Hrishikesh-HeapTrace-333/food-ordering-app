import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FoodService } from '../service/food/food.service';
import { Food } from '../shared/model/food';
import { User } from '../shared/model/user';
import { Store } from '@ngrx/store';
import { Item } from '../shared/model/cart';
import { setActiveUserStateA } from '../store/food.action';
import { CartServiceService } from '../service/cart/cart-service.service';

@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.css'],
})
export class PopUpModalComponent implements OnInit {
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

  @Input() idInput: number = 0;
  @Output() closeModalEvent = new EventEmitter<void>();

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

  quantityInCart: number = 0;

  constructor(
    private foodService: FoodService,
    private activeUserStore: Store<{ activeUser: User }>,
    private cartService : CartServiceService
  ) {}

  ngOnInit(): void {
    console.log("Modal OnInit Called()");

    this.foodService.getStoredFoods().forEach((foodData: any) => {
      for (let i = 0; i < foodData.foods.length; i++) {
        // console.log(foodData.foods[i]);
        if (foodData.foods[i].id === this.idInput) {
          this.food = foodData.foods[i];
          // this.food.cart.userId = this.idInput;
          // console.log(foodData.foods[i]);
        }
      }
    });

    this.activeUserStore.subscribe((state: any) => {
      // Create a deep copy of activeUser
      this.currentUser = JSON.parse(
        JSON.stringify(state.activeUser.activeUser)
      );
      // console.log(this.currentUser);
    });

    this.quantityInCart = this.getQuantityInCart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idInput']) {
      this.idInput = changes['idInput'].currentValue;

      this.foodService.getStoredFoods().forEach((foodData: any) => {
        for (let i = 0; i < foodData.foods.length; i++) {
          // console.log(foodData.foods[i]);
          if (foodData.foods[i].id === this.idInput) {
            this.food = foodData.foods[i];
            console.log(foodData.foods[i]);
          }
        }
      });
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  addToCart() {
    let foodFound = false;

    this.activeUserStore.subscribe((state: any) => {
      // Create a deep copy of activeUser
      this.currentUser = JSON.parse(
        JSON.stringify(state.activeUser.activeUser)
      );
      // console.log(this.currentUser);
    });

    let orderDetails: Item[] = this.currentUser.cart.orderDetails;

    orderDetails.forEach((order) => {
      if (order.food.id === this.idInput) {
        foodFound = true;
        order.number++;
      }
    });

    if (!foodFound) {
      // console.log(typeof orderDetails);
      let newOrderDetail = [...orderDetails, { food: this.food, number: 1 }];
      this.currentUser.cart.orderDetails = newOrderDetail;
    }

    // updating the modified state
    this.activeUserStore.dispatch(
      setActiveUserStateA({ activeUser: this.currentUser })
    );

    this.cartService.cart = this.currentUser.cart;

    console.log("addToCrat()::");
    console.log(this.currentUser);
    this.cartService.cartItemNumber++;

    this.quantityInCart = this.getQuantityInCart();
  }

  cutFromCart() {
    let foodFound = false;

    this.activeUserStore.subscribe((state: any) => {
      // Create a deep copy of activeUser
      this.currentUser = JSON.parse(
        JSON.stringify(state.activeUser.activeUser)
      );
      // console.log(this.currentUser);
    });

    let orderDetails: Item[] = this.currentUser.cart.orderDetails;

    orderDetails.forEach((order) => {
      if (order.food.id === this.idInput) {
        foodFound = true;
        order.number--;
        if (order.number === 0) { // removing if number == 0
          let newOrderList: Item[] = [];
          orderDetails.forEach(order =>{
            if(order.food.id !== this.idInput) 
              newOrderList.push(order);
          })

          this.currentUser.cart.orderDetails = newOrderList; // updating new list
        } 
      }
    });

    // updating the modified state
    this.activeUserStore.dispatch(
      setActiveUserStateA({ activeUser: this.currentUser })
    );

    this.cartService.cartItemNumber--;
    // console.log(this.currentUser);


    this.quantityInCart = this.getQuantityInCart();
  }

  getQuantityInCart(): number {
    console.log("getQuantityInCart():: ");
    const order = this.currentUser.cart.orderDetails.find((o) => o.food.id === this.idInput);
    return order ? order.number : 0;
  }
  
}
