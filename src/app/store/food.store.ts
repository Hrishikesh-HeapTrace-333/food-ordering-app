import { Food } from '../shared/model/food';
import { User } from '../shared/model/user';

export interface FoodState {
  foods: Food[];
}

export const initialFood: FoodState = {
  foods: [],
};

export interface TextFilter {
  textfilter: string;
}

export const InitialTextFilter : TextFilter = {
  textfilter: ''
};


export interface UserState {
  users: User[];
}

export const initialUser : UserState = {
  users : [
    {
      userId : 1,
      firstName: 'Hrishi',
      lastName: 'Kalekinge',
      email: 'a',
      phone: '1234567890',
      password: 'a',
      cart: {
        userId: 0,
        orderDetails: [],
      },
    }
  ]
};

export interface ActiveUserState{
  activeUser : User | undefined;
}

export const initialActiveUser : ActiveUserState = {
  activeUser : {
    userId : 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cart: {
      userId: 0,
      orderDetails: [],
    },
  }
};
