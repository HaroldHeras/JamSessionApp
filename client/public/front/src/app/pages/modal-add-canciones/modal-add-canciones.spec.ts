import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCanciones } from './modal-add-canciones';

describe('ModalAddCanciones', () => {
  let component: ModalAddCanciones;
  let fixture: ComponentFixture<ModalAddCanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddCanciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddCanciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
