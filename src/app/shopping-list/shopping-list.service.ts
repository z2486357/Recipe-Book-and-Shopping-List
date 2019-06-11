import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, Response } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();

  constructor(private http: Http) { }

    private ingredients: Ingredient[]=[
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10),
      ];
      getIngredients(){
          return this.ingredients.slice()
      }
      getIngredient(index: number) {
        return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients:Ingredient[]){
        //   for (let ingredient of ingredients){
        //       this.addIngredient(ingredient)
        //   }
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
  }
  saveToServer() {
    return this.http.put('https://course-project-c59ce.firebaseio.com/shoppingListData.json', this.getIngredients());
  }

  fetchFromServer() {
    return this.http.get('https://course-project-c59ce.firebaseio.com/shoppingListData.json')
      .pipe(map(
        (response: Response) => {
          if (response.json() === null) {
            console.log('There is no shopping list data in server')
          } else {
            this.ingredients = response.json();
            this.ingredientChanged.next(this.ingredients.slice());
          }
          
        }
      ))
      .pipe(catchError(
        (error: Response) => {
          return throwError('Something Wrong');
        }
      ))
  }
      
}
