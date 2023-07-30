import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MessageService } from 'src/app/abstract/message.service';
import { Category } from 'src/app/model/category';
import { SendRun } from 'src/app/model/send-run';
import { CategoryService } from 'src/app/services/category.service';
import { SendRunService } from 'src/app/services/send-run.service';

@Component({
  selector: 'app-send-run',
  templateUrl: './send-run.component.html',
  styleUrls: ['./send-run.component.scss']
})
export class SendRunComponent {

  public categories!: Category[];

  form = new FormGroup({
    videoUrl: new FormControl(null, Validators.required),
    kills: new FormControl(null, [Validators.required, Validators.min(0)]),
    years: new FormControl(null, [Validators.required, Validators.min(0)]),
    months: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(12)]),
    days: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(31)]),
    categoryId: new FormControl(null, Validators.required)
  })

  constructor(private _sendRunService: SendRunService, private _categoryService: CategoryService, private _router: Router, private _messageService: MessageService) {
    this._categoryService.getAllCategories().pipe(take(1)).subscribe({
      next: d => {
        this.categories = d;
      }
    })
  }

  getErrorMessage(controlName: string) {
    if (!this.form.get(controlName)?.touched) return;

    if (this.form.get(controlName)?.hasError('min')) {
      return 'Valor minimo é ' + this.form.get(controlName)?.getError('min')?.min;
    }

    if (this.form.get(controlName)?.hasError('max')) {
      return 'Valor maximo é ' + this.form.get(controlName)?.getError('max')?.max;
    }

    return this.form.get(controlName)?.hasError('required') ? 'Campo obrigatório*' : '';
  }

  sendRun(): void {
    if (!this.form.valid) return;

    let runRequest = new SendRun();
    runRequest.kills = this.form.get('kills')?.value!;
    runRequest.years = this.form.get('years')?.value!;
    runRequest.months = this.form.get('months')?.value!;
    runRequest.days = this.form.get('days')?.value!;
    runRequest.videoUrl = this.form.get('videoUrl')?.value!;
    runRequest.categoryId = this.form.get('categoryId')?.value!;

    this._sendRunService.sendRun(runRequest).pipe(take(1)).subscribe({
      next: d => {
        this._messageService.successMessage('Corrida enviada!')
        this._router.navigate(['home'])
      },
      error: err => {
        this._messageService.errorMessage('Você já possui uma corrida pendente nesta categoria.')
      }
    })
  }

}
