import { Component, OnInit , Input} from '@angular/core';
import { DialogConfig } from '../../dialog/dialog-config';
import { DialogRef } from '../../dialog/dialog-ref';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  @Input() width: number
  constructor(public config: DialogConfig, public dialog: DialogRef) {}
  onClose() {
    this.dialog.close('close');
  }
  onSave(){
    this.dialog.close('save');
  }
  ngOnInit() { }
}
