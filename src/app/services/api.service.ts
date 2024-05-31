import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AllRecipesGQL, AllRecipesQuery, CreateRecipeGQL, RecipeGQL, RecipeQuery } from 'graphql/generated';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allRecipesGQL = inject(AllRecipesGQL);
  private readonly _recipeGQL = inject(RecipeGQL);
  private readonly _createRecipeGQL = inject(CreateRecipeGQL);

  getAllRecipes(): Observable<AllRecipesQuery['recipes']> {
    return this._allRecipesGQL.watch().valueChanges.pipe(
      map(({ data }) => data.recipes)
    );
  }

  getRecipe(id: string): Observable<RecipeQuery['recipe']> {
    return this._recipeGQL.watch({ id }).valueChanges.pipe(
      map(({ data }) => data.recipe)
    );
  }

  addRecipe(recipeInputData: { name: string; description: string }) {
    return this._createRecipeGQL.mutate({ recipeData: recipeInputData }).pipe(
      tap(({ data }) => console.log(data)),
      map(({ data }) => data?.createRecipe),
    )
  }
}
