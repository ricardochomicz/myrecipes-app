import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";

@Injectable({
    providedIn: 'root'
})

export class RecipeInsertService {

    private _recipeListComponent!: RecipesListComponent
    constructor(private toastr: ToastrService) {
    }

}