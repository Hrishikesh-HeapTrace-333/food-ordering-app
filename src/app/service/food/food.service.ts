import { Injectable } from '@angular/core';
import { foods } from 'src/app/shared/model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll() : foods[]{
    return [
      {
        "id": 1,
        "price": 9.99,
        "name": "Cheeseburger",
        "favourite": true,
        "star": 3.5,
        "tags": ["burger", "beef"],
        "imageUrl": "/assets/burger.jpeg",
        "cookTime": "15-20 minutes",
        "origins": "USA"
      },
      {
        "id": 2,
        "price": 12.50,
        "name": "Grilled Chicken Leg Piece",
        "favourite": false,
        "star": 4.2,
        "tags": ["chicken", "grill"],
        "imageUrl": "/assets/chickenlegpiece.jpg",
        "cookTime": "30-40 minutes",
        "origins": "Global"
      },
      {
        "id": 3,
        "price": 7.50,
        "name": "Masala Dosa",
        "favourite": true,
        "star": 4.8,
        "tags": ["dosa", "vegetarian", "south indian"],
        "imageUrl": "/assets/dosa.jpg",
        "cookTime": "20-25 minutes",
        "origins": "India"
      },
      {
        "id": 4,
        "price": 3.50,
        "name": "French Fries",
        "favourite": false,
        "star": 3.0,
        "tags": ["snack", "vegetarian"],
        "imageUrl": "/assets/frenchfries.jpeg",
        "cookTime": "10-15 minutes",
        "origins": "Belgium"
      },
      {
        "id": 5,
        "price": 5.00,
        "name": "Ice Cream Sundae",
        "favourite": true,
        "star": 4.7,
        "tags": ["dessert", "sweet"],
        "imageUrl": "/assets/icecream.jpg",
        "cookTime": "5-10 minutes",
        "origins": "Global"
      },
      {
        "id": 6,
        "price": 2.00,
        "name": "Pani Puri",
        "favourite": false,
        "star": 3.6,
        "tags": ["street food", "vegetarian"],
        "imageUrl": "/assets/panipuri.jpeg",
        "cookTime": "10-15 minutes",
        "origins": "India"
      },
      {
        "id": 7,
        "price": 11.99,
        "name": "Pepperoni Pizza",
        "favourite": true,
        "star": 4.9,
        "tags": ["pizza", "meat"],
        "imageUrl": "/assets/pizza.jpeg",
        "cookTime": "15-20 minutes",
        "origins": "Italy"
      },
      {
        "id": 8,
        "price": 6.75,
        "name": "Club Sandwich",
        "favourite": false,
        "star": 4.3,
        "tags": ["sandwich", "vegetarian"],
        "imageUrl": "/assets/sandwich.jpg",
        "cookTime": "5-10 minutes",
        "origins": "USA"
      }
    ];
  }
}
