import { Component, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import { Dialog } from './dialog.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, {static: true}) insertionPoint: InsertionDirective;

  
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType: Type<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, private dialogRef: DialogRef) {}


  
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    
    this.dialogRef.close();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === Dialog.KEY_PRESS_ESC) {
      this.dialogRef.close();
    }
  }

  // onKeydownHandler(event: KeyboardEvent){
  //   console.log(event.keyCode);
  //   if(event.keyCode === 27){
  //     this.dialogRef.close(event.key);
  //   }
  // }

  
 

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {

      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}
