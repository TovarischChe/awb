import { Directive, ElementRef, EventEmitter } from '@angular/core';
import { ScrollService } from '../shared/scroll.service';

@Directive({
  selector: '[adOnScreenEnter]',
  outputs: ['screenEnter', 'screenLeave']
})
export class OnScreenEnterDirective {
  private scrollContainerHeight = window.outerHeight;
  private entered = false;
  screenEnter = new EventEmitter();
  screenLeave = new EventEmitter();

  constructor(private element: ElementRef, scrollService: ScrollService) {
    scrollService.$WindowScrolled.subscribe((scrollState) => {
      // Скроллим вниз
      if (scrollState.direction) {
        // Если низ блока ниже середины экрана && верх блока выше середины экрана
        // debugger
        if (this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight >
            scrollState.position + this.scrollContainerHeight / 2
            && this.element.nativeElement.offsetTop <= scrollState.position + this.scrollContainerHeight / 2
            && !this.entered) {
          this.entered = true;
          this.screenEnter.emit({scrollState});
          // Если верх блока выше середины экрана && низ блока выше середины экрана
        } else if (this.element.nativeElement.offsetTop < scrollState.position + this.scrollContainerHeight / 2
            && this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight <=
            scrollState.position + this.scrollContainerHeight / 2 && this.entered) {
          this.entered = false;
          this.screenLeave.emit({scrollState});
        }
        // Скроллим вверх
      } else {
        // Если верх блока выше середины экрана && низ блока ниже середины экрана
        if (this.element.nativeElement.offsetTop < scrollState.position + this.scrollContainerHeight / 2
            && this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight >=
            scrollState.position + this.scrollContainerHeight / 2
            && !this.entered) {
          this.entered = true;
          this.screenEnter.emit({scrollState});
          // Если низ блока ниже середины экрана && верх блока выше середины экрана
        } else if (this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight >
            scrollState.position + this.scrollContainerHeight / 2
            && this.element.nativeElement.offsetTop >= scrollState.position + this.scrollContainerHeight / 2
            && this.entered) {
          this.entered = false;
          this.screenLeave.emit({scrollState});
        }
      }
    });
  };
}