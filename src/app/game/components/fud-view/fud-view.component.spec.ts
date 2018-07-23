import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FudViewComponent } from './fud-view.component';

describe('FudViewComponent', () => {
  let component: FudViewComponent;
  let fixture: ComponentFixture<FudViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FudViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FudViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
