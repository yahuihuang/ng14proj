import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { QuestionService } from 'src/app/shared/question.service';
@NgModule({
  declarations: [
    FormComponent,
    NameEditorComponent,
    FormInputComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NameEditorComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
  ],
  providers: [
    {provide: QuestionService }
  ]
})
export class FormModule { }
