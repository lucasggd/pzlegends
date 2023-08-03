import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { MessageService } from 'src/app/abstract/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent {

  private _id!: number;
  invalidCode = false;

  code: FormControl = new FormControl('', Validators.required)

  constructor(private _activatedRoute: ActivatedRoute, private _userService: UserService, private _router: Router, private messageService: MessageService) {
    if (_userService.isAuthenticated()) this._router.navigate(['/home']);
  }


  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    })
  }

  confirmEmail(): void {
    this._userService.confirmEmail(this._id, this.code.value).pipe(take(1)).subscribe({
      next: d => {
        this.messageService.successMessage('Conta confirmada.')
        this._router.navigate(['login']);
      }, error: err => {
        this.code.setValue(null);
        this.invalidCode = true;
      }
    })
  }

}
