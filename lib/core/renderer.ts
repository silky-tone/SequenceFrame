// core/renderer.ts;
import { IFrame, IRenderer, RendererOptions } from '../interface';
import { isString, mergeObject } from '../utils';
import { CanvasRenderer } from '../renderer';

const opt = {
  fit: 'contain',
  type: 'canvas',
  renderer: undefined,
};

// TODO: 渲染器实现
export class Renderer {
  private readonly renderer: IRenderer;
  private readonly root: HTMLCanvasElement;
  //
  private option: RendererOptions;

  constructor(element: HTMLElement | HTMLCanvasElement | string, options?: Partial<RendererOptions>) {
    this.option = (mergeObject(opt, options || {}) as RendererOptions);
    this.root = this.getCanvas(element);
    // TODO: 渲染器
    const renderer = this.option.renderer;
    this.renderer = renderer ? renderer : this.getRenderer();
  }

  // TODO: 获取渲染器
  private getRenderer(): IRenderer {
    const renderer = ({
      canvas: CanvasRenderer,
    })[this.option.type];
    if (!renderer) throw new Error('Unsupported renderer type');
    //
    return new renderer(this.root, this.option) as IRenderer;
  }

  // TODO: 获取 canvas
  private getCanvas(element: HTMLElement | HTMLCanvasElement | string): HTMLCanvasElement {
    // 过滤掉字符串
    if (isString(element)) {
      const canvas = document.querySelector<HTMLElement>(element);
      if (!canvas) {
        throw new Error(`Canvas not found: ${element}`);
      }
      return this.getCanvas(canvas);
    }
    // 判断非 canvas
    if (element.tagName.toLowerCase() !== 'canvas') {
      const canvas = document.createElement('canvas');
      canvas.setAttribute('style', 'width: 100%; height: 100%;');
      canvas.height = element.clientHeight;
      canvas.width = element.clientWidth;
      element.appendChild(canvas);
      return canvas;
    }
    return element as HTMLCanvasElement;
  }

  // TODO: 渲染
  render(frame: IFrame | undefined) {
    if (frame) this.renderer.render(frame);
  }

  // TODO: 销毁
  destroy(): void {
    this.renderer.destroy();
  }
}
