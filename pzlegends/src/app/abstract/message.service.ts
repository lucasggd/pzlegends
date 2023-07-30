import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) { }

  successMessage(message: string) {
    this._snackBar.open(message, '', { duration: 5000, panelClass: ['successMessage'] });
  }

  errorMessage(message: string) {
    this._snackBar.open(message, 'x', { panelClass: ['errorMessage'] });
  }
}
