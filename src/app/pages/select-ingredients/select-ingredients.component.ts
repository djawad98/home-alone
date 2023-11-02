import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../../core/models/ingredient';
import { IngredientCategory } from '../../core/models/ingredient-categories';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-select-ingredients',
  templateUrl: './select-ingredients.component.html',
  styleUrls: ['./select-ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectIngredientsComponent {

  private _appService = inject(AppService);
  private _router = inject(Router);
  currentCategory$ = this._appService.selectedIngredCategory$;
  gender$ = this._appService.gender$;
  categories$ = this._appService.ingredCategories$;
  ingredients$ = this._appService.selectedCategoryIngreds$;
  selectedIngredients$ = this._appService.selectedIngreds$;

  constructor(){
    this._appService.loadIngredCategories()
    this._appService.loadIngredients()
  }

  selectCategory(category: IngredientCategory){
    this._appService.selectCategory(category)
  }

  selectIngredient(ingred: Ingredient){
    this._appService.selectIngred(ingred)
  }

  getRecipes(){
    this._router.navigate(['recipes'])
    this._appService.loadFoods();
    this._appService.loadRecipes();
  }
}
