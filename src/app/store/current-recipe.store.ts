import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { IngredientInput, Recipe, StepInput } from 'graphql/generated';

type CurrentRecipeState = {
  recipe: Recipe | null;
  isLoading: boolean;
  isEditMode: boolean;
};

const initialState: CurrentRecipeState = {
  recipe: null,
  isLoading: false,
  isEditMode: false
};

export const CurrentRecipeStore = signalStore(
  withState<CurrentRecipeState>(initialState),
  withMethods((store, recipesService = inject(RecipesService)) => ({
    loadRecipe: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return recipesService.getRecipeById(id).pipe(
            tapResponse({
              // todo: remove as Recipe when backend will be fixed
              next: (recipe) => patchState(store, { recipe: recipe as Recipe }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    addStep: rxMethod<StepInput>(
      switchMap((step) => {
        patchState(store, { isLoading: true });
        return recipesService.addStep(store.recipe()?.id as string, step).pipe(
          tapResponse({
            // todo: remove as Recipe when backend will be fixed
            next: (recipe) => patchState(store, { recipe: recipe as Recipe }),
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      })
    ),
    addIngredient: rxMethod<IngredientInput>(
      switchMap((ingredient) => {
        patchState(store, { isLoading: true });
        return recipesService.addIngredient(store.recipe()?.id as string, ingredient).pipe(
          tapResponse({
            // todo: remove as Recipe when backend will be fixed
            next: (recipe) => patchState(store, { recipe: recipe as Recipe }),
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      })
    ),
    toggleEditMode: () => patchState(store, { isEditMode: !store.isEditMode() }),
  }))
);
