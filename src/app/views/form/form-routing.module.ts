import { FormInputComponent } from './form-input/form-input.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'nameEditor',
    component: NameEditorComponent
  },
  {
    path: 'formInput',
    component: FormInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
