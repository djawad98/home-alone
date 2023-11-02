import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@app/core/services/app.service';
import { Gender } from '@app/core/models/gender';

@Component({
  selector: 'app-select-gender',
  templateUrl: './select-gender.component.html',
  styleUrls: ['./select-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGenderComponent {

  private _appService = inject(AppService);
  private _router = inject(Router);

  readonly Gender = Gender;

  setGender(gender: Gender) {
    this._appService.setGender(gender);
    this._router.navigate(['/ingredients'])
    // this._appService.getTodos().subscribe()
  }

}
