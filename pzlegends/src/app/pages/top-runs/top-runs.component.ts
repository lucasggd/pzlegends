import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { TopRunsService } from 'src/app/services/top-runs.service';

@Component({
  selector: 'app-top-runs',
  templateUrl: './top-runs.component.html',
  styleUrls: ['./top-runs.component.scss']
})
export class TopRunsComponent {

  private _id!: number;

  public top3Players: any[] = []

  public topPlayers: any[] = []

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _topRunsService: TopRunsService) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._id = params['id'];
      this.getRuns()
    })
  }

  getRuns(): void {
    this.top3Players = [];
    this.topPlayers = [];

    this._topRunsService.getTopRuns(this._id).pipe(take(1)).subscribe({
      next: (data) => {
        let i = 0;

        for (let i = 0; i < data.length; i++) {
          this.top3Players.push(data[i])
          if (i === 2)
            break
        }

        this.topPlayers = data.slice(3);
      }
    })
  }

  selectRun(id: number) {
    this._router.navigateByUrl('/run/' + id);
  }

}
