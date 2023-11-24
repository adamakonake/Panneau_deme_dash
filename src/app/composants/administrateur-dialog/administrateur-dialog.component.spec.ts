import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateurDialogComponent } from './administrateur-dialog.component';

describe('AdministrateurDialogComponent', () => {
  let component: AdministrateurDialogComponent;
  let fixture: ComponentFixture<AdministrateurDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateurDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrateurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
