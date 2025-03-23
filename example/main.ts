import { Sequence, MultipleFrames } from '../lib';

const startList = Array.from(new Array(379)).map((_, index) => {
  return `/image/start/start (${index + 1}).jpg`;
});

const loopList = Array.from(new Array(514)).map((_, index) => {
  return `/image/loop/loop (${index + 1}).jpg`;
});

const frame_loop = new MultipleFrames(loopList, { framesRate: 60 });
const frame_start = new MultipleFrames(startList, { framesRate: 60 });
//
const sequence_start = new Sequence('#start .canvas', frame_start, { limit: 30 });
const sequence_loop = new Sequence('#loop .canvas', frame_loop, { loop: true, limit: 10 });

// start
sequence_start.on('complete', () => {
  sequence_start.play();
});
sequence_start.load();

// loop
const button = document.querySelector('#loop button')!;

sequence_loop.on('progress', progress => {
  console.log('[loop]: progress -> %s', JSON.stringify(progress));
});

sequence_loop.on('complete', () => {
  button.removeAttribute('disabled');
});

sequence_loop.load();

button.addEventListener('click', () => {
  if (sequence_loop.isPlay) {
    sequence_loop.pause();
  } else {
    sequence_loop.play();
  }
});
