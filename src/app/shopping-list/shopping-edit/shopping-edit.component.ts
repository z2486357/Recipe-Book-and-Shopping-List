import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') shoppinglistForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;


  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppinglistservice.startEdit.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppinglistservice.getIngredient(index);
        this.shoppinglistForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value=form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppinglistservice.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shoppinglistservice.addIngredient(newIngredient)
    }
    this.shoppinglistForm.reset();
    this.editMode = false;
  }

  clear() {
    this.shoppinglistForm.reset();
    this.editMode = false;
  }
  delete() {
    this.shoppinglistservice.deleteIngredient(this.editItemIndex);
    this.clear();
  }
}
