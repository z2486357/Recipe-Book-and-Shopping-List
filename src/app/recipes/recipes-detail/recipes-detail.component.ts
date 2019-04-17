import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input()recipe:Recipe
  constructor(private recipeservice:RecipeService) { }

  ngOnInit() {
  }

  ToShoppingList(){    
    this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients)
  }
}
