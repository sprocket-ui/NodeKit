/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export enum ExcludedButtonAsElementValues {
  Img = 'img',
  Iframe = 'iframe',
  Audio = 'audio',
  Video = 'video',
  Svg = 'svg',
  Canvas = 'canvas',
  Html = 'html',
  Head = 'head',
  Body = 'body',
  Meta = 'meta',
  Title = 'title',
  Style = 'style',
  Link = 'link',
  Script = 'script',
  Base = 'base',
  Br = 'br',
  Hr = 'hr',
  Param = 'param',
  Source = 'source',
  Track = 'track',
  Col = 'col',
  Colgroup = 'colgroup',
  Noscript = 'noscript',
  Embed = 'embed',
  Object = 'object',
}

export type ExcludedButtonAsElements = `${ExcludedButtonAsElementValues}`;

export type ButtonAsElements = Exclude<keyof HTMLElementTagNameMap, ExcludedButtonAsElements>;