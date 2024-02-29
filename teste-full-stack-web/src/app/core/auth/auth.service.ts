import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    baseUrl = `${environment.apiUrl}/auth`;

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    signIn(credentials: { email: string; password: string }): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${this.baseUrl}/login`, credentials).pipe(
            switchMap((response: any) => {
                this.accessToken = response.data.accessToken;

                this._authenticated = true;

                this._userService.user = response.data.user;

                return of(response);
            }),
        );
    }

    signInUsingToken(): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}/refresh-token`, {
            refreshToken: this.accessToken,
        }).pipe(
            catchError(() =>
                of(false),
            ),
            switchMap((response: any) => {
                if (response.data.accessToken) {
                    this.accessToken = response.data.accessToken;
                }

                this._authenticated = true;

                this._userService.user = response.data.user;
                return of(true);
            }),
        );
    }

    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }

    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }

        if (!this.accessToken) {
            return of(false);
        }

        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        return this.signInUsingToken();
    }
}
