import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamController } from './jam-controller';

describe('JamController', () => {
  let component: JamController;
  let fixture: ComponentFixture<JamController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JamController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
