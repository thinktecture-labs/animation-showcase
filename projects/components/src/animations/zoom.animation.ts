import { animate, AnimationMetadata, style } from '@angular/animations';
import { getCSSPropertyValue } from '@sl/components';

export const zoomInAnimation = (): AnimationMetadata[] => {
  return [
    style({ opacity: 0, scale: 0 }),
    animate(
      `${getCSSPropertyValue('--md-sys-motion-duration-long-2')} ${getCSSPropertyValue(
        '--md-sys-motion-easing-accelerating',
      )}`,
      style({ opacity: 1, scale: 1 }),
    ),
  ];
};
