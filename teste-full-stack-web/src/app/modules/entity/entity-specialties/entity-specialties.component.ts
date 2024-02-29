import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-specialties',
    templateUrl: './entity-specialties.component.html',
    standalone: true,
    styles: [
        `.mat-icon {
            vertical-align: middle;
        }`
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatIconModule
    ]
})
export class EntitySpecialtiesComponent {
    @Input() specialties!: any;

    constructor() { }
}
