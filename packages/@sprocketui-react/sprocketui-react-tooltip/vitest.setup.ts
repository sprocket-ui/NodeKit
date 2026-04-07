// biome-ignore-all assist/source/organizeImports: No need to sort imports.
// biome-ignore-all lint/suspicious/noExplicitAny: Explicit any is okay here.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'node:util';

(globalThis as any).TextDecoder = NodeTextDecoder;

class RealmTextEncoder {
	private node: TextEncoder = new NodeTextEncoder();

	encode(input = ''): Uint8Array {
		const nodeBuf: Uint8Array<ArrayBufferLike> = this.node.encode(input);
		const RealmUint8 = (globalThis as any).Uint8Array as typeof Uint8Array;
		const out = new RealmUint8(nodeBuf.length);
		out.set(nodeBuf);
		return out;
	}

	encodeInto(input: string, dest: Uint8Array) {
		const nodeBuf: Uint8Array<ArrayBufferLike> = this.node.encode(input);
		const written: number = Math.min(nodeBuf.length, dest.length);
		dest.set(nodeBuf.subarray(0, written) as any, 0);
		return { read: input.length, written };
	}
}

(globalThis as any).TextEncoder = RealmTextEncoder;

if (typeof Element !== 'undefined') {
	Element.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
		return {
			x: 0,
			y: 0,
			top: 0,
			left: 0,
			right: 100,
			bottom: 30,
			width: 100,
			height: 30,
			toJSON(): DOMRect {
				return this;
			}
		} as DOMRect;
	};
}
