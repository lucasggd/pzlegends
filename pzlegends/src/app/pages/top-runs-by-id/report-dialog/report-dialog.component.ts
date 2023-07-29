import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {

  form = new FormGroup({
    message: new FormControl(null, Validators.required)
  })

  constructor(private _reportService: ReportService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ReportDialogComponent>) {

  }

  send(): void {
    if (!this.form.valid) return;

    this._reportService.reportRun(this.form.get('message')?.value!, this.data?.runId!).pipe(take(1)).subscribe({
      next: d => {
        this.dialogRef.close();
      }
    })
  }
}
