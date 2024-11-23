import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Recipe } from 'graphql/generated';

@Component({
    selector: 'app-recipe-item',
    imports: [
        RouterLink,
        MatIconButton,
        MatIcon
    ],
    templateUrl: './recipe-item.component.html',
    styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Output() recipeForDeleteId = new EventEmitter<string>();
  recipe = input.required<Recipe>();
  recipeLink = computed<string>(() => `/recipe/${ this.recipe().id }`);

  openDeleteRecipeModal() {
    this.recipeForDeleteId.emit(this.recipe().id);
  }
}
