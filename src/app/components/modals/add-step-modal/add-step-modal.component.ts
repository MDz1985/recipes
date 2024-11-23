import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { MatIconModule } from '@angular/material/icon';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'app-add-step-modal',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        MatButton,
        MatDialogClose,
        MatFormFieldModule,
        DropzoneCdkModule,
        DropzoneMaterialModule,
        MatIconModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatInput,
        CdkTextareaAutosize
    ],
    templateUrl: './add-step-modal.component.html',
    styleUrl: './add-step-modal.component.scss'
})
export class AddStepModalComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly form: FormGroup = this.initForm();
  private _dialogRef: MatDialogRef<AddStepModalComponent> = inject(MatDialogRef);

  clearImage(): void {
    this.form.get('image')?.setValue(null);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this._dialogRef.close(this.form.value);
    }
  }

  private initForm(): FormGroup {
    return this._fb.group({
      image: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
