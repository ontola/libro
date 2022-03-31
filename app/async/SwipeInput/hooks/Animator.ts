import { SpringRef, SpringValues } from '@react-spring/web';

import { CardState, HoverSide } from '../CardState';
import { SWIPE_CONFIG } from '../SwipeConfig';

const {
  cardScaleAmount,
  confirmSlideDistanceLarge,
  confirmSlideDistanceSmall,
  deadzoneAmount,
  iconOpacityModifier,
  overlayColorNo,
  overlayColorYes,
  overlayOpacityModifier,
  rotateModifier,
  springFriction,
  springFrictionVoteAnimation,
  springMass,
  springTension,
  verticalClamp,
} = SWIPE_CONFIG;

interface CardAnimation {
  opacity: number;
  rotateZ: number;
  rotateY: number;
  scale: number;
  x: number;
  y: number;
}

interface IconAnimation {
  opacity: number;
}

interface OverlayAnimation {
  backgroundColor: string;
  opacity: number;
}

export type CardAnimationProps = SpringValues<CardAnimation>;
type CardAnimationAPI = SpringRef<CardAnimation>;

export type IconAnimationProps = SpringValues<IconAnimation>;
type IconAnimationAPI = SpringRef<IconAnimation>;

export type OverlayAnimationProps = SpringValues<OverlayAnimation>;
type OverlayAnimationAPI = SpringRef<OverlayAnimation>;

export class Animator {
  public static readonly cardBaseProps = {
    opacity: 1,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
  };

  public static readonly overlayBaseProps = {
    backgroundColor: overlayColorYes,
    opacity: 0,
  };

  public static readonly iconBaseProps = {
    opacity: 0,
  };

  public static readonly config = {
    clamp: false,
    friction: springFriction,
    mass: springMass,
    tension: springTension,
  };

  private static readonly clampedConfig = {
    ...Animator.config,
    clamp: true,
  };

  private cardAPI: CardAnimationAPI;
  private iconAPI: IconAnimationAPI;
  private overlayAPI: OverlayAnimationAPI;
  private confirmSlideDistance: number;

  constructor(
    cardAPI: CardAnimationAPI,
    iconAPI: IconAnimationAPI,
    overlayAPI: OverlayAnimationAPI,
    screenIsWide: boolean,
  ) {
    this.cardAPI = cardAPI;
    this.iconAPI = iconAPI;
    this.overlayAPI = overlayAPI;

    this.confirmSlideDistance = screenIsWide ? confirmSlideDistanceLarge : confirmSlideDistanceSmall;
  }

  public animateShowInfo(): void {
    this.cardAPI.start({
      to: async (next) => {
        await next([
          {
            config: Animator.clampedConfig,
            scale: 1 + cardScaleAmount,
          },
          {
            opacity: 0,
            rotateY: 180,
          },
          {
            config: Animator.config,
            scale: 1,
          },
        ]);
      },
    });
  }

  public animateIdle(): void {
    this.cardAPI.start({
      config: Animator.config,
      ...Animator.cardBaseProps,
    });
    this.overlayAPI.start({
      config: Animator.config,
      ...Animator.overlayBaseProps,
    });
    this.iconAPI.start({
      config: Animator.config,
      ...Animator.iconBaseProps,
    });
  }

  public animateFlipToFront(): Promise<void> {
    return new Promise((resolve) => {
      this.cardAPI.start({
        to: async (next) => {
          await next([
            {
              config: Animator.clampedConfig,
              scale: 1 + cardScaleAmount,
            },
            {
              opacity: 1,
              rotateY: 0,
            },
            {
              config: Animator.config,
              scale: 1,
            },
          ]);

          resolve();
        },
      });
    });
  }

  public animateVote(result: CardState.VotingYes | CardState.VotingNo): void {
    const x = this.confirmSlideDistance * (result === CardState.VotingNo ? -1 : 1);

    this.cardAPI.start({
      config: {
        ...Animator.config,
        friction: springFrictionVoteAnimation,
      },
      to: {
        opacity: 0,
        rotateZ: x * rotateModifier,
        scale: 1,
        x,
      },
    });

    this.overlayAPI.start({
      backgroundColor: result === CardState.VotingYes ? overlayColorYes : overlayColorNo,
      opacity: 1,
    });

    this.iconAPI.start({
      opacity: 1,
    });
  }

  public animateVotedIdle(state: CardState.IdleYes | CardState.IdleNo): void {
    this.cardAPI.start({
      ...Animator.cardBaseProps,
      config: Animator.config,
      immediate: true,
    });

    this.overlayAPI.start({
      backgroundColor: state === CardState.IdleYes ? overlayColorYes : overlayColorNo,
      config: Animator.config,
      immediate: true,
      opacity: 1,
    });

    this.iconAPI.start({
      config: Animator.config,
      immediate: true,
      opacity: 1,
    });
  }

  public animateDragging(down: boolean, mx: number, my: number, hoverSide: HoverSide): void {
    const xOffset = Math.abs(mx);
    const deadZone = xOffset > deadzoneAmount ? 1 : 0;

    this.cardAPI.start(down ? {
      config: Animator.clampedConfig,
      rotateZ: mx * rotateModifier,
      scale: 1 - cardScaleAmount,
      x: mx,
      y: Math.max(verticalClamp * -1, Math.min(verticalClamp, my)),
    } : {
      config: Animator.config,
      ...Animator.cardBaseProps,
    });

    this.overlayAPI.start(down ? {
      backgroundColor: hoverSide === HoverSide.Yes ? overlayColorYes : overlayColorNo,
      opacity: Math.min(xOffset * overlayOpacityModifier, 1) * deadZone,
    } : {
      config: Animator.config,
      ...Animator.overlayBaseProps,
    });

    this.iconAPI.start(down ? {
      opacity: Math.min(xOffset * iconOpacityModifier, 1),
    } : {
      config: Animator.config,
      ...Animator.iconBaseProps,
    });
  }
}
