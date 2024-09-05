import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsListComponent } from './components/ingredients/ingredients-list/ingredients-list.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipesNewComponent } from './components/recipes/recipes-new/recipes-new.component';
import { RecipesEditComponent } from './components/recipes/recipes-edit/recipes-edit.component';

const routes: Routes = [
  {
    path: 'ingredients',
    component: IngredientsListComponent
  },
  {
    path: 'recipes',
    component: RecipesListComponent
  },
  {
    path: 'recipe-new',
    component: RecipesNewComponent
  },
  {
    path: 'recipe-edit/:id',
    component: RecipesEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
