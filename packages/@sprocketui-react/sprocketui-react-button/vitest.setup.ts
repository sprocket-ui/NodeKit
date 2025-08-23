export {};
import { TextEncoder as NodeTE, TextDecoder as NodeTD } from 'node:util';

(globalThis as any).TextDecoder = NodeTD;
(globalThis as any).TextEncoder = class {
  private enc = new NodeTE();
  encode(s = '') {
    const b = this.enc.encode(s);
    const Out = (globalThis as any).Uint8Array as typeof Uint8Array;
    const o = new Out(b.length);
    o.set(b);
    return o;
  }
  encodeInto(s: string, d: Uint8Array) {
    const b = this.enc.encode(s);
    const n = Math.min(b.length, d.length);
    d.set(b.subarray(0, n) as any, 0);
    return { read: s.length, written: n };
  }
};