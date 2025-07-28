import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Espectador } from './espectador';

describe('Espectador', () => {
  let component: Espectador;
  let fixture: ComponentFixture<Espectador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Espectador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Espectador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
