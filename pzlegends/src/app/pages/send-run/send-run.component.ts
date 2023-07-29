import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SendRun } from 'src/app/model/send-run';
import { SendRunService } from 'src/app/services/send-run.service';

@Component({
  selector: 'app-send-run',
  templateUrl: './send-run.component.html',
  styleUrls: ['./send-run.component.scss']
})
export class SendRunComponent {

  form = new FormGroup({
    videoUrl: new FormControl(null, Validators.required),
    kills: new FormControl(null, Validators.required),
    years: new FormControl(null, Validators.required),
    months: new FormControl(null, Validators.required),
    days: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required)
  })

  constructor(private _sendRunService: SendRunService, private _router: Router) { }

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
        console.log('success')
        this._router.navigate(['home'])
      }
    })
  }

}
