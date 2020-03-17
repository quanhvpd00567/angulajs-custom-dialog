import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog-injector';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Injectable({
  providedIn: DialogModule
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  /**
   * Open modal compnent
   * 
   * @param componentType 
   * @param config 
   */
  open(componentType: Type<any>, config: DialogConfig) {
    const dialogRef = this.appendModalComponent(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
    return dialogRef;
  }

  /**
   * Append component to body tag
   * 
   * @param config 
   */
  private appendModalComponent(config: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeModalComponent();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);
    // Create dom element
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // Add elemnt
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeModalComponent();
    });

    return dialogRef;
  }

  /**
   * Remove modal component
   */
  private removeModalComponent() {
    console.log(this.appRef);
    
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
