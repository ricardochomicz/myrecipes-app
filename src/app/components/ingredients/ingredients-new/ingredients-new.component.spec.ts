import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsNewComponent } from './ingredients-new.component';

describe('IngredientsNewComponent', () => {
  let component: IngredientsNewComponent;
  let fixture: ComponentFixture<IngredientsNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsNewComponent]
    });
    fixture = TestBed.createComponent(IngredientsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
