import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Musico } from './musico';

describe('Musico', () => {
  let component: Musico;
  let fixture: ComponentFixture<Musico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Musico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Musico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
