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

  private _selectedId!: number;

  constructor(private _route: ActivatedRoute, private _dialog: MatDialog) {

  }

  ngOnInit() {
    /* this._route.paramMap.pipe(
      switchMap(params => {
        this._selectedId = Number(params.get('id'));
      })
    ); */
  }

  openDialog() {
    this._dialog.open(ReportDialogComponent, {
      width: '70rem',
      height: 'auto',
      panelClass: 'custom-modalbox'
    });
  }

}
