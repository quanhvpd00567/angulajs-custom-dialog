import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './../_modal/success/success.component';
import { DialogModule } from './../dialog/dialog.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DialogModule
  ],
  entryComponents: [SuccessComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
