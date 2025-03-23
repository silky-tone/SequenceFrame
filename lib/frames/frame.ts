// frames/frame.ts;
import { IFrame } from '../interface';

// TODO: 帧
export class Frame implements IFrame {
  private readonly file: File;

  constructor(file: File) {
    this.file = file;
  }

  // TODO: 获取图片位图
  toImageBitmap() {
    return createImageBitmap(this.file);
  }
}
