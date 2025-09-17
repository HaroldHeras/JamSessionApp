import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamDetailPublic } from './jam-detail-public';

describe('JamDetailPublic', () => {
  let component: JamDetailPublic;
  let fixture: ComponentFixture<JamDetailPublic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JamDetailPublic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamDetailPublic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
