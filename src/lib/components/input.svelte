<label class="{rootClass}" style={rootStyle}>
    <span class:sr-only={isSearchEnabled || hideLabel} class="opacity-80 text-[0.6] {labelClass}" style={labelStyle}>
        {label}
    </span>
    <div
        class="relative border border-white border-opacity-10 bg-white bg-opacity-5 rounded-full p-2 px-5 focus-within:ring-2 focus-within:ring-sky-400 flex gap-1 justify-center items-center w-full {wrapperClass}" style={wrapperStyle}
        style:--drop-down-bg-hsl="200 9% 20%"
        style:--drop-down-bg="hsl(var(--drop-down-bg-hsl))"
        class:input-error={Boolean(error)}
    >
        <slot name="start"></slot>
        <div class="flex-grow relative">
            <input
                type={type}
                class="border-0 bg-transparent w-full outline-none !ring-0 {className}"
                placeholder={placeholder ?? label}
                {style} 
                value={inputValue}
                on:input={debounceTime ? onInputEventDebounced : onInputEvent}
                on:focusout={onFocusOut}
                bind:this={inputRef}
                min={min}
                max={max}
                step={step}
                {...$$restProps}
                on:keydown
                on:keypress
                on:keyup
                on:keyup={onKeyUp}
            />
            {#if isSearchEnabled && (suggestedWordIndex >= 0 && suggestions.length > suggestedWordIndex)}
                <span class="absolute left-0 opacity-40">{suggestions[suggestedWordIndex]}</span>
            {/if}
        </div>
        <slot name="end"></slot>
        {#if (type === 'number') && (step !== 'any')}
            <div class="flex text-[0.4em] flex-col" tabindex="-1">
                <button
                    class="bg-white bg-opacity-20 px-1 active:bg-opacity-5 rounded-t border-b border-black border-opacity-30"
                    on:click={() => inputStepX('up')}
                >
                    &#x25B2;
                </button>
                <button
                    class="bg-white bg-opacity-20 px-1 active:bg-opacity-5 rounded-b"
                    on:click={() => inputStepX('down')}
                >
                    &#x25BC;
                </button>
            </div>
        {/if}
        {#if shouldShowDropDown(isSearchEnabled, suggestions, inputValue)}
            <ul
                class="drop-down"
                role="listbox"
                aria-expanded="true"
                style:border-color="hsl(0 0% 100% / 0.12)"
                in:fade={{ duration: 150 }}
                on:mouseleave={() => setHoveredIndex(-1)}
            >
                {#each suggestions as suggestion, index (suggestion)}
                    <li
                        role="option"
                        aria-selected={index === currentHighlightIndex ? 'true' : 'false'}
                        class="drop-down-option"
                    >
                    <button
                        class="w-full h-full border-0 bg-transparent text-start focus-within:outline-0 !ring-0"
                        on:focus={() => setSuggestionIndex(index)}
                        on:mouseover={() => setHoveredIndex(index)}
                        on:click={() => onDropDownSelect(suggestion)}
                    >{suggestion}</button>
                </li>
                {/each}
            </ul>
        {/if}
    </div>
    {#if Boolean(error)}
        <p class="text-[0.7em] text-rose-400 mt-1">{error}</p>
    {:else if Boolean(hint)}
        <p class="text-[0.7em] text-white opacity-40 mt-1">Hint: {hint}</p>
    {/if}
</label>

<script lang="ts">
    import { fade } from 'svelte/transition';
	import { Trie } from './input';
    import { useDebounce } from '@svelteuidev/composables';
    import { createEventDispatcher } from 'svelte';

    type HTMLInputTypeAttribute =
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week'
        | (string & {});

    export let className: string = '';
    export let placeholder: string|undefined = undefined;
    export let value: string = '';
    export let style: string = '';
    export let label: string = '';
    export let wrapperClass: string = '';
    export let wrapperStyle: string = '';
    export let rootClass: string = '';
    export let rootStyle: string = '';
    export let searchItems: string[] = [];
    export let debounceTime: number|undefined = undefined;
    export let hideLabel = false;
    export { className as class };
    export let labelClass = '';
    export let labelStyle = '';
    export let type: HTMLInputTypeAttribute = 'text';
    export let error: string = '';
    export let min: string| number | null |undefined = undefined;
    export let max: string| number | null |undefined = undefined;
    export let step: string| number | null |undefined = undefined;
    export let hint: string = '';
    
    let inputRef: HTMLInputElement;

    let inputValue: string = '';

    $: {
        inputValue = value;
    }

    const dispatch = createEventDispatcher<{
        search: string;
        input: InputEvent;
    }>();

    $: searchTree = new Trie(searchItems);
    $: isSearchEnabled = searchItems.length > 0;
    
    let suggestions: string[] = [];
    let currentHighlightIndex: number = -1;
    let currentHoveredIndex: number = -1;

    function setSuggestionIndex(index: number) {
        currentHighlightIndex = index;
    }

    function setHoveredIndex(index: number) {
        currentHoveredIndex = index;
    }

    $: suggestedWordIndex = currentHoveredIndex >= 0 ? currentHoveredIndex : currentHighlightIndex;

    
    function shouldShowDropDown(isSearchEnabled: boolean, suggestions: string[], value: string) {
        if (!(isSearchEnabled && suggestions.length > 0)) return false;
        if (value === suggestions[0] && suggestions.length === 1) return false;
        return true;
    }

    const getSuggestions = useDebounce((value: string) => {
        if (value.length > 0) {
            suggestions = searchTree.getSuggestions(value);
        } else {
            suggestions = [];
        }
        currentHighlightIndex = -1;
    }, 500);

    $: {
        getSuggestions(inputValue);
    }

    function onDropDownSelect(suggestion: string) {
        inputValue = suggestion;
        suggestions = [];
        dispatch('search', suggestion);
    }
    
    function onInputEvent(e: Event & { currentTarget: HTMLInputElement & EventTarget }) {
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

    function onKeyUp(e: KeyboardEvent) {
        if (isSearchEnabled) {
            if (e.key === 'Enter') {
                const suggestion = suggestions[suggestedWordIndex];
                if (suggestion) {
                    onDropDownSelect(suggestion);
                } else {
                    dispatch('search', inputValue);
                }
                inputValue = '';
            }
        }
    }

    function onFocusOut(e: FocusEvent) {
        const target = e.target as HTMLInputElement;
        if (!(target instanceof HTMLInputElement)) return;
        if (!target.checkValidity()) error = target.validationMessage;
    }

    function inputStepX(type: 'up' | 'down') {
        if (inputRef !== document.activeElement) inputRef.focus();
        switch(type) {
            case 'up': inputRef.stepUp(); break;
            case 'down': inputRef.stepDown(); break;
        }
    }

</script>

<style lang="postcss" scoped>

    .drop-down-option {
        @apply px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-5;
        @apply border border-white border-opacity-10 rounded focus-within:ring-2 ring-sky-400;
    }

    .drop-down {
        @apply absolute left-[5%] top-full mt-2 w-[90%] bg-[var(--drop-down-bg)];
        @apply rounded max-h-40 z-50 border overflow-y-auto overflow-x-hidden px-1 py-2 flex flex-col gap-1;
    }

    .input-error {
        @apply ring-2 ring-rose-400;
    }
    
    .input-error:focus-within {
        @apply ring-2 ring-rose-500;
    }

    input[type="number"] {
    -webkit-appearance: textfield;
        -moz-appearance: textfield;
            appearance: textfield;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    }

</style>