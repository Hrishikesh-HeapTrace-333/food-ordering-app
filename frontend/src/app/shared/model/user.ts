import { Cart } from "./cart";

export interface User {
    userId : number
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    cart : Cart
}
