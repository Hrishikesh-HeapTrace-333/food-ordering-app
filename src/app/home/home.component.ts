import { Component, OnInit } from '@angular/core';
import { FoodService } from '../service/food/food.service';
import { Food } from '../shared/model/food';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { Router } from '@angular/router';
import { getTextFilterStateA, setTextFilterStateA } from '../store/food.action';
import { CartServiceService } from '../service/cart/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  filterText: string = '';
  foodId: number = 0;
  reRenderHeader: boolean = false;
  cartCountNumber: number = 0;
  isCheckout: boolean = false;
  direction : string = '⬆';

  getClass(star: number): string {
    if (star >= 4.5) return 'rating-5';
    if (star >= 3.5) return 'rating-4';
    if (star >= 2.5) return 'rating-3';
    if (star >= 1.5) return 'rating-2';
    return 'rating-1';
  }

  constructor(
    private fs: FoodService,
    private store: Store<{ foods: Food[] }>,
    private storeTextFilter: Store<{ textfilter: string }>,
    private route: Router,
    private service: FoodService,
    private cartCount: CartServiceService
  ) {}

  ngOnInit(): void {
    this.fs.getAll().subscribe((data: Food[]) => (this.foods = data));

    this.filterText = this.service.textFilter;

    this.filter();

    this.cartCountNumber = this.cartCount.cartItemNumber;
  }

  filter() {
    this.service.textFilter = this.filterText;
    this.filterText = this.service.textFilter;

    this.foods = [];
    this.fs.getStoredFoods().subscribe((data: any) => {
      this.foods = data.foods;
      // console.log('filter is called', data.foods);
      // console.log(this.filterText);
      setTimeout(() => {
        this.foods = data.foods.filter((food: { name: string }) =>
          food.name.toLowerCase().includes(this.filterText.toLowerCase())
        );
      }, 0);

      // if (this.foods.length === 0) this.route.navigateByUrl('/notfoundpage');
    });
  }

  clearFilterText() {
    this.filterText = '';
    this.filter();
  }

  openModal(foodId: number) {
    console.log('modal opened ' + foodId);
    this.foodId = foodId;
    this.reRenderHeader = false;
  }

  closeModal() {
    this.foodId = 0;
    this.reRenderHeader = true;
  }

  showCheckout() {
    this.isCheckout = true;
  }

  hideCheckout() {
    this.isCheckout = false;
  }

  changeRender() {
    this.reRenderHeader = !this.reRenderHeader;
  }

  sortByRating(){
    if(this.direction === '⬆')
      this.direction = '⬇️';
    else
      this.direction = '⬆';

      this.foods.sort((a, b) =>{
        if(this.direction === '⬆')
        return a.star - b.star;
        else 
        return b.star - a.star;
      })
  }
}
