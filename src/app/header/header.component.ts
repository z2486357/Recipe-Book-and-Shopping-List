import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private recipeservice: RecipeService,
    private shoppinglistservice: ShoppingListService) { }

  savedata() {
    this.recipeservice.saveToServer().subscribe(
      (response) => console.log(response),
    );
    this.shoppinglistservice.saveToServer().subscribe(
      (response) => console.log(response),
    );
  }

  fetchdata() {
    this.recipeservice.fetchFromServer().subscribe(
      (response) => console.log(response),
    )
    this.shoppinglistservice.fetchFromServer().subscribe(
      (response) => console.log(response),
    )
  }
}
