import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  public icon = new FormControl();

  constructor() {
    this.icon.valueChanges.subscribe(d => {
    })
  }

  teste(ev: any) {
    let file = ev.files[0]

    var reader = new FileReader();
    reader.readAsText(file);
  }

}
