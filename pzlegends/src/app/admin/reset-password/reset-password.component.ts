import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TranslocoService } from "@ngneat/transloco";
import { MessageService } from 'src/app/abstract/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  public email!: string;
  public code!: string;

  error!: string;

  public form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    repeatPassword: new FormControl(null, Validators.required),
  })

  constructor(private _userService: UserService, private _router: Router, private _transloco: TranslocoService, private _activatedRoute: ActivatedRoute, private _message: MessageService) {

  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.email = params['email'];
      this.code = params['code'];
    })
  }

  getErrorMessage(controlName: string) {
    if (!this.form.get(controlName)?.touched) return;

    if (this.form.get(controlName)?.hasError('min')) {
      return 'Valor minimo é ' + this.form.get(controlName)?.getError('min')?.min;
    }

    if (this.form.get(controlName)?.hasError('max')) {
      return 'Valor maximo é ' + this.form.get(controlName)?.getError('max')?.max;
    }

    if (this.form.get(controlName)?.hasError('minlength')) {
      return 'Tamanho minimo é ' + this.form.get(controlName)?.getError('minlength')?.requiredLength + " caracteres";
    }

    if (this.form.get(controlName)?.hasError('maxlength')) {
      return 'Tamanho maximo é ' + this.form.get(controlName)?.getError('maxlength')?.requiredLength + " caracteres";
    }

    if (this.form.get(controlName)?.hasError('email')) {
      return 'Email inválido*';
    }

    return this.form.get(controlName)?.hasError('required') ? 'Campo obrigatório*' : '';
  }

  confirm(): void {
    if (this.form.get('password')?.value != this.form.get('repeatPassword')?.value) {
      this.error = "As senhas não coincidem.";
      return;
    }

    if (this.code && this.email) {
      this._userService.resetPassword(this.email, this.form.get('password')?.value!, this.code).pipe(take(1)).subscribe({
        next: d => {
          this._message.successMessage('Senha alterada');
          this._router.navigate(['login'])
        },
        error: err => {
          this._message.errorMessage(err);
        }
      })
      return;
    }

    this._userService.sendResetPassword(this.form.get('email')?.value!).pipe(take(1)).subscribe({
      next: d => {
        this._message.successMessage('Verifique seu email');
        this._router.navigate(['login']);
      },
      error: err => {
        this._message.errorMessage(err);
      }
    })

  }

}
