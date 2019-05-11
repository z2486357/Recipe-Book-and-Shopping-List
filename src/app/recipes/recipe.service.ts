import { Recipe } from './recipes.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService{
  newRecipe = new Subject<Recipe[]>();

    constructor(private shoppinglistservice:ShoppingListService){}

    private recipes: Recipe[]=[
        new Recipe(
            'Recipe 1',
            'This is just a test1',
            'https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries',20)
            ]),
        new Recipe(
            'Recipe 2',
            'This is just a test2',
            'https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg',
            [
                new Ingredient('Buns',2),
                new Ingredient('Meat',1)
            ]
            )
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
}
