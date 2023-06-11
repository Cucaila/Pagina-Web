import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniuMedicComponent } from './meniu-medic.component';

describe('MeniuMedicComponent', () => {
  let component: MeniuMedicComponent;
  let fixture: ComponentFixture<MeniuMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniuMedicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeniuMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
