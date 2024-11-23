import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddStepModalComponent } from 'src/app/components/modals/add-step-modal/add-step-modal.component';
import { filter } from 'rxjs';
import { CurrentRecipeStore } from 'src/app/store/current-recipe.store';
import { IngredientInput, Recipe, StepInput } from 'graphql/generated';
import { AddIngredientModalComponent } from 'src/app/components/modals/add-ingredient-modal/add-ingredient-modal.component';

@Component({
    selector: 'app-recipe',
    imports: [
        MatButton
    ],
    providers: [CurrentRecipeStore],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  private readonly _store = inject(CurrentRecipeStore);
  private readonly _activatedRoute = inject(ActivatedRoute);
  readonly recipe: Signal<Recipe | null> = this._store.recipe;
  readonly isEditMode: Signal<boolean> = this._store.isEditMode;
  readonly dialog = inject(MatDialog);

  addStep() {
    this.dialog.open(AddStepModalComponent).afterClosed()
      .pipe(filter(arg => !!arg))
      .subscribe((step: StepInput) => {
        this._store.addStep(step);
      });
  }

  addIngredient() {
    this.dialog.open(AddIngredientModalComponent).afterClosed()
      .pipe(filter(arg => !!arg))
      .subscribe((ingredient: IngredientInput) => {
        this._store.addIngredient(ingredient);
      });
  }

  toggleMode() {
    this._store.toggleEditMode();
  }

  ngOnInit(): void {
    this._store.loadRecipe(this._activatedRoute.snapshot.params['id']);
  }
}
