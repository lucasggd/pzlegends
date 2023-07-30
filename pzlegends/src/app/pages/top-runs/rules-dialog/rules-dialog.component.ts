import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss']
})
export class RulesDialogComponent {

  private categoryId: number;

  public category!: Category;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _categoryService: CategoryService) {
    this.categoryId = data.id;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategory();
  }

  getCategory(): void {
    this._categoryService.getCategory(this.categoryId).pipe(take(1)).subscribe({
      next: d => {
        this.category = d;
        let x = document.getElementById('rules');
        x!.innerHTML = d.rules;
      }
    })
  }

}
