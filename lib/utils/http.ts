// utils/http.ts;
// TODO: 进度回调
export type onProgress = (progress: number, count: number, length: number) => void;

// TODO: fetch 获取进度
export async function fetchProgress(src: string, onProgress?: onProgress): Promise<File> {
  const http = await fetch(src, {
    headers: { 'accept': 'image/*, */*;' },
  });
  //
  if (!http.ok) return Promise.reject(new Error(`Failed to load image: ${src}`));
  if (!http.body) return Promise.reject(new Error(`Failed to load image: ${src}`));
  const reader = http.body.getReader();
  const length = +(http.headers.get('content-length') || 0);
  const type = http.headers.get('content-type') || '';
  const chunks = [];
  let count = 0;

  // TODO: 读取数据
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    count += value.length;
    if (length > 0 && onProgress) {
      onProgress((count / length) * 100, count, length);
    }
  }

  // TODO: 创建 buffer
  const buffer = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }

  // TODO: 创建 File
  return new File([buffer], src, { type });
}

// TODO: xml 获取进度
export function xmlProgress(src: string, onProgress?: onProgress): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader('Accept', 'image/*, */*;');

    // TODO: 进度
    xhr.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(event.loaded / event.total * 100, event.loaded, event.total);
      }
    });

    // TODO: 加载完成
    xhr.addEventListener('load', () => {
      const type = xhr.getResponseHeader('Content-Type') || '';
      if (xhr.status === 200) {
        // TODO: 成功
        resolve(new File([xhr.response], src, { type }));
      } else {
        // TODO: 失败
        reject(new Error(`Failed to load image: ${src}`));
      }
    });

    xhr.send();
  });
}

// TODO: 简单实现请求 获取进度
export function easyHttp(src: string, onProgress?: onProgress): Promise<File> {
  if ('fetch' in window) return fetchProgress(src, onProgress);
  return xmlProgress(src, onProgress);
}
