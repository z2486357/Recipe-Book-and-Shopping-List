import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
  recipedetail:Recipe
  constructor(private recipeservice:RecipeService) { }

  ngOnInit() {
    this.recipeservice.RecipeSelected.subscribe(
      (recipe:Recipe) => this.recipedetail=recipe
    )
  }
}
