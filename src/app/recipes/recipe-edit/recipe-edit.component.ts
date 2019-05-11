import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number
  editMode = false
  recipeForm: FormGroup;
  get recipe() { return this.recipeService.getRecipe(this.id); }
  recipeName:string = '';
  recipeImagePath: string = '';
  recipeDescription: string = '';
  recipeIngredients = new FormArray([]);
  constructor(private route: ActivatedRoute,
              private router:Router,
              private recipeService:RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id']
        this.editMode = param['id'] != null
        this.initForm();
      }
    )
  }
  submit() {
    if (this.editMode) {
      this.recipeService.editRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  deleteIngredient(index: number) {
    this.recipeIngredients.removeAt(index)
  }

  addIngredient() {
    //console.log(this.recipeIngredients.value[this.recipeIngredients.length-1])
    this.recipeIngredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
    );
  }

  private initForm() {
    if (this.editMode) {
      this.recipeName = this.recipe.name;
      this.recipeImagePath = this.recipe.imagePath;
      this.recipeDescription = this.recipe.description;
      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          this.recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipeName, Validators.required),
      imagePath: new FormControl(this.recipeImagePath, Validators.required),
      description: new FormControl(this.recipeDescription, Validators.required),
      ingredients:this.recipeIngredients
    })
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
}
