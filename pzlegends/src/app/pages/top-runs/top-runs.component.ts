import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-runs',
  templateUrl: './top-runs.component.html',
  styleUrls: ['./top-runs.component.scss']
})
export class TopRunsComponent {

  public top3Players = [
    { id: 0, username: 'Lucasggd', years: 4, months: 7, days: 25, kills: 240000 },
    { id: 1, username: 'Lucasggd', years: 4, months: 6, days: 24, kills: 220000 },
    { id: 2, username: 'Lucasggd', years: 4, months: 6, days: 20, kills: 124124 },
  ]

  public topPlayers = [
    { id: 3, username: 'Lucasggd', years: 4, months: 4, days: 2, kills: 5356 },
    { id: 4, username: 'Lucasggd', years: 3, months: 9, days: 11, kills: 204856 },
    { id: 5, username: 'Lucasggd', years: 2, months: 7, days: 25, kills: 67242 },
    { id: 6, username: 'Lucasggd', years: 1, months: 1, days: 1, kills: 252578 },
    { id: 7, username: 'Lucasggd', years: 0, months: 12, days: 15, kills: 2 },
    { id: 8, username: 'Lucasggd', years: 0, months: 0, days: 10, kills: 0 },
  ]

  constructor(private _router: Router) { }

  selectRun(id: number) {
    this._router.navigateByUrl('run/' + id);
  }

}
