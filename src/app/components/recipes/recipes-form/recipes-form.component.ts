import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../../services/http/recipes.service';
import { debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap } from 'rxjs';
import { IngredientsService } from '../../../services/http/ingredients.service';


@Component({
    selector: 'app-recipes-form',
    templateUrl: './recipes-form.component.html',
    styleUrls: ['./recipes-form.component.css']
})
export class RecipesFormComponent {

    @Input()
    recipeForm!: FormGroup;

    formatIngredientInput = (ingredient: any) => ingredient.name || '';  // Mostra o nome do ingrediente no input

    formatIngredientResult = (ingredient: any) => ingredient.name;

    selectedFile: File | null = null;

    constructor(private fb: FormBuilder,
        private recipesService: RecipesService,
        private ingredientsService: IngredientsService) { }



    ngOnInit() {
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

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    onSubmit() {
        if (this.recipeForm.valid) {
            this.recipesService.create(this.recipeForm.value).subscribe(response => {
                console.log('Receita criada com sucesso.', response);
            });
        }
    }

    // onSubmit(): void {
    //     if (this.selectedFile) {
    //         const formData = new FormData();

    //         // Adiciona a imagem ao FormData
    //         formData.append('image', this.selectedFile, this.selectedFile.name);

    //         // Adiciona outros campos do formulário
    //         formData.append('name', this.fb.get('name').value);
    //         formData.append('descriptions', this.fb.get('descriptions').value);
    //         formData.append('time', this.fb.get('time').value);

    //         // Agora você pode enviar `formData` para o backend
    //         this.recipesService.uploadRecipe(formData).subscribe(response => {
    //             console.log('Receita salva com sucesso:', response);
    //         });
    //     }
    // }
}
