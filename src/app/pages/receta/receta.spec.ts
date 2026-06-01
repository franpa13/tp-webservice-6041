import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Receta } from './receta';

describe('Receta', () => {
  let component: Receta;
  let fixture: ComponentFixture<Receta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Receta],
    }).compileComponents();

    fixture = TestBed.createComponent(Receta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
