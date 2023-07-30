import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { UserTypeEnum } from './enum/userTypeEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userType!: UserTypeEnum;

  userTypeEnum = UserTypeEnum;

  constructor(private _userService: UserService) {
    this.userType = _userService.userType;
  }
}
