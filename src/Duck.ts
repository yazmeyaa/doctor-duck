import { Entity } from "./Application";
import DuckImg from "./assets/duck.png";
import { Vector2D } from "ts-vector2d";

export const duckAnimationProps = {
  idle: {
    row: 0,
    framesCount: 6,
  },
  idle_reversed: {
    row: 1,
    framesCount: 6,
  },
  walk: {
    row: 2,
    framesCount: 8,
  },
  walk_reversed: {
    row: 3,
    framesCount: 8,
  },
  jump: {
    row: 4,
    framesCount: 6,
  },
  jump_reversed: {
    row: 5,
    framesCount: 6,
  },
} as const;

export class Duck implements Entity {
  public position = new Vector2D(0, 0);
  public velocity = new Vector2D(0, 0);
  public targetPoint = new Vector2D(0, 0);
  public image: HTMLImageElement;
  private currentFrame = 0;
  private readonly frameWidth = 128;
  private readonly frameHeight = 128;
  private readonly animationUpdateRateMS = 1000 / 24; // 24 fps
  private lastFrameElapsedTimeMS = 0;
  private currentAnimationState: keyof typeof duckAnimationProps = "walk";

  constructor() {
    this.image = new Image(200, 400);
    this.image.src = DuckImg;
  }

  public setAnimationState(state: keyof typeof duckAnimationProps): void {
    this.currentAnimationState = state;
    this.currentFrame = 0;
  }

  public render(ctx: CanvasRenderingContext2D, dt: number): void {
    const dx = this.currentFrame * this.frameWidth;
    const dy =
      duckAnimationProps[this.currentAnimationState].row * this.frameHeight;
    const dw = this.frameWidth;
    const dh = this.frameHeight;
    ctx.drawImage(
      this.image,
      dx,
      dy,
      dw,
      dh,
      this.position.getX() - 64,
      this.position.getY() - 64,
      128,
      128
    );

    this.lastFrameElapsedTimeMS += dt;
    if (this.lastFrameElapsedTimeMS >= this.animationUpdateRateMS) {
      this.lastFrameElapsedTimeMS = 0;
      this.currentFrame++;
      if (
        this.currentFrame >=
        duckAnimationProps[this.currentAnimationState].framesCount
      )
        this.currentFrame = 0;
    }
  }

  public moveTo(x: number, y: number) {
    this.targetPoint.set(x, y);
    const directionVec = this.position.subtract(this.targetPoint);
    if (directionVec.getX() < 0) {
      this.setAnimationState("walk");
    } else {
      this.setAnimationState("walk_reversed");
    }
  }

  public update(dt: number) {
    const directionVector = this.targetPoint
      .subtract(this.position)
      .normalize()
      .multiply(this.velocity.getX() * (dt / 1000));
    const distance = this.targetPoint.subtract(this.position).magnitude();
    if (distance > 5) {
      this.position = this.position.add(directionVector);
    } else {
      if (this.currentAnimationState === "walk") {
        this.setAnimationState("idle");
      } else if (this.currentAnimationState === "walk_reversed") {
        this.setAnimationState("idle_reversed");
      }
    }
  }
}
