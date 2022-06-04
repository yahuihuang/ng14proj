import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';


@NgModule({
  declarations: [
    FormComponent,
    NameEditorComponent,
    FormInputComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NameEditorComponent,
  ]
})
export class FormModule { }
