import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEndComponent } from './demo-end.component';

describe('DemoEndComponent', () => {
  let component: DemoEndComponent;
  let fixture: ComponentFixture<DemoEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoEndComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
