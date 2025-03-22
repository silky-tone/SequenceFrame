import { IRenderer } from '../interface';

// WebGL渲染器实现
export class WebGLRenderer implements IRenderer {
  // private gl!: WebGLRenderingContext;
  // private program!: WebGLProgram;
  // private texture!: WebGLTexture;
  //
  // async init(canvas: HTMLCanvasElement) {
  //   const gl = canvas.getContext('webgl');
  //   if (!gl) throw new Error('WebGL not supported');
  //
  //   this.gl = gl;
  //   this.program = this.createProgram();
  //   this.texture = gl.createTexture()!;
  //
  //   gl.useProgram(this.program);
  //   this.initBuffers();
  // }
  //
  // private createProgram(): WebGLProgram {
  //   // 顶点着色器
  //   const vsSource = `
  //     attribute vec4 aVertexPosition;
  //     varying vec2 vTexCoord;
  //     void main() {
  //       gl_Position = aVertexPosition;
  //       vTexCoord = aVertexPosition.xy * 0.5 + 0.5;
  //     }
  //   `;
  //
  //   // 片段着色器
  //   const fsSource = `
  //     precision mediump float;
  //     varying vec2 vTexCoord;
  //     uniform sampler2D uSampler;
  //     void main() {
  //       gl_FragColor = texture2D(uSampler, vTexCoord);
  //     }
  //   `;
  //
  //   const program = this.gl.createProgram()!;
  //   const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vsSource);
  //   const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fsSource);
  //
  //   this.gl.attachShader(program, vertexShader);
  //   this.gl.attachShader(program, fragmentShader);
  //   this.gl.linkProgram(program);
  //
  //   if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
  //     throw new Error('Shader program link error');
  //   }
  //
  //   return program;
  // }
  //
  // private compileShader(type: number, source: string): WebGLShader {
  //   const shader = this.gl.createShader(type)!;
  //   this.gl.shaderSource(shader, source);
  //   this.gl.compileShader(shader);
  //
  //   if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
  //     throw new Error(`Shader compile error: ${this.gl.getShaderInfoLog(shader)}`);
  //   }
  //
  //   return shader;
  // }
  //
  // private initBuffers() {
  //   const vertices = new Float32Array([
  //     -1, -1, 1, -1, -1, 1,
  //     1, -1, 1, 1, -1, 1,
  //   ]);
  //
  //   const buffer = this.gl.createBuffer();
  //   this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  //   this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
  //
  //   const positionLocation = this.gl.getAttribLocation(this.program, 'aVertexPosition');
  //   this.gl.enableVertexAttribArray(positionLocation);
  //   this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  // }
  //
  // render(frame: ImageBitmap) {
  //   const gl = this.gl;
  //
  //   gl.bindTexture(gl.TEXTURE_2D, this.texture);
  //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frame);
  //
  //   gl.drawArrays(gl.TRIANGLES, 0, 6);
  // }
  //
  // resize(width: number, height: number) {
  //   this.gl.viewport(0, 0, width, height);
  // }
  //
  // destroy() {
  //   this.gl.deleteProgram(this.program);
  //   this.gl.deleteTexture(this.texture);
  // }
}

// 渲染器工厂
// class RendererFactory {
//   static async create(
//     type: RendererType,
//     canvas: HTMLCanvasElement,
//   ): Promise<IRenderer> {
//     let renderer: IRenderer;
//
//     switch (type) {
//       case 'webgl':
//         renderer = new WebGLRenderer();
//         break;
//       case 'canvas2d':
//         renderer = new Canvas2DRenderer();
//         break;
//       default:
//         throw new Error('Unsupported renderer type');
//     }
//
//     await renderer.init(canvas);
//     return renderer;
//   }
// }
