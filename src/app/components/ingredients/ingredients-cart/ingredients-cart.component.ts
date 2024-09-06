import { Component } from '@angular/core';
import { RecipesService } from '../../../services/http/recipes.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { IngredientsService } from '../../../services/http/ingredients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-ingredients-cart',
    templateUrl: './ingredients-cart.component.html',
    styleUrls: ['./ingredients-cart.component.css']
})
export class IngredientsCartComponent {
    recipeForm: FormGroup;

    foundRecipes: any[] = [];

    selectedIngredients: any[] = [];
    availableRecipes: any[] = [];
    allIngredients: any[] = []; // Aqui você carregaria a lista de ingredientes possíveis

    constructor(private fb: FormBuilder,
        private recipesService: RecipesService,
        private ingredientsService: IngredientsService,
        private toastr: ToastrService) {
        this.recipeForm = this.fb.group({
            ingredients: this.fb.array([]),
        });
    }

    get ingredients() {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    // Adiciona um ingrediente ao "carrinho"
    addIngredient(): void {
        const ingredientForm = this.fb.group({
            ingredient: '',
            quantity: '',
        });
        this.ingredients.push(ingredientForm);
    }

    // Remove um ingrediente do "carrinho"
    removeIngredient(index: number): void {
        this.ingredients.removeAt(index);
    }

    searchRecipes(): void {
        const ingredients = this.recipeForm.value.ingredients
            .filter((ingredient: any) => ingredient.ingredient) // Filtra ingredientes válidos
            .map((ingredient: any) => {
                return {
                    ingredient: ingredient.ingredient._id || ingredient.ingredient, // Verifique se o valor correto está sendo extraído
                    quantity: ingredient.quantity,
                };
            });

        console.log('Ingredientes a serem enviados:', ingredients); // Verifique se os ingredientes estão corretos aqui

        this.recipesService.searchByIngredients(ingredients).subscribe(
            (compatibleRecipes) => {
                if (compatibleRecipes) {
                    this.foundRecipes = compatibleRecipes;
                    console.log('Receitas compatíveis encontradas:', compatibleRecipes);
                } else {
                    this.toastr.error('Nenhuma receita encontrada com o(s) ingrediente(s) informado(s)!')
                }

            },
            (error) => {
                console.error('Erro ao buscar receitas compatíveis:', error);
            }
        );
    }




    searchIngredients = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>
                this.ingredientsService.searchIngredients(term).pipe(
                    map(response => {
                        const filtered = response.filter((ingredient: any) =>
                            ingredient.name.toLowerCase().includes(term.toLowerCase())
                        );
                        return filtered;
                    })
                )
            )
        );

    formatIngredientInput(value: any): string {
        return value ? value.name : '';
    }

    formatIngredientResult(value: any): string {
        return value.name;
    }
}
