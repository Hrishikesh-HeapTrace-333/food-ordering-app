import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ValidUser } from 'src/app/login-form/login-form.component';
import { User } from 'src/app/shared/model/user';
import { setUserStateA } from 'src/app/store/food.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserName: string = '';
  isAuthenticated: boolean = false;
  isComeFromCheckout: boolean = false;
  addUserURL: string = 'http://localhost:8000/api/user';
  loginUserURL: string = 'http://localhost:8000/api/authenticate';
  users: User[] = [];

  constructor(
    private userStore: Store<{ users: User[] }>,
    private http: HttpClient
  ) {
    userStore.subscribe((data: any) => {
      this.users = data.users.users;
    });
  }

  // addUser(user: User): boolean {
  //   // Adding new users to the database
  //   let response: any = this.http.post(this.userURL, user);
  //   console.log('response', response);

  //   if (response.success) {
  //     // storing new user in ngRx for efficient access
  //     this.userStore.dispatch(setUserStateA({ user: user }));
  //     this.userStore.subscribe((data: any) => {
  //       this.users = data.users.users;
  //       console.log(response);
  //       // console.log(this.users);
  //     });
  //     return true;
  //   }
  //   return false;
  // }
  addUser(user: User): Promise<boolean> {
    return this.http
      .post<any>(this.addUserURL, user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .toPromise()
      .then((response) => {
        if (response.success) {
          // this.userStore.dispatch(setUserStateA({ user: user }));
          // this.userStore.subscribe((data: any) => {
          //   this.users = data.users.users;
          // });
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        return false;
      });
  }

  async authenticate(user: {
    email: string;
    password: string;
  }): Promise<ValidUser> {
    return this.http
      .post<any>(this.loginUserURL, user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .toPromise()
      .then((response) => {
        console.log('response', response);
        if (response.success && response.user) {
          this.isAuthenticated = true;
          this.currentUserName = response.user.firstName;
          return { isValid: true, user: response.user };
        } else {
          return { isValid: false, user: undefined };
        }
      })
      .catch((error) => {
        console.error('Error authenticating user:', error);
        return { isValid: false, user: undefined };
      });
  }

  logout() {
    // Implement logout logic if needed
    this.isAuthenticated = false;
    this.currentUserName = '';
  }
}
