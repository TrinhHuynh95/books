import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const correct = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(control.value);
    return correct ? null : {password: {value: control.value}};
  };
}
