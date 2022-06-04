import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { HeroesService } from './heroes.service';
import { Observable, of } from 'rxjs';

/** 驗證器類別 UniqueAlterEgoValidator，它實現了 AsyncValidator 介面。
 * 非同步驗證在同步驗證完成後才會發生，並且只有在同步驗證成功時才會執行。
 *   如果更基本的驗證方法已經發現了無效輸入，那麼這種檢查順序就可以讓表單避免使用昂貴的非同步驗證流程
 *   （例如 HTTP 請求）。
 * 非同步驗證開始之後，表單控制元件就會進入 pending 狀態。
 *    你可以檢查控制元件的 pending 屬性，並用它來給出對驗證中的視覺反饋。
 * 一種常見的 UI 模式是在執行非同步驗證時顯示 Spinner（轉輪）。
 */
@Injectable({ providedIn: 'root' })
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private heroesService: HeroesService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    /** 當驗證開始的時候，UniqueAlterEgoValidator 把任務委託給 HeroesService 的 isAlterEgoTaken() 方法，
     *     並傳入當前控制元件的值。
     *  這時候，該控制元件會被標記為 pending 狀態，直到 validate() 方法所返回的可觀察物件完成（complete）了。 */
    return this.heroesService.isAlterEgoTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueAlterEgo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueAlterEgoValidator),
      multi: true
    }
  ]
})
export class UniqueAlterEgoValidatorDirective {
  constructor(private validator: UniqueAlterEgoValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
