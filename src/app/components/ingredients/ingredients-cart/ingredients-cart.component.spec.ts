import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCartComponent } from './ingredients-cart.component';

describe('IngredientsCartComponent', () => {
  let component: IngredientsCartComponent;
  let fixture: ComponentFixture<IngredientsCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsCartComponent]
    });
    fixture = TestBed.createComponent(IngredientsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
