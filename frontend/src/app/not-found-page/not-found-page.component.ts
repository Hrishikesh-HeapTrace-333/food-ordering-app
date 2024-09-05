import { Component, OnInit } from '@angular/core';
import { FoodService } from '../service/food/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {
  constructor(private service : FoodService, private router : Router) { }

  ngOnInit(): void {
  }

  clearFilter() {
      this.service.textFilter = '';
      this.router.navigateByUrl("/home");
    }

}
