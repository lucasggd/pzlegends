import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { MessageService } from 'src/app/abstract/message.service';
import { RunRequestService } from 'src/app/admin/services/run-request.service';
import { RefusedDialogComponent } from '../refused-dialog/refused-dialog.component';

@Component({
  selector: 'app-run-request-by-id',
  templateUrl: './run-request-by-id.component.html',
  styleUrls: ['./run-request-by-id.component.scss']
})
export class RunRequestByIdComponent {

  private _id!: number;

  public request: any;

  constructor(
    private _runRequestService: RunRequestService,
    private _messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._id = params['id'];
      this.getRequest()
    })
  }

  getRequest(): void {
    this._runRequestService.getById(this._id).pipe(take(1)).subscribe({
      next: d => {
        this.request = d;
      }
    })
  }

  response(bool: boolean): void {
    if (!bool) {
      this.openDialog();
      return;
    }

    this._runRequestService.response(this._id, bool).pipe(take(1)).subscribe({
      next: d => {
        this._router.navigate(['admin/run-request'])
      },
      error: err => {
        this._messageService.errorMessage(err.error.message);
      }
    })
  }

  openDialog() {
    this._dialog.open(RefusedDialogComponent, {
      width: '70rem',
      height: 'auto',
      panelClass: 'custom-modalbox',
      data: { id: this._id }
    });
  }

}
