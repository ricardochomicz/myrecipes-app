import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesNewComponent } from './recipes-new.component';

describe('RecipesNewComponent', () => {
  let component: RecipesNewComponent;
  let fixture: ComponentFixture<RecipesNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesNewComponent]
    });
    fixture = TestBed.createComponent(RecipesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
