import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGenderComponent } from './select-gender.component';
import { HttpClientModule } from '@angular/common/http';

describe('SelectGenderComponent', () => {
  let component: SelectGenderComponent;
  let fixture: ComponentFixture<SelectGenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectGenderComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(SelectGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
