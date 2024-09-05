import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesEditComponent } from './recipes-edit.component';

describe('RecipesEditComponent', () => {
  let component: RecipesEditComponent;
  let fixture: ComponentFixture<RecipesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesEditComponent]
    });
    fixture = TestBed.createComponent(RecipesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
