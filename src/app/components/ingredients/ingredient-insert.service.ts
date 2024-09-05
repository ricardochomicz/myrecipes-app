import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { IngredientsListComponent } from "./ingredients-list/ingredients-list.component";

@Injectable({
    providedIn: 'root'
})

export class IngredientInsertService {

    private _ingredientListComponent!: IngredientsListComponent
    constructor(private toastr: ToastrService) {
    }

    set ingredientListComponent(value: IngredientsListComponent) {
        this._ingredientListComponent = value
    }

    showModalInsert() {
        this._ingredientListComponent.ingredientNew.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Ingrediente cadastrado com sucesso!')
        this._ingredientListComponent.loadIngredients()
    }

    onInsertError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }

}
