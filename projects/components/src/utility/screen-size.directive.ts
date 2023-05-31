import { Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Directive,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ScreenSizeService } from './screen-size.service';

@Directive()
export class AbstractScreenSizeDirective implements OnInit, OnDestroy {
  #destroy$$ = new Subject<void>();
  create?: boolean;
  private readonly screenSizeService = inject(ScreenSizeService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor(private readonly sizes: string[]) {}

  ngOnInit(): void {
    this.screenSizeService.active$
      .pipe(
        takeUntil(this.#destroy$$),
        map(
          size =>
            (this.create === false && this.sizes.indexOf(size) === -1) ||
            (this.create !== false && this.sizes.indexOf(size) !== -1),
        ),
        distinctUntilChanged(),
      )
      .subscribe(create => {
        this.updateView(create);
      });
  }

  ngOnDestroy(): void {
    this.#destroy$$.next(void 0);
  }

  private updateView(create: boolean) {
    if (create) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.changeDetectorRef.markForCheck();
    } else {
      this.viewContainerRef.clear();
    }
  }
}

@Directive({
  selector: '[slScreenXSmall]',
  standalone: true,
})
export class XSmallScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.XSmall]);
  }
}

@Directive({
  selector: '[slScreenSmall]',
  standalone: true,
})
export class SmallScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.Small]);
  }
}

@Directive({
  selector: '[slScreenMedium]',
  standalone: true,
})
export class MediumScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.Medium]);
  }
}

@Directive({
  selector: '[slScreenLarge]',
  standalone: true,
})
export class LargeScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.Large]);
  }
}

@Directive({
  selector: '[slScreenXLarge]',
  standalone: true,
})
export class XLargeScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.XLarge]);
  }
}

@Directive({
  selector: '[slScreenXSmallAndSmall]',
  standalone: true,
})
export class XSmallAndSmallScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.XSmall, Breakpoints.Small]);
  }
}

@Directive({
  selector: '[slScreenMediumAndLarge]',
  standalone: true,
})
export class MediumAndLargeScreenSizeDirective extends AbstractScreenSizeDirective {
  constructor() {
    super([Breakpoints.Medium, Breakpoints.Large]);
  }
}
