/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Component from "@glimmer/component";

import type { ComponentLike } from '@glint/template';
import type { TabsTriggerSignature } from "../trigger/index.ts";

export interface TabsListSignature {
  Args:{
    loop?: boolean;
  };
  Blocks: {
    default: [
      Trigger: ComponentLike<TabsTriggerSignature>,
    ];
  };
  Element: HTMLElement;
};

export default class TabsList extends Component<TabsListSignature> {

};