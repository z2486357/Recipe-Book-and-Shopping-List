import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[]=[
    new Recipe('A test recipe','This is just a test','https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg'),
    new Recipe('A test recipe','This is just a test','https://farm5.staticflickr.com/4891/45165261135_69cb589907_b.jpg')
  ]
    

  constructor() { }

  ngOnInit() {
  }

}
