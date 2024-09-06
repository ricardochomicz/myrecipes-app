import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../../services/http/recipes.service';
import { debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap } from 'rxjs';
import { IngredientsService } from '../../../services/http/ingredients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-recipes-form',
    templateUrl: './recipes-form.component.html',
    styleUrls: ['./recipes-form.component.css']
})
export class RecipesFormComponent {

    units: string[] = ['Xícara', 'Colher', 'Kg', 'Grama', 'Litro', 'Mililitro', 'Unidade'];

    @Input()
    recipeForm!: FormGroup;

    @Input()
    recipeId?: number;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    formatIngredientInput = (ingredient: any) => ingredient.name || '';  // Mostra o nome do ingrediente no input

    formatIngredientResult = (ingredient: any) => ingredient.name; // Mostra o nome do ingrediente nas sugestões

    selectedFile: File | null = null;

    constructor(private fb: FormBuilder,
        private recipesService: RecipesService,
        private ingredientsService: IngredientsService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService) {
        this.recipeForm = this.fb.group({
            name: ['', Validators.required],
            descriptions: ['', Validators.required],
            image: [''],
            time: ['', Validators.required],
            method: this.fb.array([]),
            rating: [''],
            ingredients: this.fb.array([]),
        });
    }

    ngOnInit() {
        if (this.recipeId) {
            this.loadRecipe(this.recipeId);
        }
    }

    loadRecipe(id: number): void {
        this.recipesService.get(id).subscribe(recipe => {
            this.recipeForm.patchValue({
                name: recipe.name,
                descriptions: recipe.descriptions,
                image: recipe.image,
                time: recipe.time,
                rating: recipe.rating
            });

            // Limpa FormArray existente
            this.method.clear();
            this.ingredients.clear();

            // Adiciona novas etapas
            recipe.method.forEach(step => {
                this.method.push(this.fb.group({
                    stepNumber: [step.stepNumber, Validators.required],
                    stepDescription: [step.stepDescription, Validators.required]
                }));
            });

            // Adiciona novos FormGroups para ingredientes
            recipe.ingredients.forEach(ingredient => {
                this.ingredients.push(this.fb.group({
                    ingredient: [ingredient.ingredient, Validators.required],
                    compatibility: [ingredient.compatibility, Validators.required],
                    quantity: [ingredient.quantity, Validators.required],
                    unity: [ingredient.unity, Validators.required]
                }));
            });
        });
    }

    get method() {
        return this.recipeForm.get('method') as FormArray;
    }

    get ingredients() {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    addMethod() {
        this.method.push(this.fb.group({
            stepNumber: ['', Validators.required],
            stepDescription: ['', Validators.required]
        }));
    }

    addIngredient() {
        this.ingredients.push(this.fb.group({
            ingredient: ['', Validators.required],
            compatibility: ['', Validators.required],
            quantity: ['', Validators.required],
            unity: ['', Validators.required]
        }));
    }

    removeMethod(index: number) {
        this.method.removeAt(index);
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    searchIngredients = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>
                this.ingredientsService.searchIngredients(term).pipe(
                    map(response => {
                        // Filtra ingredientes que contenham o termo digitado
                        const filtered = response.filter((ingredient: any) =>
                            ingredient.name.toLowerCase().includes(term.toLowerCase())
                        );
                        return filtered;
                    })
                )
            )
        );

    onSubmit() {
        if (this.recipeForm.valid) {
            if (this.recipeId) {
                this.recipesService.update(this.recipeId, this.recipeForm.value).subscribe({
                    next: (recipe) => {
                        this.toastr.success('Receita atualizada com sucesso!')
                        this.router.navigate(['/recipes']);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })

            } else {
                this.recipesService.create(this.recipeForm.value).subscribe(() => {
                    this.toastr.success('Receita cadastrada com sucesso!')
                    this.router.navigate(['/recipes']);
                });
            }
        }
    }

}
