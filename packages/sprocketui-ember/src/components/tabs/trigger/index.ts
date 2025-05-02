import Button from "../../button/index.ts";

import type { ButtonSignature } from "../../button/index.ts";
import type { ButtonAsElements } from "../../button/types.ts";

export interface TabsTriggerSignature {
  Args: ButtonSignature['Args'] & {

  };
  Blocks: {
    default: []
  };
  Element: HTMLElementTagNameMap[ButtonAsElements];
}

export default class TabsTrigger extends Button<TabsTriggerSignature> {

}