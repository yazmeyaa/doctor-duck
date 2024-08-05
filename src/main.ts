import DuckImg from "./assets/duck.png";
import { Vector2D } from "ts-vector2d";
import { BubbleMessage } from "./BubbleMessage";
import data from './assets/data.json'

const duckAnimationProps = {
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

class Duck {
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

  public draw(ctx: CanvasRenderingContext2D, dt: number): void {
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

class Application {
  public duck: Duck = new Duck();
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  private createCanvasElement(): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `display: block;`;
    return canvas;
  }

  public mount(target: HTMLElement): void {
    target.appendChild(this._canvas);
  }

  public update(dt: number) {
    this.duck.update(dt);
  }

  public render(dt: number) {
    this.duck.draw(this._ctx, dt);
  }

  constructor() {
    this._canvas = this.createCanvasElement();
    const ctx = this._canvas.getContext("2d");

    if (!ctx) throw new Error("Cannot get canvas context!");
    this._ctx = ctx;
  }
}

const app = new Application();
app.mount(document.body);
app.duck.position.setX(-128);
app.duck.position.setY(app.ctx.canvas.height / 2);
app.duck.velocity.set(350, 0);
app.duck.moveTo(app.ctx.canvas.width / 2, app.ctx.canvas.height / 2);

const msg = new BubbleMessage();
msg.bind(app.duck);

let last = Date.now();

function draw(dt: number) {
  app.ctx.clearRect(0, 0, app.ctx.canvas.width, app.ctx.canvas.height);
  app.render(dt);
  msg.draw(app.ctx);
}

function update(dt: number) {
  app.update(dt);
  msg.update(dt);
}

function play() {
  const now = Date.now();
  const dt = now - last;
  last = now;
  draw(dt);
  update(dt);

  window.requestAnimationFrame(play);
}

msg.open("Привет, я доктор-утка :)");
setTimeout(() => {
  msg.close();
}, 3500);

const phrases = data;

app.ctx.canvas.addEventListener("mousedown", () => {
  const idx = Math.floor(Math.random() * phrases.length);
  msg.open(phrases[idx]);

  setTimeout(() => {
    msg.close();
  }, 3500);
});

play();
