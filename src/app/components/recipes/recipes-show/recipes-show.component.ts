import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../../../services/http/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipes-show',
    templateUrl: './recipes-show.component.html',
    styleUrls: ['./recipes-show.component.css']
})
export class RecipesShowComponent implements OnInit {


    recipeId?: any;

    recipe: any;

    constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const recipeId = this.route.snapshot.paramMap.get('id');
        if (recipeId) {
            this.recipeId = recipeId; // Atribuindo o ID
            this.loadRecipe(); // Carregando a receita
        } else {
            this.router.navigate(['/recipes']); // Redirecionando caso não tenha um ID
        }
    }

    loadRecipe(): void {
        this.recipesService.get(this.recipeId).subscribe(recipe => {
            this.recipe = recipe
        });
    }

}
