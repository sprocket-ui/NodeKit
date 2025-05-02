/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { assert } from "@ember/debug";
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { ExcludedButtonAsElementValues } from "./types.ts";

import type Owner from '@ember/owner';
import type { ButtonAsElements } from "./types.ts";

export interface ButtonSignature {
  Args: {
    href?: string;
    route?: string;
    disabled?: boolean;
    as?: ButtonAsElements;
    tagName?: ButtonAsElements;
  };
  Blocks: {
    default: []
  },
  Element: HTMLElementTagNameMap[ButtonAsElements];
};

export const EXCLUDED_AS_ELEMENTS: string[] = Object.values(ExcludedButtonAsElementValues);

export default class Button<T extends ButtonSignature = ButtonSignature> extends Component<T> {
  protected _componentName = 'Button';
  private _id = `__PACKAGE_NAME__-${guidFor(this)}`;

  @tracked buttonState: string[] = [];

  constructor(owner: Owner, args: ButtonSignature['Args']) {
    super(owner, args);

    assert(
      `@href and @route for "Button" cannot be set at the same time.`,
      !(args.href && args.route)
    );
  }

  get sprocketState(): string {
    return this.buttonState.join(' ');
  }

  get as(): ButtonAsElements | undefined {
    const { as } = this.args;

    assert(
      `@as for "${this._componentName}" can't include any of the following elements ${EXCLUDED_AS_ELEMENTS.join(
        ', '
      )}; received: ${as}`,
      !EXCLUDED_AS_ELEMENTS.includes(as as string)
    );

    return as;
  }

  private updateState(
    element: HTMLElement,
    state: string,
    add: boolean,
    attribute?: string
  ) {
    if (add) {
      if (!this.buttonState.includes(state)) {
        this.buttonState = [...this.buttonState, state];
      }
      if (attribute) {
        element.setAttribute(attribute, 'true');
      }
    } else {
      this.buttonState = this.buttonState.filter((s) => s !== state);
      if (attribute) {
        element.removeAttribute(attribute);
      }
    }
  }

  @action
  onMouseDown(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!this.args.disabled) {
      this.updateState(element, 'active', true, 'data-active');
    }
  }

  @action
  onMouseUp(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!this.args.disabled) {
      this.updateState(element, 'active', false, 'data-active');
    }
  }

  @action
  onMouseEnter(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!this.args.disabled) {
      this.updateState(element, 'hovered', true, 'data-hovered');
    }
  }

  @action
  onMouseLeave(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!this.args.disabled) {
      this.updateState(element, 'hovered', false, 'data-hovered');
      this.updateState(element, 'active', false, 'data-active');
    }
  }

  @action
  onFocusIn(event: FocusEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!this.args.disabled) {
      this.updateState(element, 'focus', true, 'data-focused');
    }
  }

  @action
  onFocusOut(event: FocusEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!this.args.disabled) {
      this.updateState(element, 'focus', false, 'data-focused');
    }
  }
}