import {Directive, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';


@Directive({
  selector: '[appOutSideClickHandler]'
})
export class OutSideClickHandlerDirective {

  @Output() offClick:EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    let elementRefInPath = targetElementPath.find(e => e === this._elementRef.nativeElement);
    if (!elementRefInPath) {
      this.offClick.emit(null);
    }
  }

}
