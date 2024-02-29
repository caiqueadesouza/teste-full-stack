import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function isCnpjValid(cnpj: string): boolean {
    const onlyNumbers = /^[0-9]*$/;
    return cnpj && cnpj.length === 14 && onlyNumbers.test(cnpj);
}

export function cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const cnpj = control.value;
        if (!cnpj) {
            return null;
        }

        const isValid = isCnpjValid(cnpj);
        return isValid ? null : { 'invalidCnpj': true };
    };
}
