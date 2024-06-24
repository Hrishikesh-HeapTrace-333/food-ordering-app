import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Food } from 'src/app/shared/model/food';
import { getFoodStateA, setFoodStateA } from 'src/app/store/food.action'; // Import setFoodStateA action

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  public textFilter : string = '';
  private foods: Food[] = [];
  private getFoodUrl = 'assets/food.json';

  constructor(
    private http: HttpClient,
    private store: Store<{ foods: Food[] }>
  ) {}

  // Fetch data from URL, store in store, and return the stored data
  getAll(): Observable<any> {
    return this.http.get<any>(this.getFoodUrl).pipe(
      tap((data) => {
        this.foods = data; // Update local foods array
        this.store.dispatch(setFoodStateA({ foods: this.foods })); // Dispatch action with fetched data
      })
    );
  }

  // Return the stored data from the store
  getStoredFoods(): Observable<Food[]> {
    return this.store.select((state) => {
      // console.log("getStoredFoods()");
      // console.log(state.foods);
      return state.foods;
    }); // Return the observable directly
  }
}
