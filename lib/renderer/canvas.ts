// renderer/canvas.ts;
import { IFrame, IRenderer, RendererFit } from '../interface';

// TODO: 渲染器配置
export interface CanvasRendererOptions {
  fit: RendererFit;
}

// canvas 2D渲染器实现
export class CanvasRenderer implements IRenderer {
  private readonly ctx: CanvasRenderingContext2D;
  private fit: RendererFit;

  constructor(canvas: HTMLCanvasElement, options?: Partial<CanvasRendererOptions>) {
    const ctx = canvas.getContext('2d')!;
    this.fit = (options || { fit: 'cover' }).fit || 'cover';
    if (!ctx) throw new Error('Canvas2D not supported');
    this.ctx = ctx;
  }

  // TODO: fit - contain; 适应
  fit_contain(image: ImageBitmap) {
    const canvas = this.ctx.canvas;
    const ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
    const height = image.height * ratio;
    const width = image.width * ratio;
    return {
      width,
      height,
      x: (canvas.width - width) / 2,
      y: (canvas.height - height) / 2,
    };
  }

  // TODO: fit - cover; 裁剪
  fit_cover(image: ImageBitmap) {
    const canvas = this.ctx.canvas;
    const ratio = Math.max(canvas.width / image.width, canvas.height / image.height);
    //
    return { x: 0, y: 0, width: image.width * ratio, height: image.height * ratio };
  }

  // TODO: fit - fill; 拉伸
  fit_fill(_: ImageBitmap) {
    const { width, height } = this.ctx.canvas;
    return { x: 0, y: 0, width: width, height: height };
  }

  // TODO: 应用 fit
  applyFit(image: ImageBitmap) {
    return ({
      contain: this.fit_contain.bind(this),
      cover: this.fit_cover.bind(this),
      fill: this.fit_fill.bind(this),
    })[this.fit](image);
  }

  render(frame: IFrame): void {
    if (!this.ctx) return;
    // TODO: 渲染
    frame.toImageBitmap().then(imageBitmap => {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      const { x, y, width, height } = this.applyFit(imageBitmap);
      this.ctx.drawImage(imageBitmap, x, y, width, height);
      imageBitmap.close();
    });
  }

  destroy(): void {
    // 销毁
  }
}
