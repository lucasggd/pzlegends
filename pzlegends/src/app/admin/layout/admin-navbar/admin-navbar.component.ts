import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Category } from 'src/app/model/category';
import { User } from 'src/app/model/user';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  public authenticated: boolean = false;

  public user!: User;

  public categories: Category[] = [];

  constructor(private _userService: UserService, private _categoryService: CategoryService, private _router: Router) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.authenticated = this._userService.isAuthenticated();
    if (this.authenticated) {
      this.user = this._userService.user;
    }
  }

  logout(): void {
    this._userService.logout();
  }

  userProfile(): void {
    this._router.navigate(['user-profile'])
  }

  getCategories(): void {
    this._categoryService.getAllCategories().pipe(take(1)).subscribe({
      next: (d) => {
        this.categories = d
      }
    });
  }

}
