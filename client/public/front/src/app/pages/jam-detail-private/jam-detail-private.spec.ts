import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamDetailPrivate } from './jam-detail-private';

describe('JamDetailPrivate', () => {
  let component: JamDetailPrivate;
  let fixture: ComponentFixture<JamDetailPrivate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JamDetailPrivate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamDetailPrivate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
