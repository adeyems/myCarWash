/** A hero's name can't match the given regular expression */
import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}

export function PasswordValidator(confirmPasswordInput: string) {
    let confirmPasswordControl: FormControl;
    let passwordControl: FormControl;

    return (control: FormControl) => {
        if (!control.parent) {
            return null;
        }

        if (!confirmPasswordControl) {
            confirmPasswordControl = control;
            passwordControl = control.parent.get(confirmPasswordInput) as FormControl;
            passwordControl.valueChanges.subscribe(() => {
                confirmPasswordControl.updateValueAndValidity();
            });
        }

        if (
            passwordControl.value !==
            confirmPasswordControl.value
        ) {
            return {
                notMatch: true
            };
        }
        return null;
    };
}

export function phoneValidator(phone: string) {
}
