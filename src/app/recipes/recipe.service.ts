import { Recipe } from './recipes.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, Response } from "@angular/http";
import { map, catchError, take, exhaustMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from '../auth/auth/auth.service';

@Injectable()
export class RecipeService{
  newRecipe = new Subject<Recipe[]>();

  constructor(private shoppinglistservice: ShoppingListService,
              private http:Http,
              private authservice:AuthService) { }
    private recipes: Recipe[]=[
        // new Recipe(
        //     'Recipe 1',
        //     'This is just a test1',
        //     'https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg',
        //     [
        //         new Ingredient('Meat',1),
        //         new Ingredient('French Fries',20)
        //     ]),
        // new Recipe(
        //     'Recipe 2',
        //     'This is just a test2',
        //     'https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg',
        //     [
        //         new Ingredient('Buns',2),
        //         new Ingredient('Meat',1)
        //     ]
        //     )
  ]

    getRecipes(){
        return this.recipes.slice()
    }

    getRecipe(index:number){
        return this.recipes[index]
    }

    addIngredientToShoppingList(ingredient:Ingredient[]){
        // for (let ig of ingredient){
        //     this.shoppinglistservice.addIngredient(ig)
        // }
        this.shoppinglistservice.addIngredients(ingredient)
    }

    editRecipe(index: number, recipe: Recipe) {
      this.recipes[index] = recipe;
      this.newRecipe.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.newRecipe.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
      this.recipes.splice(index, 1)
      this.newRecipe.next(this.recipes.slice());
    }

    saveToServer() {
      return this.http.put('https://course-project-c59ce.firebaseio.com/recipeData.json', this.getRecipes());
    }

    fetchFromServer() {
      return this.authservice.user.pipe(take(1),
      exhaustMap(user=>{
        return this.http.get(
          'https://course-project-c59ce.firebaseio.com/recipeData.json?auth='+user.token
          );
      }),
      map(
        (response: Response) => {
          if (response.json() === null) {
            console.log('There is no recipe data in server');
          } else {
            this.recipes = response.json();
            for (let recipe of this.recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            this.newRecipe.next(this.recipes.slice());  
          }
          
        }
      ),
      catchError(
        (error: Response) => {
          return throwError('Something Wrong');
        }
      ))
    }
}
