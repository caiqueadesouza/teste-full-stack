import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'app/shared/componentes/error/error.component';

@Injectable({
    providedIn: 'root'
})
export class BaseService<T, Y> {

    baseUrl = environment.apiUrl;
    errorMessage: string = '';

    constructor(
        protected snackBar: MatSnackBar,
        protected http: HttpClient,
        private dialog: MatDialog
    ) { }

    readPaginationSearch(page: number, filter: string, orderBy: string, order: 'ASC' | 'DESC'): Observable<Y> {
        const url = `${this.baseUrl}?page=${page}&filter=${filter}&orderBy=${orderBy}&order=${order}`;
        return this.http.get<{ data: Y }>(url).pipe(
            map(response => response.data),
            catchError((e: any) => {
                this.errorHandler(e, 'Erro ao Visualizar');
                return EMPTY;
            })
        );
    }

    read(): Observable<T[]> {
        return this.http.get<{ data: T[] }>(`${this.baseUrl}`).pipe(
            map(response => response.data),
            catchError((e: any) => {
                this.errorHandler(e, 'Erro ao Visualizar')
                return EMPTY;
            })
        );
    }

    create(objeto: T): Observable<T> {
        return this.http.post<{ data: T }>(`${this.baseUrl}`, objeto).pipe(
            map(response => response.data),
            catchError((e: any) => {
                this.errorHandler(e, 'Erro ao salvar/editar')
                return EMPTY;
            })
        );
    }

    readById(id: string): Observable<T> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<{ data: T }>(url).pipe(
            map(response => response.data),
            catchError((e: any) => {
                this.errorHandler(e, 'Erro ao Visualizar')
                return EMPTY;
            })
        );
    }

    update(objeto: T, id: number): Observable<T> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<{ data: T }>(url, objeto).pipe(
            map(response => response.data),
            catchError((e: any) => {
                this.errorHandler(e, 'Erro ao Salvar')
                return EMPTY;
            })
        );
    }

    delete(id: number): Observable<T> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<{ data: T }>(url).pipe(
            map(response => response.data),
            catchError((e: any) => {
                this.errorHandler(e, 'Erro ao Deletar')
                return EMPTY;
            })
        );
    }

    showMessage(msg: string): void {
        const panelClass = ['msg-success'];
        this.snackBar.open(msg, 'X', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: panelClass,
        });
    }

    errorHandler(e: any, title: string): Observable<any> {
        this.openErrorDialog(e.error, title);
        return throwError(e);
    }

    openErrorDialog(error: any, title) {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '500px',
            data: {
                title: title,
                error: error
            }
        });
    }
}
