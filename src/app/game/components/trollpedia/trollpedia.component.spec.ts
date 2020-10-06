import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrollpediaComponent } from './trollpedia.component';

describe('TrollpediaComponent', () => {
  let component: TrollpediaComponent;
  let fixture: ComponentFixture<TrollpediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrollpediaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrollpediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
