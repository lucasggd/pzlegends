import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  error!: string;

  public form = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    repeatPassword: new FormControl(null, Validators.required),
  })

  constructor(private _userService: UserService, private _router: Router, private _transloco: TranslocoService) {

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
        this.error = this._transloco.translate(err.error.message);
      }
    })
  }

}
