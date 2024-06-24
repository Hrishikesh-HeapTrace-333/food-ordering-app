import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ValidUser } from 'src/app/login-form/login-form.component';
import { User } from 'src/app/shared/model/user';
import { setUserStateA } from 'src/app/store/food.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logout() {
    throw new Error('Method not implemented.');
  }
  currentUserName: string = '';
  isAuthenticated: boolean = false;
  isComeFromCheckout: boolean = false;

  users: User[] = [];

  constructor(private userStore : Store<{users : User[]}>) {
    userStore.subscribe((data : any) => {
      this.users = data.users.users;
    })
  }

  addUser(user: User) {
    this.userStore.dispatch(setUserStateA({user : user}));

    this.userStore.subscribe((data : any) => {
      this.users = data.users.users;
      // console.log("user service addUser()");
      // console.log(this.users);
    })
  }

  authenticate(user: { email: string; password: string }) : ValidUser {
    const authenticatedUser = this.users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if(!!authenticatedUser) {
      this.isAuthenticated = true;
      this.currentUserName = authenticatedUser.firstName;
    }

    console.log(authenticatedUser);
    return {isValid : this.isAuthenticated, user : authenticatedUser} // Converts to boolean (true if found, false if not)
  }
}
