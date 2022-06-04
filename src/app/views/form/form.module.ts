import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComponent,
    NameEditorComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    NameEditorComponent,
  ]
})
export class FormModule { }
