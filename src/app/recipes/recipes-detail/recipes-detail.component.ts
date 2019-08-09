import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe
  id: number
  constructor(private recipeservice: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id']
        this.recipe = this.recipeservice.getRecipe(this.id)
      }
    )
  }

  ToShoppingList() {
    this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
  
  deleteRecipe() {
    this.recipeservice.deleteRecipe(this.id)
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
