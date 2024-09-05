import { createAction, props } from '@ngrx/store';
import { Food } from '../shared/model/food';
import { User } from '../shared/model/user';

export const getFoodStateA = createAction('[Food] Load Food');

export const setFoodStateA = createAction(
    '[Food] Set Food',
    props<{ foods: Food[] }>() // Corrected the closing parenthesis and added props<{ foods: Food[] }>()
);

export const getTextFilterStateA = createAction('textfilter');

export const setTextFilterStateA = createAction(
    'textFilter',
    props<{ textfilter : string }>() 
);

export const getUserStateA = createAction('users');

export const setUserStateA = createAction(
    'users',
    props<{user : User}>()
);

export const getActiveUserStateA = createAction('active user');

export const setActiveUserStateA = createAction(
    'active user',
    props<{activeUser : User | undefined}>()
);
