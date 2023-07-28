import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectGenderComponent } from './pages/select-gender/select-gender.component';
import { SelectIngredientsComponent } from './pages/select-ingredients/select-ingredients.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SelectFoodComponent } from './pages/select-food/select-food.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gender',
    pathMatch:  'full'
  },
  {
    path: 'gender',
    component: SelectGenderComponent
  },
  {
    path: 'ingredients',
    component: SelectIngredientsComponent
  },
  {
    path: 'recipes',
    component: SelectFoodComponent
  },
  {
    path: '**',
    redirectTo: 'gender'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
