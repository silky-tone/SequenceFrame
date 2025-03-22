import { IRenderer } from '../interface';

// canvas 2D渲染器实现
export class CanvasRenderer implements IRenderer {
  // private ctx!: CanvasRenderingContext2D;
  //
  // async init(canvas: HTMLCanvasElement) {
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) throw new Error('Canvas2D not supported');
  //   this.ctx = ctx;
  // }
  //
  // render(frame: HTMLImageElement) {
  //   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  //   this.ctx.drawImage(frame, 0, 0);
  // }
  //
  // resize(width: number, height: number) {
  //   this.ctx.canvas.width = width;
  //   this.ctx.canvas.height = height;
  // }
  //
  // destroy() {
  //   // Canvas无需特殊清理
  // }
}
