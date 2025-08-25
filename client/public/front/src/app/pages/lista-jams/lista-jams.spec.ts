import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJams } from './lista-jams';

describe('ListaJams', () => {
  let component: ListaJams;
  let fixture: ComponentFixture<ListaJams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaJams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaJams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
