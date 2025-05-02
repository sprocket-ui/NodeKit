/**
 * Copyright (c) Corinvo, LLC. partners, authors and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { 
    ref,
    watch,
    inject,
    Fragment,
    computed,
    onMounted,
    defineComponent,
    type Ref, 
    type InjectionKey,
    type SetupContext
} from 'vue';

import { useID } from '../../hooks/use-id';

type StateDefinition = {
    switchRef: Ref<HTMLElement | null>;
    labelledby: Ref<string | undefined>
    describedby: Ref<string | undefined>
}

let GroupContext = Symbol('GroupContext') as InjectionKey<StateDefinition>;

export let Switch = defineComponent({
    name: 'Switch',
    emits: { 'update:modelValue': (_value: boolean) => true },
    props: {
        as: { 
            type: [Object, String], 
            default: 'button' 
        },
        modelValue: { 
            type: Boolean, 
            default: undefined 
        },
        defaultChecked: { 
            type: Boolean, 
            optional: true, 
            default: undefined 
        },
        form: {
            type: String,
            optional: true,
            default: undefined
        },
        name: {
            type: String,
            optional: true,
            default: undefined
        },
        value: {
            type: String,
            optional: true,
            default: undefined
        },
        id: {
            type: String,
            default: () => `sprocketui-switch-${useID()}` 
        },
    },
    inheritAttrs: false,      
    setup(props: any, { emit, attrs, slots, expose }: SetupContext) {
        let api = inject(GroupContext, null);
        let [checked, theirOnChange] = useControllable(
            computed(() => props.modelValue),
            (value: boolean) => emit('update:modelValue', value),
            computed(() => props.defaultChecked)
        );

        function toggle() {
            theirOnChange(!checked.value)
        }

        let internalSwitchRef = ref<HTMLButtonElement | null>(null);
        let switchRef = api === null ? internalSwitchRef : api.switchRef;
        let type = useResolveButtonType(
            computed(() => ({ as: props.as, type: attrs.type })),
            switchRef
        );

        expose({ el: switchRef, $el: switchRef });

        function handleClick(event: MouseEvent) {
            event.preventDefault()
            toggle()
          }
      
        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === Keys.Space) {
                event.preventDefault()
                toggle()
            } else if (event.key === Keys.Enter) {
                attemptSubmit(event.currentTarget as HTMLElement)
            }
        }

        function handleKeyPress(event: KeyboardEvent) {
            event.preventDefault()
          }
      
        let form = computed(() => dom(switchRef)?.closest?.('form'))
        onMounted(() => {
            watch(
                [form],
                () => {
                if (!form.value) return
                if (props.defaultChecked === undefined) return
        
                function handle() {
                    theirOnChange(props.defaultChecked)
                }
        
                form.value.addEventListener('reset', handle)
                return () => {
                    form.value?.removeEventListener('reset', handle)
                }
                },
                { immediate: true }
            )
          })

        return () => {
            let { id, name, value, form, tabIndex, ...theirProps } = props
            let slot = { checked: checked.value }
            let ourProps = {
                id,
                ref: switchRef,
                role: 'switch',
                type: type.value,
                tabIndex: tabIndex === -1 ? 0 : tabIndex,
                'aria-checked': checked.value,
                'aria-labelledby': api?.labelledby.value,
                'aria-describedby': api?.describedby.value,
                onClick: handleClick,
                onKeyup: handleKeyUp,
                onKeypress: handleKeyPress,
            }

            return (
                <Fragment>
                    {name != null && checked.value != null ? (
                        <Hidden
                            features={ HiddenFeatures.Hidden }
                            as="input"
                            type="checkbox"
                            hidden={ true }
                            readOnly={ true }
                            checked={ checked.value }
                            form={ form }
                            disabled={ theirProps.disabled }
                            name={ name }
                            value={
                                compact({
                                    features: HiddenFeatures.Hidden,
                                    as: 'input',
                                    type: 'checkbox',
                                    hidden: true,
                                    readOnly: true,
                                    checked: checked.value,
                                    form,
                                    disabled: theirProps.disabled,
                                    name,
                                    value,
                                })
                            }
                        />
                        ) : null
                    }
                    {
                        render({
                            ourProps,
                            theirProps: { ...attrs, ...omit(theirProps, ['modelValue', 'defaultChecked']) },
                            slot,
                            attrs,
                            slots,
                            name: 'Switch',
                        })
                    }
                </Fragment>
            )
        }
    }
});
