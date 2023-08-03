import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  error!: string;

  public form = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, Validators.required),
  })

  constructor(private _userService: UserService, private _router: Router) {

  }

  getErrorMessage(controlName: string) {
    if (!this.form.get(controlName)?.touched) return;

    if (this.form.get(controlName)?.hasError('min')) {
      return 'Valor minimo é ' + this.form.get(controlName)?.getError('min')?.min;
    }

    if (this.form.get(controlName)?.hasError('max')) {
      return 'Valor maximo é ' + this.form.get(controlName)?.getError('max')?.max;
    }

    return this.form.get(controlName)?.hasError('required') ? 'Campo obrigatório*' : '';
  }

  confirm(): void {
    if (!this.form.valid) return;

    if (this.form.get('password')?.value != this.form.get('repeatPassword')?.value) {
      this.error = "As senhas não coincidem.";
      return;
    }

    this._userService.register(this.form.get('username')?.value!, this.form.get('email')?.value!, this.form.get('password')?.value!).pipe(take(1)).subscribe({
      next: d => {
        this._router.navigate(['email-confirmation/' + d?.id])
      },
      error: err => {
        this.error = err.error.message;
      }
    })
  }

}
