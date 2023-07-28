import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectGenderComponent } from './pages/select-gender/select-gender.component';
import { SelectIngredientsComponent } from './pages/select-ingredients/select-ingredients.component';

const routes: Routes = [
  {
    path: 'gender',
    component: SelectGenderComponent
  },
  {
    path: 'select-ingred',
    component: SelectIngredientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
