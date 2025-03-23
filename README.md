# Sequence Frame

> 简单序列帧动画的实现

## 渲染器
  [x] canvas2D

## 帧实现
  [x] MultipleFrames 多图片路径实现

## 使用示例
``` typescript
import { Sequence, MultipleFrames } from '../lib';

const frame = new MultipleFrames(Array.from(new Array(514)).map((_, index) => {
  return `/image/sequence_${index + 1}.jpg`;
}), { framesRate: 60 });

const sequence = new Sequence('#loop .canvas', frame, { loop: true, limit: 10 });

const button = document.querySelector('#sequence button')!;

sequence.on('progress', progress => {
  console.log('[loop]: progress -> %s', JSON.stringify(progress));
});

sequence.on('complete', () => {
  button.removeAttribute('disabled');
});

sequence.load();

button.addEventListener('click', () => {
  if (sequence.isPlay) {
    sequence.pause();
  } else {
    sequence.play();
  }
});
```
