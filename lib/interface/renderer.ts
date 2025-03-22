import { FrameSource } from './frame';

// TODO: 渲染器类型
export type RendererType = 'webgl' | 'canvas';

// TODO: 填充方式
export type RendererFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

// TODO: 渲染器接口
export interface IRenderer {
  // TODO: 销毁
  destroy(): void;

  // TODO: 渲染
  render(ctx: FrameSource): void;

  // TODO: 更新
  update(width: number, height: number): void;

  // TODO: 初始化
  init(canvas: HTMLCanvasElement): Promise<void>;
}

// TODO: 渲染器配置
export interface RendererOptions {
  fit: RendererFit;
  type: RendererType;
  //
  width: number;
  height: number;
  background: string;
}
