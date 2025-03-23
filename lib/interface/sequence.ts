// interface/sequence.ts;
import { RendererOptions } from './renderer.ts';

// TODO: 播放序列帧配置
export interface SequenceOptions extends RendererOptions {
  limit: number;
  loop: boolean;
  autoplay: boolean;
}
