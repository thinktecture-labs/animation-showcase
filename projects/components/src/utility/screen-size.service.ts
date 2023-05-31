import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {BREAKPOINTS} from './screen-size';

@Injectable({providedIn: 'root'})
export class ScreenSizeService implements OnDestroy {
  protected active$$ = new BehaviorSubject<string>(Breakpoints.XLarge);
  active$ = this.active$$.asObservable();
  private readonly destroy$$ = new Subject<void>();

  constructor(private readonly breakpointObserver: BreakpointObserver,) {
    breakpointObserver.observe(BREAKPOINTS)
      .pipe(takeUntil(this.destroy$$)).subscribe((result) => {
      Object.entries(result.breakpoints)
        .filter(([_, active]) => active)
        .forEach(([size, _]) => this.active$$.next(size));
    });
  }

  ngOnDestroy(): void {
    this.destroy$$.next(void 0);
  }
}
