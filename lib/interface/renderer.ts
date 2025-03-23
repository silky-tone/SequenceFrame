// interface/renderer.ts;
import { IFrame } from './frame.ts';

// TODO: 渲染器类型
export type RendererType = 'canvas';

// TODO: 填充方式
export type RendererFit = 'contain' | 'cover' | 'fill';

// TODO: 渲染器接口
export interface IRenderer {
  // TODO: 渲染
  render(frame: IFrame): void;

  // TODO: 销毁
  destroy(): void;
}

// TODO: 渲染器配置
export interface RendererOptions {
  fit: RendererFit;
  type: RendererType;
  renderer: IRenderer | undefined;
}
