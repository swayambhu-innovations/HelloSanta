import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';
import { AnimationController, Animation } from '@ionic/angular';
export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const duration = 1000;

  // console.log('baseEl:', baseEl);
  // console.log('opts:', opts);

  const animationCtrl = new AnimationController();
  if (opts.direction == 'forward') {
    return animationCtrl
      .create()
      .addElement(opts.enteringEl)
      .duration(duration)
      .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
      .fromTo('opacity', 0, 1);
  } else {
    const rootAnimation = animationCtrl
      .create()
      .addElement(opts.enteringEl)
      .duration(duration)
      .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
      .fromTo('opacity', 0, 1);
    const leavingAnimation = animationCtrl
      .create()
      .addElement(opts.leavingEl)
      .duration(duration)
      .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
      .fromTo('opacity', 1, 0);
      return animationCtrl.create().addAnimation([rootAnimation, leavingAnimation]);
  }
};
