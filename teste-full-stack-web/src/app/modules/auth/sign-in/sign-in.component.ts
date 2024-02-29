import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { AlertaComponent } from 'app/shared/componentes/alerta/alerta.component';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        AlertaComponent
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: string; message: string } = { type: '', message: '' };

    signInForm!: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: [''],
            password: ['']
        });
    }

    onSubmit(): void {

        this.signInForm.get('email').setValidators([Validators.required, Validators.email]);
        this.signInForm.get('password').setValidators(Validators.required);

        this.signInForm.get('email').updateValueAndValidity();
        this.signInForm.get('password').updateValueAndValidity();

        if (this.signInForm.invalid) {
            this.showAlertMessage('error', 'Dados incorretos. Por favor, revise seus dados e tente novamente');
            return;
        }

        this.showAlert = false;

        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                    this._router.navigateByUrl(redirectURL);
                },
                (response) => {
                    this.signInForm.enable();
                    this.signInNgForm.resetForm();
                    this.showAlertMessage('error', 'Senha ou usuário incorretos, revise suas credenciais!');
                },
            );
    }

    showAlertMessage(type: string, message: string): void {
        this.alert = { type, message };
        this.showAlert = true;
    }

    togglePasswordFieldVisibility(passwordField: any): void {
        passwordField.type = (passwordField.type === 'password') ? 'text' : 'password';
    }
}
