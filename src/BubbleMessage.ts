import { Vector2D } from "ts-vector2d";

export interface BindTarget {
  position: Vector2D;
}

export class BubbleMessage {
  public position: Vector2D = new Vector2D(0, 0);
  private bindTarget: BindTarget | null = null;
  private width: number = 250;
  private height: number = 50;
  private xPadding: number = 16;
  private yPadding: number = 16;
  private offsetX: number = 0;
  private offsetY: number = -150;
  private message: string | null = null;
  private isOpen: boolean = false;
  private isOpening: boolean = false;
  private isClosing: boolean = false;
  private opacityFactor = 95;
  private fontSize = 24;
  private opacity = 0; // 0-100 range
  private backgroundColor = "cccccc";

  public open(message: string) {
    if (this.isClosing || this.isOpening || this.isOpen) return;
    this.isOpening = true;
    this.isOpen = true;
    this.message = message;
  }

  public close() {
    if (this.isClosing || this.isOpening) return;
    this.isClosing = true;
  }

  public bind(target: BindTarget): void {
    this.bindTarget = target;
  }

  private numberToHex(val: number, min = 0, max = 100): string {
    const normalized = (val - min) / (max - min);
    return Math.floor(0xff * normalized).toString(16);
  }

  public update(dt: number): void {
    if (this.bindTarget) {
      this.position = this.bindTarget.position.clone();
    }

    if (this.isClosing) {
      this.opacity -= (dt / 1000) * this.opacityFactor;
      if (this.opacity <= 0) {
        this.isOpen = false;
        this.message = null;
        this.isClosing = false;
      }
      return;
    }

    if (this.isOpen && !this.isClosing && this.isOpening) {
      this.opacity += (dt / 1000) * this.opacityFactor; // add 50 per sec
      if (this.opacity >= 100) {
        this.opacity = 100;
        this.isOpening = false;
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.message && this.isOpen) {
      const opacity = this.numberToHex(this.opacity).padStart(2, "0");
      const x = this.position.getX() + this.offsetX - this.width / 2;
      const y = this.position.getY() + this.offsetY;
      ctx.beginPath();
      ctx.roundRect(
        x - this.xPadding,
        y - this.yPadding,
        this.width + this.xPadding,
        this.height + this.yPadding,
        15
      );
      ctx.closePath();

      ctx.fillStyle = `#${this.backgroundColor}${opacity}`;
      ctx.strokeStyle = `#000000${opacity}`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.font = `${this.fontSize}px regular Times New Roman`;
      ctx.textAlign = "center";
      ctx.textRendering = "geometricPrecision";
      ctx.fillStyle = `#000000${opacity}`;
      ctx.fillText(
        this.message,
        x + this.width / 2 - this.xPadding / 2,
        y + this.height / 2
      );
      const txt = ctx.measureText(this.message);
      this.width = txt.width;
      ctx.restore();
    }
  }
}
