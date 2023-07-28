import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectGenderComponent } from './pages/select-gender/select-gender.component';

const routes: Routes = [
  {
    path: 'gender',
    component: SelectGenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
