import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  r: any;

  userIdCount: number = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.passwordMatchValidator.bind(this),
      ]),
    });
  }

  submitForm(): void {
    this.r = this.registrationForm.value;
    this.addUser({
      userId: 0,
      firstName: this.r.firstName,
      lastName: this.r.lastName,
      email: this.r.email,
      phone: this.r.phone,
      password: this.r.password,
      cart: {
        userId: 0,
        orderDetails: [],
      },
    }).then((success) => {
      if (success) {
        // handle successful user addition
        alert('User added successfully');
        // additional logic for successful user addition
      } else {
        // handle failure to add user
        alert('Failed to add user');
      }
    });
  }

  async addUser(user: User): Promise<boolean> {
    console.log('user', user);
    return this.userService.addUser(user);
  }

  private passwordMatchValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    if (this.registrationForm) {
      return control.value === this.registrationForm.get('password')?.value
        ? null
        : { mismatch: true };
    }
    return null;
  }
}
