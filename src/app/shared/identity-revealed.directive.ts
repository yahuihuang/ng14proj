import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
/** 這個 identity 驗證器實現了 ValidatorFn 介面。它接收一個 Angular 表單控制元件物件作為引數，
 *  當表單有效時，它返回一個 null，否則返回 ValidationErrors 物件。 */
export const identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // 驗證器透過呼叫 FormGroup 的 get 方法來檢索這些子控制元件，然後比較 name 和 alterEgo 控制元件的值。
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');

  return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
};

@Directive({
  selector: '[appIdentityRevealed]',
  providers: [
    {
      // 對於範本驅動表單，你必須建立一個指令來包裝驗證器函式。你可以使用NG_VALIDATORS 令牌來把該指令提供為驗證器
      provide: NG_VALIDATORS,
      useExisting: IdentityRevealedValidatorDirective,
      multi: true }
    ]
})
export class IdentityRevealedValidatorDirective implements Validator {
  // validate() 函式必須返回一個 Promise 或可觀察物件，
  // 返回的可觀察物件必須是有盡的，這意味著它必須在某個時刻完成（complete）。
  //   要把無盡的可觀察物件轉換成有盡的，可以在管道中加入過濾運算子，
  //   比如 first、last、take 或 takeUntil。
  validate(control: AbstractControl): ValidationErrors | null {
    return identityRevealedValidator(control);
  }
}
