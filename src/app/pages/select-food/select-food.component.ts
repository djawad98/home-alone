import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFoodComponent {

  private _appService = inject(AppService);

  gender$ = this._appService.gender$;
  suggestedFoods$ = this._appService.suggestedFoods$;

}
