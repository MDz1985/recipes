import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-enquiry-modal',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './enquiry-modal.component.html',
    styleUrl: './enquiry-modal.component.scss'
})
export class EnquiryModalComponent {
  private readonly _dialogRef = inject(MatDialogRef<EnquiryModalComponent>);
  readonly data: { title?: string, content?: string } = inject(MAT_DIALOG_DATA);

  onSuggest() {
    this._dialogRef.close(true);
  }

}
