import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatCard, MatCardContent, } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { FormErrorsPipe } from 'src/app/pipes/form-errors.pipe';
import { AppStore } from 'src/app/store/app.store';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signup',
    imports: [
        MatCard,
        MatButton,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix,
        MatError,
        ReactiveFormsModule,
        KeyValuePipe,
        FormErrorsPipe,
        MatIcon,
        MatIconButton,
        RouterLink
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly _appStore = inject(AppStore);
  private readonly _fb = inject(FormBuilder);
  protected readonly signupForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, this.passwordMatchValidator]]
  }, { updateOn: 'blur' });
  protected readonly formControls = this.signupForm.controls;
  protected readonly passwordHide = new Map<string, WritableSignal<boolean>>([
    ['password', signal(true)],
    ['passwordConfirm', signal(true)]
  ]);

  onHideClick(e: MouseEvent, controlName: string) {
    e.stopPropagation();
    const isHiddenSignal = this.passwordHide.get(controlName);
    if (isHiddenSignal) {
      isHiddenSignal.set(!isHiddenSignal());
    }
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.signupForm.invalid || !this.signupForm.value.email || !this.signupForm.value.password) return;
    void this._appStore.signUp(this.signupForm.value.email, this.signupForm.value.password);
  }

  private passwordMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = control.parent?.get('password')?.value;
    const passwordConfirm = control.value;
    return password === passwordConfirm ? null : { 'passwordMismatch': true };
  }
}
