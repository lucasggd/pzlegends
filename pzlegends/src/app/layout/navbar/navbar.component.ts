import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public authenticated: boolean = false;

  public user!: User;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.authenticated = this._userService.isAuthenticated();
    if (this.authenticated) {
      this.user = this._userService.user;
    }
  }

  logout(): void {
    this._userService.logout();
  }

}
