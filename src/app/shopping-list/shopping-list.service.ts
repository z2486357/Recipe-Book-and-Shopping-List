import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();
    private ingredients: Ingredient[]=[
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10),
      ];
      getIngredients(){
          return this.ingredients.slice()
      }
      getIngredient(index: number) {
        return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients:Ingredient[]){
        //   for (let ingredient of ingredients){
        //       this.addIngredient(ingredient)
        //   }
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
      }
}
