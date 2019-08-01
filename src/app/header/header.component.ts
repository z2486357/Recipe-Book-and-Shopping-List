import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth=false;
  private userSub:Subscription;

  constructor(private recipeservice: RecipeService,
    private shoppinglistservice: ShoppingListService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuth=!user? false:true;
      //this.isAuth=true;
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  savedata() {
    this.recipeservice.saveToServer().subscribe(
      (response) => console.log(response),
    );
    // this.shoppinglistservice.saveToServer().subscribe(
    //   (response) => console.log(response),
    // );
  }

  fetchdata() {
    this.recipeservice.fetchFromServer().subscribe();
    // this.shoppinglistservice.fetchFromServer().subscribe(
    //   (response) => console.log(response),
    // )
  }
}
