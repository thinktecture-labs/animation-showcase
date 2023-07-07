import { animate, AnimationMetadata, stagger, style } from '@angular/animations';
import { getCSSPropertyValue } from '@sl/components';

export const fadeFactory = (
  from: number,
  to: number,
  duration: string = getCSSPropertyValue('--md-sys-motion-duration-short-3'),
): AnimationMetadata[] => {
  return [style({ opacity: from }), animate(`${duration} ease`, style({ opacity: to }))];
};

export const staggerFadeFactory = (
  staggerDuration: string = getCSSPropertyValue('--md-sys-motion-duration-stagger-delay'),
): AnimationMetadata[] => {
  return [
    style({ opacity: 0 }),
    stagger(staggerDuration, [
      animate(
        `${getCSSPropertyValue('--md-sys-motion-duration-medium-3')}  ease`,
        style({ opacity: 1 }),
      ),
    ]),
  ];
};
