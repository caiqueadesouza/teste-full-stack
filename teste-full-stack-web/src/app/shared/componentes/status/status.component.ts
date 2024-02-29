import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    standalone: true,
    imports: [NgClass],
})
export class StatusComponent {
    @Input() status!: boolean;
    constructor() { }
}
