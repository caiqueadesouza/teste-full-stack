import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialtiesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const specialties = control.value;
        if (!specialties || specialties.length < 5) {
            return { 'requiredSpecialties': true };
        }
        return null;
    };
}
