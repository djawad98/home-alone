import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import { SelectGenderComponent } from './pages/select-gender/select-gender.component';
import { SelectIngredientsComponent } from './pages/select-ingredients/select-ingredients.component';
import { SelectFoodComponent } from './pages/select-food/select-food.component';
import { RecipeComponent } from './pages/recipe/recipe.component'
import { GenderPipe } from './core/pipes/gender.pipe';

const AntDesign = [
  NzButtonModule,
  NzTabsModule,
  NzBadgeModule
]

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
    BrowserAnimationsModule,
    AppRoutingModule,
    ...AntDesign,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
