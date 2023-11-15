import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMailPageComponent } from './validation-mail-page.component';

describe('ValidationMailPageComponent', () => {
  let component: ValidationMailPageComponent;
  let fixture: ComponentFixture<ValidationMailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationMailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationMailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
