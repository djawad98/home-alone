import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { SelectGenderComponent } from './pages/select-gender/select-gender.component'

@NgModule({
  declarations: [
    AppComponent,
    SelectGenderComponent
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
