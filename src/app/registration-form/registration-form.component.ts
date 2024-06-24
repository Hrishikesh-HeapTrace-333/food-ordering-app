import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  r: any;

  userIdCount: number = 1;

  constructor(private userService: UserService, private router : Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  submitForm() {
    this.r = this.registrationForm.value;
    console.log(this.r);

    this.userService.addUser({
      userId : ++this.userIdCount,
      firstName: this.r.firstName,
      lastName: this.r.lastName,
      email: this.r.email,
      phone: this.r.phone,
      password : this.r.password,
      cart: {
        userId: this.userIdCount,
        orderDetails: [],
      },
    });

    this.router.navigateByUrl("/login");
  }
}
