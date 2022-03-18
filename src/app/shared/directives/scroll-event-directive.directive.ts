import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Directive({
  selector: '[appScroll]'
})
export class ScrollEventDirectiveDirective  {
  @Input() scrollClass: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener("scroll", [])
  onScroll() {
    if (this.el.nativeElement.scrollTop > 100) {
      this.renderer.removeClass(this.el.nativeElement.children[0], "app-navbar-Nobg");
      this.renderer.addClass(this.el.nativeElement.children[0], this.scrollClass);
    } else {
      this.renderer.removeClass(this.el.nativeElement.children[0], "app-navbar-bg");
      this.renderer.addClass(this.el.nativeElement.children[0], "app-navbar-Nobg");
    }
  }

}
