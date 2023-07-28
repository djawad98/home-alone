import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { SelectGenderComponent } from './pages/select-gender/select-gender.component';
import { SelectIngredientsComponent } from './pages/select-ingredients/select-ingredients.component';
import { SelectFoodComponent } from './pages/select-food/select-food.component';
import { RecipeComponent } from './pages/recipe/recipe.component'
import { GenderPipe } from './core/pipes/gender.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectGenderComponent,
    SelectIngredientsComponent,
    SelectFoodComponent,
    RecipeComponent,
    GenderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
