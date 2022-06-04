import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UniqueAlterEgoValidator } from 'src/app/shared/alter-ego.directive';
import { forbiddenNameValidator } from 'src/app/shared/forbidden-name.directive';
import { identityRevealedValidator } from 'src/app/shared/identity-revealed.directive';

@Component({
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  heroForm!: FormGroup;

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
  hero = {
    name: 'Dr.bob',
    alterEgo: 'Dr. What',
     power:
     this.powers[0]
  };

  constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i)
      ]),
      alterEgo: new FormControl(this.hero.alterEgo, {
        asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],
        updateOn: 'blur'
      }),
      power: new FormControl(this.hero.power, Validators.required)
    },
    {
      // 要想給 FormGroup 新增驗證器，就要在建立時把一個新的驗證器傳給它的第二個引數。
      validators: identityRevealedValidator
    }); // <-- add custom validator at the FormGroup level
  }

  get name() {
    return this.heroForm?.get('name');
  }

  get power() {
    return this.heroForm?.get('power');
  }

  get alterEgo() {
    return this.heroForm.get('alterEgo')!;
  }
}
