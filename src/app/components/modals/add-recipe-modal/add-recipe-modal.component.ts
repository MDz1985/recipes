import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-add-recipe-modal',
    imports: [
        CdkTextareaAutosize,
        DropzoneCdkModule,
        DropzoneMaterialModule,
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: './add-recipe-modal.component.html',
    styleUrl: './add-recipe-modal.component.scss'
})
export class AddRecipeModalComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly form: FormGroup = this.initForm();
  private _dialogRef: MatDialogRef<AddRecipeModalComponent> = inject(MatDialogRef);
  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this._dialogRef.close(this.form.value);
    }
  }

  private initForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
