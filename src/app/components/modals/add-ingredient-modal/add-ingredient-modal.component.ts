import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-add-ingredient-modal',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        MatButton,
        MatDialogClose,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInput,
    ],
    templateUrl: './add-ingredient-modal.component.html',
    styleUrl: './add-ingredient-modal.component.scss'
})
export class AddIngredientModalComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly form: FormGroup = this.initForm();
  private _dialogRef: MatDialogRef<AddIngredientModalComponent> = inject(MatDialogRef);

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._dialogRef.close(this.form.value);
    }
  }

  private initForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      count: ['', [Validators.required, Validators.min(0)]],
      measure: ['', [Validators.required]]
    });
  }
}
