import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface ViewTransitionConfiguration {
  triggerId: string;
  runningType: string;
}

@Injectable({ providedIn: 'root' })
export class ViewTransitionStore extends ComponentStore<ViewTransitionConfiguration> {
  triggerElementId$ = this.select(({ triggerId }) => triggerId);
  runningType$ = this.select(({ runningType }) => runningType);
  constructor() {
    super({ triggerId: '', runningType: '' });
  }

  resetConfiguration(): void {
    this.setState({ triggerId: '', runningType: '' });
  }

  setViewTransitionConfiguration = this.updater((state, config: ViewTransitionConfiguration) => ({
    ...state,
    ...config,
  }));
}
