import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricienDialogComponent } from './electricien-dialog.component';

describe('ElectricienDialogComponent', () => {
  let component: ElectricienDialogComponent;
  let fixture: ComponentFixture<ElectricienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricienDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
