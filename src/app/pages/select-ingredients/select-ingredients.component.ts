import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-select-ingredients',
  templateUrl: './select-ingredients.component.html',
  styleUrls: ['./select-ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectIngredientsComponent {

  private _appService = inject(AppService);
  gender$ = this._appService.gender$;
}
