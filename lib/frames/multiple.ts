// frames/multiple.ts;
import { FramesListenerType, IFrame, IFrames } from '../interface';
import { Listener, EventListener } from '../lib';
import { easyHttp, mergeObject } from '../utils';
import { Frame } from './frame.ts';

export interface MultipleFramesOptions {
  framesRate: number; // TODO: 1s 多少帧
}

export class MultipleFrames implements IFrames {
  private readonly listener: Listener = new Listener();
  private options: MultipleFramesOptions;
  private readonly urls: string[];

  public status: '' | 'load' | 'complete' = '';
  public readonly frames: (IFrame | undefined)[] = [];

  // TODO: 帧数
  get length(): number {
    return this.urls.length;
  }

  // TODO: 帧时长
  get frameTime(): number {
    return 1000 / this.options.framesRate;
  }

  // TODO: 结束时间
  get endTime(): number {
    return this.frameTime * this.length;
  }

  constructor(urls: string[], options?: Partial<MultipleFramesOptions>) {
    this.options = mergeObject({}, options || {}) as MultipleFramesOptions;
    this.frames = [];
    this.urls = urls;
  }

  // TODO: 加载
  async load(): Promise<void> {
    this.status = 'load';
    let count = 0;
    this.listener.emit('load', undefined);
    const total = this.urls.length;

    // TODO: 获取图片
    for (const [index, url] of Object.entries(this.urls)) {
      try {
        if (!this.frames[+index]) {
          this.frames[+index] = new Frame(await easyHttp(url));
        }
        count++;
        this.listener.emit('progress', { progress: (count / total) * 100, count, total });
      } catch (error) {
        this.frames.push(undefined);
        this.listener.emit(`error`, { index, error });
      }
    }

    // TODO: 加载完成
    this.status = 'complete';
    this.listener.emit('complete', { progress: (count / total) * 100, count, total });
  }

  // TODO: 获取帧
  getFrame(index: number): IFrame | undefined {
    return this.frames[index];
  }

  destroy(): void {
    this.listener.clear();
  }

  on(keys: FramesListenerType, listener: EventListener<any>): void {
    this.listener.on(keys, listener);
  }

  off(keys: FramesListenerType, listener: EventListener<any>): void {
    this.listener.off(keys, listener);
  }

  once(keys: FramesListenerType, listener: EventListener<any>): void {
    this.listener.once(keys, listener);
  }
}
