import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top-runs-by-id',
  templateUrl: './top-runs-by-id.component.html',
  styleUrls: ['./top-runs-by-id.component.scss']
})
export class TopRunsByIdComponent {

  private _id!: number;

  constructor(private _activatedRoute: ActivatedRoute, private _dialog: MatDialog) {
    let _id = this._activatedRoute.snapshot.params['id'];

  }

  openDialog() {
    this._dialog.open(ReportDialogComponent, {
      width: '70rem',
      height: 'auto',
      panelClass: 'custom-modalbox'
    });
  }

}
