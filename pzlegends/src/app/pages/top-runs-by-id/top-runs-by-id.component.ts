import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TopRunsService } from 'src/app/services/top-runs.service';
import { take } from 'rxjs';
import { Run } from 'src/app/model/run';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-runs-by-id',
  templateUrl: './top-runs-by-id.component.html',
  styleUrls: ['./top-runs-by-id.component.scss']
})
export class TopRunsByIdComponent {

  private _id!: number;

  public run!: Run;

  constructor(private _topRunsService: TopRunsService, private _activatedRoute: ActivatedRoute, private _dialog: MatDialog, private _userService: UserService, private _router: Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._id = params['id'];
      this.getRun()
    })
  }

  getRun(): void {
    this.run = new Run();

    this._topRunsService.getRun(this._id).pipe(take(1)).subscribe({
      next: d => {
        this.run = d;
      }
    })
  }

  openDialog() {

    if (!this._userService.isAuthenticated()) {
      this._router.navigate(['login']);
      return;
    }

    this._dialog.open(ReportDialogComponent, {
      width: '70rem',
      height: 'auto',
      panelClass: 'custom-modalbox',
      data: { runId: this._id }
    });
  }

}
