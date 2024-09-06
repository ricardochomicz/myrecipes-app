import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent {

  recipeId?: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';
  }
}
