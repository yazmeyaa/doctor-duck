import { BubbleMessage } from "./BubbleMessage";

export interface Entity {
  update(dt: number): void;
  render(ctx: CanvasRenderingContext2D, dt: number): void;
}

export class Application {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _last: number = Date.now();

  public messages: BubbleMessage[] = [];
  public entities: Entity[] = [];

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
    for (const entity of this.entities) {
      entity.update(dt);
    }
    for (const msg of this.messages) {
      msg.update(dt);
    }
  }

  public render(dt: number) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (const entity of this.entities) {
      entity.render(this.ctx, dt);
    }
    for (const msg of this.messages) {
      msg.draw(this.ctx);
    }
  }

  public play() {
    const now = Date.now();
    const dt = now - this._last;
    this._last = now;
    console.log(dt, now, this._last);
    this.render(dt);
    this.update(dt);

    window.requestAnimationFrame(this.play.bind(this));
  }

  constructor() {
    this._canvas = this.createCanvasElement();
    const ctx = this._canvas.getContext("2d");

    if (!ctx) throw new Error("Cannot get canvas context!");
    this._ctx = ctx;
  }
}
