import { AnimationDirection } from './animation-direction.type';
import { animate, AnimationMetadata, sequence, stagger, style } from '@angular/animations';
import { getCSSPropertyValue } from '@sl/components';

export const slideInOutAnimationFactory = (
  direction: AnimationDirection,
  from: string,
  to: string,
  duration: string = getCSSPropertyValue('--md-sys-motion-duration-medium-3'),
  easing: string = getCSSPropertyValue('--md-sys-motion-easing-emphasized'),
): AnimationMetadata[] => {
  return [
    style({
      transform: `translate${direction}(${from})`,
    }),
    animate(
      `${duration} ${easing}`,
      style({
        transform: `translate${direction}(${to})`,
      }),
    ),
  ];
};

export const slideFadeAnimationFactory = (): AnimationMetadata[] => {
  return [
    style({ opacity: 0, transform: 'translateY(-1.5rem)', scale: 0.8 }),
    stagger(getCSSPropertyValue('--md-sys-motion-duration-stagger-delay'), [
      animate(
        `${getCSSPropertyValue('--md-sys-motion-duration-medium-3')} ${getCSSPropertyValue(
          '--md-sys-motion-easing-decelerating',
        )}`,
        style({ opacity: 1, transform: 'translateY(0)', scale: 1 }),
      ),
    ]),
  ];
};

export const slideDeletAnimation = (): AnimationMetadata => {
  return sequence([
    animate(
      `${getCSSPropertyValue('--md-sys-motion-duration-short-3')} ${getCSSPropertyValue(
        '--md-sys-motion-easing-accelerating',
      )}`,
      style({
        transform: `translateX(-200%)`,
      }),
    ),
    animate(
      `${getCSSPropertyValue('--md-sys-motion-duration-short-3')} ease`,
      style({
        height: 0,
      }),
    ),
  ]);
};
