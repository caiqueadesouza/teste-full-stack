import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header-page',
    templateUrl: './header-page.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatIconModule
    ]
})
export class HeaderPageComponent {
    @Input() title!: string;
    
    constructor() { }
}
