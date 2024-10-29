import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeItemComponent } from 'src/app/pages/recipes-list/components/recipe-item/recipe-item.component';
import { AsyncPipe } from '@angular/common';
import { RecipesStore } from 'src/app/store/recipes-store';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { AddRecipeModalComponent } from 'src/app/components/modals/add-recipe-modal/add-recipe-modal.component';
import { EnquiryModalComponent } from 'src/app/components/modals/enquiry-modal/enquiry-modal.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    AsyncPipe,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatProgressSpinner,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  providers: [RecipesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {
  private readonly _store = inject(RecipesStore);
  private readonly _appStore = inject(AppStore);
  private readonly _dialog = inject(MatDialog);
  readonly recipes = this._store.recipes;
  readonly isLoading = this._store.isLoading;
  readonly isLoggedIn = this._appStore.isLoggedIn;

  findRecipe(value: string) {
    this._store.updateQuery(value);
  }

  addRecipe() {
    this._dialog.open(AddRecipeModalComponent).afterClosed()
      .pipe(filter(arg => !!arg))
      .subscribe((recipeInputData: { name: string, description: string }) => {
        this._store.addRecipe(recipeInputData);
      });
  }

  removeRecipe(id: string) {
    const title = 'Delete Recipe';
    const content = 'Are you sure you want to delete this recipe?';
    this._dialog.open(EnquiryModalComponent, { data: { title, content } }).beforeClosed()
      .pipe(filter(arg => !!arg))
      .subscribe(() => {
        this._store.removeRecipe(id);
      });
  }
}
