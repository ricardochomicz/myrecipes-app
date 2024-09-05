import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { IngredientsService } from '../../../services/http/ingredients.service';



@Component({
  selector: 'app-ingredients-new',
  templateUrl: './ingredients-new.component.html',
  styleUrls: ['./ingredients-new.component.css']
})
export class IngredientsNewComponent {
  @ViewChild(ModalComponent)
  modal!: ModalComponent

  // @ViewChild(RecipeIngredientsComponent)
  // recipeIngredientNew!: RecipeIngredientsComponent

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  ingredientForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private ingredientsService: IngredientsService) {
  }

  submit() {

    this.ingredientsService.create(this.ingredientForm.value)
      .subscribe({
        next: (ingredient) => {
          this.ingredientForm.reset()
          this.modal.hide()
          this.onSuccess.emit(ingredient)
        },
        error: (error) => this.onError.emit(error)
      })
  }

  showModal() {
    this.modal.show()
  }

  hideModal(event: any) {
    this.modal.hide()
  }

}
