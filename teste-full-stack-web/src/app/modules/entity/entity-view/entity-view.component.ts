import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPageComponent } from 'app/shared/componentes/header-page/header-page.component';
import { Entity } from 'app/_models/entity.model';
import { EntityService } from 'app/_services/entity.services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusComponent } from 'app/shared/componentes/status/status.component';
import { EntitySpecialtiesComponent } from '../entity-specialties/entity-specialties.component';
import { finalize } from 'rxjs';


@Component({
    selector: 'entity-view',
    standalone: true,
    templateUrl: './entity-view.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [HeaderPageComponent, MatButtonModule, RouterLink, CommonModule, StatusComponent, EntitySpecialtiesComponent]
})
export class EntityViewComponent {

    entity!: Entity;
    isLoading: boolean = true;

    constructor(
        private entityService: EntityService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.entity = new Entity();
        const paramId: string = this.route.snapshot.paramMap.get('id') ?? ''; ''
        this.entityService
            .readById(paramId)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((response) => {
                this.entity = response;
            });
    }

}
