import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-ingredients-form',
    templateUrl: './ingredients-form.component.html',
    styleUrls: ['./ingredients-form.component.css']
})
export class IngredientsFormComponent {
    constructor(private changeRef: ChangeDetectorRef) {
    }
    @Input()
    ingredientForm!: FormGroup;


    ngOnChanges() {
        this.changeRef.detectChanges()
    }

}
