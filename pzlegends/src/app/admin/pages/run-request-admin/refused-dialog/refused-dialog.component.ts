import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { RunRequestService } from 'src/app/admin/services/run-request.service';
import { ReportDialogComponent } from 'src/app/pages/top-runs-by-id/report-dialog/report-dialog.component';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-refused-dialog',
  templateUrl: './refused-dialog.component.html',
  styleUrls: ['./refused-dialog.component.scss']
})
export class RefusedDialogComponent {

  form = new FormGroup({
    message: new FormControl(null, Validators.required)
  })

  constructor(
    private _runRequestService: RunRequestService,
    private _reportService: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    private _router: Router
  ) {

  }

  send(): void {
    if (!this.form.valid) return;

    this._runRequestService.response(this.data?.id!, false, this.form.get('message')?.value!).pipe(take(1)).subscribe({
      next: d => {
        this.dialogRef.close();
        this._router.navigate(['admin/run-request'])
      }
    })

  }

}
