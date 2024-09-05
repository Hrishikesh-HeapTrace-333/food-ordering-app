import { Food } from "./food";

export interface Item{
    food : Food;
    number : number;
}

export interface Cart{
    userId : number;
    orderDetails : Item[];
}