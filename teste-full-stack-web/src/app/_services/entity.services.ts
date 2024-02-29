import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { BasePagination } from 'app/_models/base-pagination.model';
import { Entity } from 'app/_models/entity.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class EntityService extends BaseService<Entity, BasePagination<Entity>> {

    constructor(
        snackBar: MatSnackBar,
        http: HttpClient,
        dialog: MatDialog
    ) {
        super(snackBar, http, dialog);
    }

    override baseUrl = `${environment.apiUrl}/entity`
}
