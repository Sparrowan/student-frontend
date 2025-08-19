import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateExcel } from './generate-excel';

describe('GenerateExcel', () => {
  let component: GenerateExcel;
  let fixture: ComponentFixture<GenerateExcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateExcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateExcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
