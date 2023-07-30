import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { UserTypeEnum } from './enum/userTypeEnum';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userType!: UserTypeEnum;

  userTypeEnum = UserTypeEnum;

  constructor(private _userService: UserService) {
    if (_userService.isTokenExpired()) _userService.user = new User();
    this.userType = _userService.userType;
  }
}
