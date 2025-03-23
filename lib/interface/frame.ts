// interface/frame.ts;
import { EventListener } from '../lib/listener';

// TODO: 帧监听类型
export type FramesListenerType = 'load' | 'complete' | 'error';

// TODO: 帧接口
export interface IFrame {
  toImageBitmap(): Promise<ImageBitmap>;
}

// TODO: 帧类型
export interface IFrames {
  // TODO: 帧数
  get length(): number;

// TODO: 结束时间
  get endTime(): number;

  // TODO: 帧时长
  get frameTime(): number;

  // TODO: 加载
  load(): Promise<void> | void;

  // TODO: 获取帧
  getFrame(index: number): IFrame | undefined;

  // TODO: 销毁
  destroy(): void;

  // TODO: 监听
  on(keys: FramesListenerType, listener: EventListener<any>): void;

  off(keys: FramesListenerType, listener: EventListener<any>): void;

  once(keys: FramesListenerType, listener: EventListener<any>): void;
}
