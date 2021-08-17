import {AfterViewInit, Directive, ElementRef} from "@angular/core";

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorStatusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.el.nativeElement.textContent === 'NOT ANSWERED') {
      this.el.nativeElement.style.backgroundColor = 'black'
    } else if (this.el.nativeElement.textContent === 'ANSWERED') {
      this.el.nativeElement.style.backgroundColor = '#00b2a9'
    } else {
      this.el.nativeElement.style.backgroundColor = '#4a90e2'
    }
  }
}
