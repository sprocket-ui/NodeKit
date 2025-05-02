/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { assert } from '@ember/debug';
import Component from "@glimmer/component";
import { TabsOrientationValues, TabsDirectionValues } from "./types.ts";

import type { ComponentLike } from '@glint/template';
import type { TabsListSignature } from './list/index.ts';
import type { TabsContentSignature } from "./content/types.ts";
import type { TabsOrientations, TabsDirections } from "./types.ts";

export const DEFAULT_DIRECTION: TabsDirections = TabsDirectionValues.LTR as const;
export const DEFAULT_ORIENTATION: TabsOrientations = TabsOrientationValues.Horizontal as const;

export const AVAILABLE_DIRECTIONS: string[] = Object.values(TabsDirectionValues);
export const AVAILABLE_ORIENTATIONS: string[] = Object.values(TabsOrientationValues);

export interface TabsSignature {
  Args: {
    dir?: TabsDirections;
    defaultIndex?: number;
    defaultValue?: unknown;
    orientation?: TabsOrientations;
  };
  Blocks: {
    default: [
      List: ComponentLike<TabsListSignature>,
      Content: ComponentLike<TabsContentSignature>
    ]
  }
}

export default class Tabs<T extends TabsSignature = TabsSignature> extends Component<T> {
  protected _componentName = "Tabs";

  get orientation(): TabsOrientations {
    const { orientation = DEFAULT_ORIENTATION } = this.args;

    assert(
      `@orientation for "${this._componentName}" must be one of the following: ${AVAILABLE_ORIENTATIONS.join(
        ', '
      )}; received: ${orientation}`,
      AVAILABLE_ORIENTATIONS.includes(orientation)
    );

    return orientation;
  }

  get direction(): TabsDirections {
    const { dir = DEFAULT_DIRECTION } = this.args;

    assert(
      `@dir for "${this._componentName}" must be one of the following: ${AVAILABLE_DIRECTIONS.join(
        ', '
      )}; received: ${dir}`,
      AVAILABLE_DIRECTIONS.includes(dir)
    );

    return dir;
  }
}