import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientsService } from 'src/app/services/http/ingredients.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Ingredient } from 'src/app/models';
import { IngredientEditService } from '../ingredient-edit.service';

@Component({
    selector: 'app-ingredients-edit',
    templateUrl: './ingredients-edit.component.html',
    styleUrls: ['./ingredients-edit.component.css']
})
export class IngredientsEditComponent {
    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    ingredientForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
    });
    constructor(private ingredientsService: IngredientsService,
        private ingredientEditService: IngredientEditService
    ) {

    }

    _ingredientId!: number;


    @Input()
    set ingredientId(value: number) {
        this._ingredientId = value

        if (this._ingredientId) {
            this.ingredientsService.get(value)
                .subscribe(ingredient => {
                    console.log(ingredient)
                    this.ingredientForm.patchValue(ingredient)
                })
        }
    }

    submit() {
        this.ingredientsService.update(this._ingredientId, this.ingredientForm.value)
            .subscribe({
                next: (ingredient) => {
                    this.modal.hide()
                    this.onSuccess.emit(ingredient)
                },
                error: (error) => {
                    this.onError.emit(error)
                }
            })
    }



    showModal() {
        setTimeout(() => {
            this.modal.show()
        }, 500)

    }

    hideModal($event: Event) {

    }

}
