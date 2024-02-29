import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPageComponent } from 'app/shared/componentes/header-page/header-page.component';
import { Entity } from 'app/_models/entity.model';
import { EntityService } from 'app/_services/entity.services';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { cnpjValidator } from 'app/_helpers/validate-cnpj';
import { AlertaComponent } from 'app/shared/componentes/alerta/alerta.component';
import { Specialty } from 'app/_models/specialty.model';
import { SpecialtyService } from 'app/_services/specialty.services';
import { RegionalService } from 'app/_services/regional.services';
import { Regional } from 'app/_models/regional.model';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin, finalize } from 'rxjs';
import { specialtiesValidator } from 'app/_helpers/validare-specialtis';

@Component({
    selector: 'entity-create',
    standalone: true,
    templateUrl: './entity-create.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        DatePipe
    ],
    imports: [
        HeaderPageComponent,
        MatButtonModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        NgIf,
        NgFor,
        AlertaComponent,
        MatSelectModule,
        NgClass
    ]
})
export class EntityCreateComponent {
    @ViewChild('ngForm') ngForm: NgForm;

    alert: { type: string; message: string } = { type: '', message: '' };

    form!: FormGroup;
    showAlert: boolean = false;

    entity!: Entity;
    specialtiesList: Specialty[];
    regioes: Regional[];

    toppings = new FormControl('');

    constructor(
        private entityService: EntityService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private datePipe: DatePipe,
        private specialtyService: SpecialtyService,
        private regionalService: RegionalService
    ) { }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            corporate_reason: [''],
            fantasy_name: [''],
            cnpj: [''],
            regionalId: [''],
            specialties: [''],
            opening_date: [''],
            active: ['']
        });

        this.loadData();
    }

    onSubmit(): void {

        const fields = ['corporate_reason', 'fantasy_name', 'cnpj', 'regionalId', 'opening_date', 'specialties'];

        fields.forEach(field => {
            this.form.get(field).setValidators(Validators.required);
            this.form.get(field).updateValueAndValidity();
        });

        this.form.get('cnpj').setValidators(cnpjValidator());
        this.form.get('cnpj').updateValueAndValidity();

        this.form.get('specialties').setValidators(specialtiesValidator());
        this.form.get('specialties').updateValueAndValidity();

        if (this.form.invalid) {
            this.showAlertMessage('error', 'Dados incorretos. Por favor, revise seus dados e tente novamente');
            return;
        }

        this.showAlert = false;

        const openingDate = this.form.get('opening_date').value;
        const formattedDate = this.datePipe.transform(openingDate, 'yyyy-MM-dd HH:mm:ss');
        this.form.get('opening_date').setValue(formattedDate);


        this.entityService.create(this.form.value).subscribe(
            (res) => {
                this.entityService.showMessage('Entidade criada com sucesso!');
                this._router.navigateByUrl(`/entidades/${res.id}`);
            },
            (error) => {
                this.showAlertMessage('error', 'Erro ao criar a entidade. Por favor, tente novamente.');
            }
        );

    }

    showAlertMessage(type: string, message: string): void {
        this.alert = { type, message };
        this.showAlert = true;
    }

    loadData(): void {
        this.form.disable();

        forkJoin([
            this.specialtyService.read(),
            this.regionalService.read()
        ]).pipe(finalize(() => {
            this.form.enable();
        })).subscribe(
            ([specialties, regions]) => {
                this.specialtiesList = specialties;
                this.regioes = regions;
            },
        );
    }

    getSelectedSpecialtiesNames(): string {
        const selectedSpecialties = this.form.get('specialties').value;
        if (selectedSpecialties && selectedSpecialties.length > 0) {
            const firstSpecialty = selectedSpecialties[0].name;
            const additionalCount = selectedSpecialties.length - 1;

            return additionalCount > 0
                ? `${firstSpecialty} (+${additionalCount} ${additionalCount > 1 ? 'especialidades' : 'especialidade'})`
                : firstSpecialty;
        }
        return '';
    }

}
