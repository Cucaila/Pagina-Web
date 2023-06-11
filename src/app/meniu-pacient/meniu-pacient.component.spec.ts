import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniuPacientComponent } from './meniu-pacient.component';

describe('MeniuPacientComponent', () => {
  let component: MeniuPacientComponent;
  let fixture: ComponentFixture<MeniuPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniuPacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeniuPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
