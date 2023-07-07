import {
  animateChild,
  group,
  query,
  sequence,
  stagger,
  transition,
  trigger,
} from '@angular/animations';
import {
  fadeFactory,
  getCSSPropertyValue,
  slideInOutAnimationFactory,
  staggerFadeFactory,
} from '@sl/components';

export const DRAWER_ANIMATIONS = [
  trigger('drawerInit', [
    transition(':enter', [
      sequence([
        ...slideInOutAnimationFactory('X', '-100%', '0'),
        group([
          query('@*', [
            stagger(getCSSPropertyValue('--md-sys-motion-duration-medium-4'), [animateChild()]),
          ]),
        ]),
      ]),
    ]),
  ]),
  trigger('logoFade', [transition(':enter', fadeFactory(0, 1))]),
  trigger('itemStagger', [transition(':enter', [query('.item', staggerFadeFactory())])]),
];
