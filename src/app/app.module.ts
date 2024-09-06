import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideToastr } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsListComponent } from './components/ingredients/ingredients-list/ingredients-list.component';
import { IngredientsNewComponent } from './components/ingredients/ingredients-new/ingredients-new.component';
import { IngredientsEditComponent } from './components/ingredients/ingredients-edit/ingredients-edit.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientsFormComponent } from './components/ingredients/ingredients-form/ingredients-form.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipesNewComponent } from './components/recipes/recipes-new/recipes-new.component';
import { RecipesEditComponent } from './components/recipes/recipes-edit/recipes-edit.component';
import { RecipesFormComponent } from './components/recipes/recipes-form/recipes-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipesShowComponent } from './components/recipes/recipes-show/recipes-show.component';
import { IngredientsCartComponent } from './components/ingredients/ingredients-cart/ingredients-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsListComponent,
    IngredientsNewComponent,
    IngredientsEditComponent,
    ModalComponent,
    IngredientsFormComponent,
    NavbarComponent,
    RecipesListComponent,
    RecipesNewComponent,
    RecipesEditComponent,
    RecipesFormComponent,
    RecipesShowComponent,
    IngredientsCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
