import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { IngredientsListComponent } from "./ingredients-list/ingredients-list.component";
import { Ingredient } from "../../models";

@Injectable({
    providedIn: 'root'
})

export class IngredientEditService {

    private _ingredientListComponent!: IngredientsListComponent
    constructor(private toastr: ToastrService) {
    }

    set ingredientListComponent(value: IngredientsListComponent) {
        this._ingredientListComponent = value
    }

    showModalEdit(ingredientId: number) {
        this._ingredientListComponent.ingredientId = ingredientId
        this._ingredientListComponent.ingredientEdit.showModal()
    }

    onEditSuccess(id: any) {
        this.toastr.success('Ingrediente atualizado com sucesso!');
        // Atualize o ingrediente na lista sem recarregar a página
        this._ingredientListComponent.refreshIngredient(id);
    }

    onEditError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }



}
