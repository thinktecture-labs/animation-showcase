import { animate, animation, sequence, stagger, style } from '@angular/animations';
import { getCSSPropertyValue } from '../utility/get-computet-style';

export const fade = animation([
  style({ opacity: '{{from}}' }),
  animate('{{animation}}', style({ opacity: '{{to}}' })),
]);

export const staggerFade = animation([
  style({ opacity: '{{from}}' }),
  stagger(getCSSPropertyValue('--md-sys-motion-duration-stagger-delay'), [
    animate('{{animation}}', style({ opacity: '{{to}}' })),
  ]),
]);

export const slide = animation([
  style({
    transform: 'translate{{direction}}({{from}})',
  }),
  animate(
    '{{duration}} {{easing}}',
    style({
      transform: `translate{{direction}}({{to}})`,
    }),
  ),
]);

export const slideFade = animation([
  style({ opacity: 0, transform: 'translateY(-1.5rem)', scale: 0.8 }),
  stagger(getCSSPropertyValue('--md-sys-motion-duration-stagger-delay'), [
    animate(
      `${getCSSPropertyValue('--md-sys-motion-duration-medium-3')} ${getCSSPropertyValue(
        '--md-sys-motion-easing-decelerating',
      )}`,
      style({ opacity: 1, transform: 'translateY(0)', scale: 1 }),
    ),
  ]),
]);

export const slideDelete = animation([
  sequence([
    animate(
      '{{duration}} {{easing}}',
      style({
        transform: `translate{{direction}}({{to}})`,
      }),
    ),
    animate(
      '{{duration}} {{easing}}',
      style({
        height: 0,
      }),
    ),
  ]),
]);

export const zoom = animation([
  style({ opacity: '{{from}}', scale: '{{from}}' }),
  animate('{{animation}}', style({ opacity: '{{to}}', scale: '{{to}}' })),
]);
