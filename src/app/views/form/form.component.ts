import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/model/question-base';
import { QuestionService } from 'src/app/shared/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    console.log(service.getQuestions())
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {
  }

}
