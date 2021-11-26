import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  /* private recipes: Recipe[] = [
    new Recipe(
      'Penne Bolognese',
      'En äkta Italiensk Penne Bolognese',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRfpZB0_3qGRT0vx7Jlw662goIgQc9en4esg&usqp=CAU',
      [new Ingredient('Nötfärs', 500), new Ingredient('Penne', 100)]
    ),
    new Recipe(
      'Tagliatelle Bolognese',
      'En äkta Italiensk Tagliatelle Bolognese ',
      'https://cdn.mutti-parma.com/app/uploads/sites/14/2020/06/j3t2bzga.jpeg-free-to-use.jpg',
      [new Ingredient('Nötfärs', 500), new Ingredient('Tagliatelle', 100)]
    ),
  ]; */

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
