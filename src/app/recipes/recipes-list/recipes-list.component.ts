import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output()recipewasSelected=new EventEmitter<Recipe>()
  recipes: Recipe[]=[
    new Recipe('A test recipe1','This is just a test1','https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg'),
    new Recipe('A test recipe2','This is just a test2','https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg'),
    new Recipe('A test recipe3','This is just a test3','https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg'),
    new Recipe('A test recipe4','This is just a test4','https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg')
  ]
    

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipewasSelected.emit(recipe)
  }
}
