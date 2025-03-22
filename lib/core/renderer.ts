import { IRenderer, RendererOptions, RendererType } from '../interface';
import { CanvasRenderer, WebGLRenderer } from '../renderer';
import { isString, mergeObject } from '../utils';

const opt = {
  width: 0,
  height: 0,
  fit: 'contain',
  type: 'canvas',
  background: '#000',
};

export class Renderer {
  private renderer: IRenderer;
  private readonly root: HTMLCanvasElement;

  constructor(element: HTMLElement | HTMLCanvasElement | string, options?: Partial<RendererOptions>) {
    const { type, width, height, background } = mergeObject(opt, options || {});
    this.renderer = this.getRenderer(type);
    this.root = this.getCanvas(element);
    //
  }

  private getRenderer(type: RendererType): IRenderer {
    const renderer = ({
      webgl: WebGLRenderer,
      canvas: CanvasRenderer,
    })[type];
    if (!renderer) throw new Error('Unsupported renderer type');
    //
    return (new renderer()) as IRenderer;
  }

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
      canvas.height = element.offsetHeight;
      canvas.width = element.offsetWidth;
      element.appendChild(canvas);
      return canvas;
    }
    return element as HTMLCanvasElement;
  }
}
