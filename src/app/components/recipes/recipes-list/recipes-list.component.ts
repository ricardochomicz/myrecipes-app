import { Component } from '@angular/core';
import { Recipe } from '../../../models';
import { RecipesService } from '../../../services/http/recipes.service';

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {

    recipes: Recipe[] = [];

    currentPage: number = 1;
    totalPages: number = 1;
    loading: boolean = false;

    constructor(
        private recipesService: RecipesService,
    ) {
    }

    ngOnInit(): void {
        this.loadRecipes()
    }

    loadRecipes() {
        if (this.currentPage > this.totalPages) return;

        this.loading = true;
        this.recipesService.list(this.currentPage, 4)
            .subscribe(response => {
                this.recipes.push(...response.data);
                this.totalPages = response.totalPages;
                this.currentPage++;
                this.loading = false;
            }, error => {
                this.loading = false;
                console.error(error);
            });
    }


    getStars(rating: number): any[] {
        return new Array(5);
    }

    updateRating(recipeId: number, newRating: number): void {
        this.recipesService.updateRating(recipeId, newRating).subscribe(
            updatedRecipe => {
                console.log('Rating atualizado com sucesso', updatedRecipe);
                // Você pode atualizar o valor do `recipe.rating` no frontend aqui, se necessário
            },
            error => {
                console.error('Erro ao atualizar o rating', error);
            }
        );
    }

}
