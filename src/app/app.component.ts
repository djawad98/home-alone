import { Component, OnInit, inject } from '@angular/core';
import { AppService } from './core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'home-alone';
  private _appService = inject(AppService)

  ngOnInit(){
  }
}
