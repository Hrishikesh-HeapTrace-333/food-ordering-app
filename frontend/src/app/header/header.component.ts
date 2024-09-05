import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { Store } from '@ngrx/store';
import { User } from '../shared/model/user';
import { setActiveUserStateA } from '../store/food.action';
import { CartServiceService } from '../service/cart/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string = '';
  isRegistered: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private userService: UserService,
    private activeUserStore: Store<{ user: User }>,
    private cartService:CartServiceService
  ) {}

  ngOnInit(): void {
    this.activeUserStore.subscribe((data: any) => {
      this.name = data.activeUser.activeUser.firstName;
      // console.log(data.activeUser.activeUser);
    });
    // console.log('this.isRegistered', this.isRegistered);
    this.isRegistered = this.name !== '';

    this.cartItemCount = this.cartService.cartItemNumber;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.name = changes['name'].currentValue;
    }
  }

  logout() {
    this.activeUserStore.dispatch(
      setActiveUserStateA({
        activeUser: {
          userId : 0,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          cart: {
            userId: 0,
            orderDetails: [],
          }
        },
      })
    );

    this.userService.isAuthenticated = false;
    this.userService.isComeFromCheckout = false;
    this.cartItemCount = 0;
    this.cartService.cartItemNumber = 0;
  }
}
