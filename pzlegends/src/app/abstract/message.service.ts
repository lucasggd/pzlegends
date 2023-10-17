import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar, private _transloco: TranslocoService) { }

  successMessage(message: string) {
    this._snackBar.open(message, '', { duration: 5000, panelClass: ['successMessage'] });
  }

  errorMessage(error: any) {
    this._transloco.selectTranslate('pt-BR')
    console.log(this._transloco.translate('teste'))
    if (error.error.message!) error = this._transloco.translate(error.error.message);
    this._snackBar.open(error, 'x', { panelClass: ['errorMessage'] });
  }
}
