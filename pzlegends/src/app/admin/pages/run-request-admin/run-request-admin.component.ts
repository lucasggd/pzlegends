import { Component } from "@angular/core";
import { RunRequestService } from "../../services/run-request.service";
import { take } from "rxjs";
import { RunRequestStatusEnum } from "src/app/enum/runRequestStatusEnum";

@Component({
  selector: 'app-run-request-admin',
  templateUrl: './run-request-admin.component.html',
  styleUrls: ['./run-request-admin.component.scss']
})
export class RunRequestAdminComponent {
  public columns = ['id', 'username', 'category', 'video_url', 'status', 'response_by', 'response_at']

  public data: any = [];

  public status = RunRequestStatusEnum;

  constructor(private _runRequestService: RunRequestService) {
    _runRequestService.getData().pipe(take(1)).subscribe({
      next: d => {
        this.data = d;
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}

