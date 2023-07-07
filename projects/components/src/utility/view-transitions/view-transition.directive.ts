import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ViewTransitionStore } from './view-transition-store.service';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import { ChangeDetectionCoordinator } from './change-detection-coordinator.service';

@Directive({
  selector: '[viewTransition]',
  standalone: true,
})
export class ViewTransitionDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  private viewTransitionStore = inject(ViewTransitionStore);
  private cdCoordinator = inject(ChangeDetectionCoordinator);

  @Input() viewTransition = '';
  @Input() route: any[] = [];
  @Input() triggerId?: string;
  @Input() activeClass = 'active';

  @Input() log = false;

  @HostListener('click')
  async startTransition() {
    if (this.route.length === 0 || !this.triggerId) {
      return;
    }
    this.elementRef.nativeElement.classList.add(this.activeClass);
    this.viewTransitionStore.setViewTransitionConfiguration({
      triggerId: this.triggerId,
      runningType: this.viewTransition,
    });
    this.navigate();
  }

  public ngOnInit(): void {
    combineLatest([
      this.viewTransitionStore.triggerElementId$,
      this.viewTransitionStore.runningType$,
    ])
      .pipe(
        map(([triggerId, currentRunningType]) => {
          if (
            triggerId === '' &&
            this.elementRef.nativeElement.classList.contains(this.activeClass)
          ) {
            this.elementRef.nativeElement.classList.remove(this.activeClass);
          }
          if (currentRunningType !== '') {
            this.elementRef.nativeElement.classList.add(currentRunningType);
          }
          return triggerId;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  private navigate(): void {
    if (this.route.length > 0 && this.viewTransition) {
      const transition: any = (document as any).startViewTransition(async () => {
        await this.router.navigate(this.route);
        await this.cdCoordinator.schedule(); //muss rein weil sonst die CD nicht richtig completed
      });

      transition.finished.then(() => {
        this.viewTransitionStore.resetConfiguration();
      });
    }
  }
}
