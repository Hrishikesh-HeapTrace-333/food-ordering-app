import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public cartItemNumber : number = 0;

  cart : Cart = {
    userId : 0,
    orderDetails : []
  };

  constructor() { }
}
