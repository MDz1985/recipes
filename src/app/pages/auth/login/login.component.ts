import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormErrorsPipe } from 'src/app/pipes/form-errors.pipe';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AppStore } from 'src/app/store/app.store';

@Component({
    selector: 'app-login',
    imports: [
        MatButton,
        RouterLink,
        FormErrorsPipe,
        FormsModule,
        KeyValuePipe,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _appStore = inject(AppStore);
  private readonly _fb = inject(FormBuilder);
  protected readonly signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }, { updateOn: 'blur' });
  protected readonly formControls = this.signInForm.controls;
  readonly passwordHide = signal(true);

  onHideClick(e: MouseEvent) {
    this.passwordHide.set(!this.passwordHide());
    e.stopPropagation();
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.signInForm.invalid || !this.signInForm.value.email || !this.signInForm.value.password) return;
    this._appStore.login(this.signInForm.value.email, this.signInForm.value.password);
  }
}
