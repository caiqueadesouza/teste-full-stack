import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { BasePagination } from 'app/_models/base-pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { Regional } from 'app/_models/regional.model';

@Injectable({
    providedIn: 'root'
})
export class RegionalService extends BaseService<Regional, BasePagination<Regional>> {

    constructor(
        snackBar: MatSnackBar,
        http: HttpClient,
        dialog: MatDialog
    ) {
        super(snackBar, http, dialog);
    }

    override baseUrl = `${environment.apiUrl}/regionais`
}
