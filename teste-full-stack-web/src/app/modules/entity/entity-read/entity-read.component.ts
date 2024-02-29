import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderPageComponent } from 'app/shared/componentes/header-page/header-page.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BasePagination } from 'app/_models/base-pagination.model';
import { Entity } from 'app/_models/entity.model';
import { EntityService } from 'app/_services/entity.services';
import {
    debounceTime,
    map,
    distinctUntilChanged,
    filter,
    switchMap,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from 'app/shared/componentes/status/status.component';
import { EntitySpecialtiesComponent } from '../entity-specialties/entity-specialties.component';


@Component({
    selector: 'entity-read',
    standalone: true,
    templateUrl: './entity-read.component.html',
    styleUrls: ['./entity-read.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        HeaderPageComponent,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        RouterLink,
        NgIf,
        NgFor,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        StatusComponent,
        EntitySpecialtiesComponent
    ]
})
export class EntityReadComponent {
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    displayedColumns: string[] = ['fantasy_name', 'regional', 'specialties', 'active', 'actions'];

    entities!: BasePagination<Entity>;
    pageEvent!: PageEvent;
    pageIndex: number = 0;
    filter: string = '';

    buttonClear: boolean = false;
    orderBy: string = '';
    order: 'ASC' | 'DESC' = 'ASC';

    constructor(private entityService: EntityService) { }

    ngOnInit(): void {
        this.carregarDados(this.filter);
        this.searchFilter();
    }

    searchFilter() {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                map((event: Event) => (event.target as HTMLInputElement).value),
                filter((res) => res.length > 2 || res.length === 0),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap((text: string) =>
                    this.entityService.readPaginationSearch(
                        this.pageIndex + 1,
                        text,
                        this.orderBy,
                        this.order
                    )
                )
            )
            .subscribe((entities) => {
                this.entities = entities;
                this.buttonClear = true;
            });
    }

    pageNavigations(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.carregarDados(this.filter);
    }

    carregarDados(searchFilter: string) {
        this.entityService
            .readPaginationSearch(this.pageIndex + 1, searchFilter, this.orderBy, this.order)
            .subscribe((entities) => {
                this.entities = entities;
            });
    }

    clean(): void {
        this.searchInput.nativeElement.value = '';
        this.carregarDados(this.filter);
    }

    shouldShowCloseButton(): boolean {
        return this.buttonClear && this.entities?.itens.length > 0 && this.searchInput.nativeElement.value;
    }

    sortColumn(column: string) {
        if (this.orderBy === column) {
            this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
        } else {
            this.orderBy = column;
            this.order = 'ASC';
        }

        this.carregarDados(this.filter);
    }
}
