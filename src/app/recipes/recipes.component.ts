import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipedetail:Recipe
  constructor() { }

  ngOnInit() {
  }

  selectrecipe(select:Recipe){
    this.recipedetail=select
  }

}
