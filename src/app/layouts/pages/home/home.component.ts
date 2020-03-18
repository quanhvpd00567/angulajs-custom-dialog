import { Component, OnInit, ViewChild} from '@angular/core';
import { SuccessComponent } from "./../../_modal/success/success.component";
import { DialogService } from '../../dialog/dialog.service';
import { UserService } from "./../../../services/user.service";
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : User
  constructor(private dialogService : DialogService, private userService : UserService) { }
  ngOnInit() {
    const promise = this.userService.getUser()
    promise.then((response: User) => {
      this.user = response
      
    })

    promise.catch(error => {
      console.log(error);
    })

    promise.finally(() => {
      console.log('finally');
    })
    
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
