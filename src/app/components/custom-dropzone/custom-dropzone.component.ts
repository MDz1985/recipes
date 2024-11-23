import { Component } from '@angular/core';
import { DropzoneComponent } from '@ngx-dropzone/cdk';

@Component({
    selector: 'app-custom-dropzone',
    imports: [],
    templateUrl: './custom-dropzone.component.html',
    styleUrl: './custom-dropzone.component.scss'
})
export class CustomDropzoneComponent extends DropzoneComponent {}
