import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ErrorDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public errorData: any) { }
}
