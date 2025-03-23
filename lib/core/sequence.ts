// core/sequence.ts;
import { Animation, EventListener, Listener } from '../lib';
import { IFrames, SequenceOptions } from '../interface';
import { getTime, mergeObject } from '../utils';
import { Renderer } from './renderer.ts';

const opt = {
  limit: 0,
  fit: 'contain',
  type: 'canvas',
};

// TODO: 序列帧事件
export type SequenceKey = 'FPS' | 'RealTimeFPS' | 'complete' | 'progress'

// TODO: 序列帧
export class Sequence {
  private readonly frames: IFrames;
  private readonly renderer: Renderer;
  private readonly animation: Animation;
  private readonly options: SequenceOptions;
  private readonly listener: Listener = new Listener();
  //
  private __isPlay: boolean = false;
  private status: 'complete' | 'load' = 'load';
  //
  private currentFrame: number = 0;

  // TODO: 播放状态
  get isPlay() {
    return this['__isPlay'];
  }

  // TODO: 当前时间
  get currentTime(): number {
    return Math.floor(this.currentFrame * this.frames.frameTime);
  }

  // TODO: 时长
  get duration(): number {
    return this.frames.endTime;
  }

  // TODO: 进度
  get progress(): number {
    return this.currentTime / this.duration;
  }

  // TODO: 进度
  set progress(value: number) {
    const val = Math.min(Math.max(value, 0), this.duration);
    this.currentFrame = Math.floor(val / this.frames.frameTime);
  }

  constructor(element: HTMLCanvasElement | HTMLElement | string, frames: IFrames, options?: Partial<SequenceOptions>) {
    this.options = mergeObject(opt, options || {}) as SequenceOptions;
    this.renderer = new Renderer(element, this.options);
    this.animation = new Animation(this.options.limit);
    this.frames = frames;
    this.initialize();
  }

  // TODO: 初始化
  private initialize() {
    this.frames.on('complete', () => {
      if (this.options.autoplay) {
        this.play();
      }
      this.status = 'complete';
      this.listener.emit('complete', undefined);
    });

    // TODO: 帧率
    this.animation.on('FPS', fps => {
      this.listener.emit('FPS', fps);
    });

    // TODO: 实时帧率
    this.animation.on('RealTimeFPS', fps => {
      this.listener.emit('RealTimeFPS', fps);
    });
  }

  // TODO: 渲染当前帧
  private renderCurrentFrame() {
    this.listener.emit('progress', { time: this.currentTime, frame: this.currentFrame });
    //
    const frame = this.frames.getFrame(this.currentFrame);
    if (frame) this.renderer.render(frame);
  }

  // TODO: 加载
  load() {
    this.frames.load();
  }

  // TODO: 播放
  play() {
    if (this.status !== 'complete') {
      throw new Error('Can not play, please load first.');
    }
    if (this.isPlay) return;
    this.__isPlay = true;
    //
    const now = getTime();
    const lastTime = this.currentTime;
    const { endTime, frameTime } = this.frames;

    // TODO: 帧动画
    this.animation.run(() => {
      if (!this.isPlay) return;

      // TODO: 帧计算
      const elapsed = (getTime() - now) + lastTime;
      const currentTime = this.options.loop ? elapsed % endTime : Math.min(elapsed, endTime);
      const targetFrame = Math.floor(currentTime / frameTime);

      // TODO: 渲染帧
      if (targetFrame !== this.currentFrame) {
        this.currentFrame = targetFrame;
        this.renderCurrentFrame();
      }

      // TODO: 循环检测
      if (!this.options.loop && elapsed >= endTime) {
        this.stop();
        return;
      }
    });
  }

  // TODO: 暂停
  pause() {
    this.animation.stop();
    this.__isPlay = false;
  }

  // TODO: 停止
  stop() {
    this.pause();
    this.currentFrame = 0;
  }

  // TODO: 销毁
  destroy() {
    this.stop();
    this.status = 'load';
    //
    this.frames.destroy();
    this.listener.clear();
    this.renderer.destroy();
  }

  on(key: SequenceKey, listener: EventListener<any>) {
    this.listener.on(key, listener);
  }

  off(key: SequenceKey, listener: EventListener<any>) {
    this.listener.off(key, listener);
  }

  once(key: SequenceKey, listener: EventListener<any>) {
    this.listener.once(key, listener);
  }
}
