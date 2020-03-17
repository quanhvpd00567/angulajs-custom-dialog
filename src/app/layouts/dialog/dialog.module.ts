import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { SuccessComponent } from './../_modal/success/success.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, InsertionDirective, SuccessComponent],
  entryComponents: [DialogComponent]
})
export class DialogModule {}
