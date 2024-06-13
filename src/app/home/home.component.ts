import { Component, OnInit } from '@angular/core';
import { FoodService } from '../service/food/food.service';
import { foods } from '../shared/model/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  getClass(star: number): string {
    if (star >= 4.5) return 'rating-5';
    if (star >= 3.5) return 'rating-4';
    if (star >= 2.5) return 'rating-3';
    if (star >= 1.5) return 'rating-2';
    return 'rating-1';
  }
  foods : foods[] = [];
  constructor(private fs : FoodService) { }

  ngOnInit(): void {
      this.foods = this.fs.getAll();
  }

}
