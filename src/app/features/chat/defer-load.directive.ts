import {AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appDeferLoad]'
})
export class DeferLoadDirective implements OnInit, AfterViewInit, OnDestroy {

  @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

  private observer: IntersectionObserver;

  constructor(private element: ElementRef) {
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries =>
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target === this.element.nativeElement) {
          this.observer.disconnect();
          this.deferLoad.emit();
          this.observer.unobserve(this.element.nativeElement);
        }
      }), {});
    this.observer.observe(this.element.nativeElement);
  }

  public ngOnDestroy() {
    this.observer.disconnect();
  }
}
