import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { IngredientsNewComponent } from '../ingredients-new/ingredients-new.component';
import { IngredientsEditComponent } from '../ingredients-edit/ingredients-edit.component';
import { Ingredient } from '../../../models';
import { IngredientsService } from '../../../services/http/ingredients.service';
import { IngredientInsertService } from '../ingredient-insert.service';
import { IngredientEditService } from '../ingredient-edit.service';

@Component({
    selector: 'app-ingredients-list',
    templateUrl: './ingredients-list.component.html',
    styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
    ingredients: Ingredient[] = [];

    currentPage: number = 1;
    totalPages: number = 1;
    loading: boolean = false;

    @ViewChild(IngredientsNewComponent)
    ingredientNew!: IngredientsNewComponent

    @ViewChild(IngredientsEditComponent)
    ingredientEdit!: IngredientsEditComponent

    //@ts-ignore
    ingredientId: number;

    constructor(
        private ingredientsService: IngredientsService,
        public ingredientInsertService: IngredientInsertService,
        public ingredientEditService: IngredientEditService,
        private cdr: ChangeDetectorRef
    ) {
        this.ingredientInsertService.ingredientListComponent = this
        this.ingredientEditService.ingredientListComponent = this
    }

    ngOnInit(): void {
        this.loadIngredients()
    }


    loadIngredients() {
        if (this.currentPage > this.totalPages) return;

        this.loading = true;
        this.ingredientsService.getIngredients(this.currentPage, 5)
            .subscribe(response => {
                // Adiciona os novos ingredientes à lista existente
                this.ingredients = [...this.ingredients, ...response.data];
                this.totalPages = response.totalPages;
                this.currentPage = response.currentPage + 1;  // Incrementa a página atual para a próxima
                this.loading = false;
            }, error => {
                this.loading = false;
                console.error(error);
            });
    }

    refreshIngredient(updatedIngredientId: any) {
        this.ingredientsService.get(updatedIngredientId)
            .subscribe(updatedIngredient => {
                // Encontra o índice do ingrediente na lista
                const index = this.ingredients.findIndex(ingredient => ingredient._id === updatedIngredientId);

                if (index !== -1) {
                    // Atualiza o ingrediente na lista sem mexer nos outros
                    this.ingredients[index] = updatedIngredient;
                }
            }, error => {
                console.error('Erro ao carregar o ingrediente atualizado:', error);
            });
    }





}
