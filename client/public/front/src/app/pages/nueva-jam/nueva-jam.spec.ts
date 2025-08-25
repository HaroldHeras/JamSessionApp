import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaJam } from './nueva-jam';

describe('NuevaJam', () => {
  let component: NuevaJam;
  let fixture: ComponentFixture<NuevaJam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaJam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaJam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
