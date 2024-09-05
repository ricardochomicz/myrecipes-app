import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsListComponent } from './ingredients-list.component';

describe('IngredientsListComponent', () => {
  let component: IngredientsListComponent;
  let fixture: ComponentFixture<IngredientsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsListComponent]
    });
    fixture = TestBed.createComponent(IngredientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
