import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-alerta',
    templateUrl: './alerta.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatIconModule
    ]
})
export class AlertaComponent {
    @Input() alert!: string;

    constructor() { }
}
