import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    RecipeSelected=new EventEmitter<Recipe>()

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
}