<label class="{rootClass}" style={rootStyle}>
    <span class:sr-only={hideLabel} class="opacity-80 text-[0.6] {labelClass}" style={labelStyle}>
        {label}
    </span>
    <div
        class="relative border border-white border-opacity-10 bg-white bg-opacity-5 rounded p-2 focus-within:ring-2 focus-within:ring-sky-400 flex gap-1 justify-center items-center w-full {wrapperClass}" style={wrapperStyle}
        style:--drop-down-bg-hsl="200 9% 20%"
        style:--drop-down-bg="hsl(var(--drop-down-bg-hsl))"
        class:input-error={Boolean(error)}
    >
        <slot name="start"></slot>
        <div class="flex-grow relative">
            <textarea
                class="border-0 bg-transparent w-full !ring-0 resize-none {className}"
                placeholder={placeholder ?? label}
                {style} 
                value={inputValue}
                on:input={debounceTime ? onInputEventDebounced : onInputEvent}
                on:keydown on:keypress on:keyup
                on:focusout={onFocusOut}
                bind:this={inputRef}
                {...$$restProps}
                spellcheck="{spellcheck}"
                {rows}
                {cols}
            />
        </div>
        <slot name="end"></slot>
        
    </div>
    {#if Boolean(error)}
        <p class="text-[0.7em] text-rose-400 mt-1">{error}</p>
    {:else if Boolean(hint)}
        <p class="text-[0.7em] text-white opacity-40 mt-1">Hint: {hint}</p>
    {/if}
</label>

<script lang="ts">
	import { browser } from '$app/environment';
    import { useDebounce } from '@svelteuidev/composables';
    import { createEventDispatcher, tick } from 'svelte';

    export let className: string = '';
    export let placeholder: string|undefined = undefined;
    export let value: string = '';
    export let style: string = '';
    export let label: string = '';
    export let wrapperClass: string = '';
    export let wrapperStyle: string = '';
    export let rootClass: string = '';
    export let rootStyle: string = '';
    export let debounceTime: number|undefined = undefined;
    export let hideLabel = false;
    export { className as class };
    export let labelClass = '';
    export let labelStyle = '';
    export let error: string = '';
    export let hint: string = '';
    export let spellcheck: boolean = false;
    export let rows: number|undefined = undefined;
    export let cols: number|undefined = undefined;
    
    let inputRef: HTMLTextAreaElement;

    let inputValue: string = '';

    $: {
        inputValue = value;
    }

    const dispatch = createEventDispatcher<{
        input: InputEvent;
    }>();

    function onInputEvent(e: Event & { currentTarget: HTMLTextAreaElement & EventTarget }) {
        if (e instanceof InputEvent) {
            value = (e.target as any).value;
            inputValue = value;
            dispatch('input', e);
        } else if (e.currentTarget instanceof HTMLInputElement) {
            inputValue = e.currentTarget.value;
            value = inputValue;
        }
        error = '';
    }

    const onInputEventDebounced = useDebounce(onInputEvent, debounceTime);

    function onFocusOut(e: FocusEvent) {
        const target = e.target as HTMLInputElement;
        if (!(target instanceof HTMLInputElement)) return;
        if (!target.checkValidity()) error = target.validationMessage;
    }

</script>

<style lang="postcss" scoped>

    .input-error {
        @apply ring-2 ring-rose-400;
    }
    
    .input-error:focus-within {
        @apply ring-2 ring-rose-500;
    }

</style>