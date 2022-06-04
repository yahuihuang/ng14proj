import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    console.log(forbidden)
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      // 自訂驗證指令是用 useExisting 而不是 useClass 來實例化的。
      // 註冊的驗證程式必須是 ForbiddenValidatorDirective 實例本身 -
      // 表單中的實例，也就是表單中 forbiddenName 屬性被繫結到了"bob"的那個
      useExisting: ForbiddenValidatorDirective,
      multi: true
    }
  ],
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.forbiddenName
              ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
              : null;
  }

}
