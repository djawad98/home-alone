import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  currentCategory$ = this._appService.currentCategory$;
  gender$ = this._appService.gender$;
  categories$ = this._appService.ingredientCategories$;
  ingredients$ = this._appService.filteredIngredients$;

  selectCategory(category: IngredientCategory){
    this._appService.selectCategory(category)
  }

  selectIngredient(ingred: Ingredient){
    this._appService.selectIngredient(ingred)
  }
}
