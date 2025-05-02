/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Component from "@glimmer/component";

export interface TabsContentSignature {
  Args: {

  };
  Blocks: {
    default: [
      {
        isVisible?: boolean;
      }
    ]
  };
  Element: HTMLElement;
}

export default class TabsContent extends Component<TabsContentSignature> {
  protected _componentName = "Tabs::Content";
}