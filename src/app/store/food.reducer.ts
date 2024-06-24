import { createReducer, on } from '@ngrx/store';
import { ActiveUserState, FoodState, InitialTextFilter, TextFilter, UserState, initialActiveUser, initialFood, initialUser } from './food.store';
import {
  getActiveUserStateA,
  getFoodStateA,
  getTextFilterStateA,
  getUserStateA,
  setActiveUserStateA,
  setFoodStateA,
  setTextFilterStateA,
  setUserStateA,
} from './food.action';

const _foodReducer = createReducer(
  initialFood,

  on(getFoodStateA, (state) => ({
    ...state,
  })),

  on(setFoodStateA, (state, action) => ({
    ...state,
    foods: action.foods,
  }))
);

export function foodReducer(state: FoodState | undefined, action: any) {
  return _foodReducer(state, action);
}

const _textFilterReducer = createReducer(
  InitialTextFilter,

  on(getTextFilterStateA, (state) => ({
    ...state,
  })),
  on(setTextFilterStateA, (state, action) => ({
    ...state,
    textfilter: action.textfilter,
  }))
);

export function textFilterReducer(state: TextFilter | undefined, action: any) {
  return _textFilterReducer(state, action);
}

const _userStateReducer = createReducer(
  initialUser,

  on(setUserStateA, (state, action) => ({
    ...state,
    users: [...state.users, action.user],
  })),
  on(getUserStateA, (state) => ({
    ...state
  }))
)

export function userStateReducer(state : UserState | undefined,  action : any){
  return _userStateReducer(state, action);
}

const _activeUserStateReducer = createReducer(
  initialActiveUser,
  
  on(setActiveUserStateA, (state, action) => ({
    ...state,
    activeUser : action.activeUser
  })),
  on(getActiveUserStateA, (state) => ({
    ...state
  }))
)

export function activeUserStateReducer(state : ActiveUserState | undefined, action : any){
  return _activeUserStateReducer(state, action);
}
