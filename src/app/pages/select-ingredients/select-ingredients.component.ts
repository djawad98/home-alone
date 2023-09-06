import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/core/models/ingredient';
import { IngredientCategory } from 'src/app/core/models/ingredient-categories';
import { AppService } from 'src/app/core/services/app.service';

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
  categories$ = this._appService.ingredientCategories$;
  ingredients$ = this._appService.filteredIngreds$;
  selectedIngredients$ = this._appService.selectedIngreds$;

  constructor(){
    this.currentCategory$.subscribe(console.log)
  }

  selectCategory(category: IngredientCategory){
    this._appService.actionSelectCategory(category)
  }

  selectIngredient(ingred: Ingredient){
    this._appService.actionSelectIngredient(ingred)
  }

  getRecipes(){
    this._router.navigate(['recipes'])
    this._appService.actionGetRecipes();
  }
}
