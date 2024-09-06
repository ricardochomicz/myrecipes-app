import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { RecipesService } from '../../../services/http/recipes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    recipeControl = new FormControl('');

    formatRecipeInput = (recipe: any) => recipe.name || '';  // Mostra o nome da receita no input

    formatRecipeResult = (recipe: any) => recipe.name; // Mostra o nome da receita nas sugestões

    constructor(private recipesService: RecipesService, private router: Router) {

    }

    searchRecipes = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>
                this.recipesService.searchRecipes(term).pipe(
                    map(response => {
                        // Filtra ingredientes que contenham o termo digitado
                        const filtered = response.filter((recipe: any) =>
                            recipe.name.toLowerCase().includes(term.toLowerCase())
                        );
                        return filtered;
                    })
                )
            )
        );

    onRecipeSelected(recipeId: string): void {
        if (recipeId) {
            this.router.navigate(['/recipe-show', recipeId]);
            this.recipeControl.setValue('');
        } else {
            this.router.navigate(['/recipes']);
        }

    }

}
