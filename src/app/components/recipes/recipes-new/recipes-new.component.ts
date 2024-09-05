import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes-new',
  templateUrl: './recipes-new.component.html',
  styleUrls: ['./recipes-new.component.css']
})
export class RecipesNewComponent {

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descriptions: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    method: new FormControl('', Validators.required),
  });


  submit() { }

}
