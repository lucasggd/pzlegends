import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { RunRequestService } from 'src/app/admin/services/run-request.service';

@Component({
  selector: 'app-run-request-by-id',
  templateUrl: './run-request-by-id.component.html',
  styleUrls: ['./run-request-by-id.component.scss']
})
export class RunRequestByIdComponent {

  private _id!: number;

  public request: any;

  constructor(private _runRequestService: RunRequestService, private _activatedRoute: ActivatedRoute, private _router: Router) {
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

  approve(): void {
    //approve logic
    this._router.navigate(['admin/run-request'])
  }

  refuse(): void {
    //refuse logic
    this._router.navigate(['admin/run-request'])
  }

}
