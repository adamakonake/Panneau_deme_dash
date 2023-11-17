import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypEquipementComponent } from './typ-equipement.component';

describe('TypEquipementComponent', () => {
  let component: TypEquipementComponent;
  let fixture: ComponentFixture<TypEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
