import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Gender } from 'src/app/core/models/gender';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-select-gender',
  templateUrl: './select-gender.component.html',
  styleUrls: ['./select-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGenderComponent {

  private _appService = inject(AppService);
  readonly Gender = Gender;

  setGender(gender: Gender) {
    this._appService.setGender(gender)
  }

}
