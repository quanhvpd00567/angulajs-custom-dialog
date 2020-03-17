import { Component, OnInit, ViewChild} from '@angular/core';
import { SuccessComponent } from "./../../_modal/success/success.component";
import { DialogService } from '../../dialog/dialog.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialogService : DialogService) { }
  ngOnInit() {
  }
	show(){
    let config = {
      width: 100,
      isClose: true,
      title: 'Title',
      data: { message: 'Content' },
    }

    let dialogRef = this.dialogService.open(SuccessComponent, config)

    // handle callback
    dialogRef.afterClosed.subscribe(result => {
      console.log('Dialog closed', result)
    })
  }
}
