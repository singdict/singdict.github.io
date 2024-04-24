<div
    class="rounded-full container-wrapper w-[20rem] {rootClass}"
    style={rootStyle}
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded={expanded}
    aria-controls={optionId}
    aria-labelledby={labelId}
    tabindex={disabled ? undefined : 0}
    class:pointer-events-none={disabled}
    class:opacity-50={disabled}
    on:click={onExpandClick}
    on:keydown={onKeyDownWrapperEvent}
    style:--drop-down-bg-hsl="200 9% 20%"
    style:--drop-down-bg="hsl(var(--drop-down-bg-hsl))"
    use:clickoutside={{ enabled: expanded, callback: onExpandClick }}
>
    <span id={labelId} class:sr-only={hideLabel} class="text-[0.8em] opacity-70 {labelClass}" style={labelStyle} >
        <slot name="label">{label}</slot>
    </span>
    <div
        class="grid h-[2.3rem] w-full items-center custom-select {className}"
        style="grid-template-columns: 1fr 1.75rem; {style}"
    >
        {#if selectedLabel}
            <div class="grid w-full" style="grid-template-columns: 1fr auto">
                <div class="w-full px-4 py-1 text-white text-ellipsis overflow-ellipsis whitespace-nowrap overflow-hidden {placeholderClass}" style={placeholderStyle}>
                    <slot name="prepend:label" />
                    {selectedLabel}
                    <slot name="append:label" />
                </div>
                {#if clearable}
                    <div class="flex items-center justify-center">
                        <button
                            class="p-1 mr-1 aspect-square rounded-full hover:bg-black hover:bg-opacity-20 active:bg-black active:bg-opacity-30"
                            on:click|stopPropagation={onClearClick}
                        >
                            <Cross1 size={18} />
                        </button>
                    </div>
                {/if}
            </div>
        {:else}
            <div class="w-full px-4 py-1 text-white text-opacity-50 text-ellipsis overflow-ellipsis whitespace-nowrap overflow-hidden {placeholderClass}"  style={placeholderStyle}>
                <slot name="prepend:placeholder" />
                {placeholder}
                <slot name="append:placeholder" />
            </div>
        {/if}
        <button
            class="h-full flex items-center justify-center bg-black bg-opacity-20 w-7 border-l border-white border-opacity-10 hover:bg-opacity-30 active:bg-opacity-10 rounded-r-full"
            on:click|stopPropagation={onExpandClick}
        >
            <ChevronDown size={18} />
        </button>
    </div>
    {#if normalizedOptions.length > 0}
        <ul
            class="max-h-[20rem] {optionWrapperClass}"
            style={optionWrapperStyle}
            id={optionId}
            role="listbox"
            aria-hidden={!expanded}
            bind:this={optionWrapperRef}
        >
            {#each normalizedOptions as option, index (option.key)}
                <li class="{optionClass}" role="option" aria-selected={(option.key == value ? 'true' : 'false')} data-key={option.key}>
                    <button
                        class="w-full h-full border-0 bg-transparent text-start"
                        class:over-item={currentOverItemIndex === index}
                        on:click|stopPropagation={() => onOptionClick(option.key)}
                        tabindex={(value ? option.key == value : index === 0) ? 0 : -1}
                    >{option.label}</button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<script lang="ts">
    import { ChevronDown, Cross1 } from 'radix-icons-svelte';
    import { clickoutside } from '@svelteuidev/composables';
	import { tick } from 'svelte';

    type OptionObject = { key: string; label: string };
    type Option = string | OptionObject;

    export let options: Array<Option> = [];
    export let className = '';
    export let style = '';
    export let rootClass = '';
    export let rootStyle = '';
    export let labelClass = '';
    export let labelStyle = '';
    export let placeholderClass = '';
    export let placeholderStyle = '';
    export let optionWrapperClass = '';
    export let optionWrapperStyle = '';
    export let optionClass = '';
    export let value: string = '';
    export let placeholder: string = '';
    export let hideLabel: boolean = false;
    export let label: string = '';
    export let disabled: boolean = false;
    export let clearable: boolean = false;

    export { className as class }

    let currentOverItemIndex = -1;

    let optionWrapperRef: HTMLUListElement;

    let expanded = false;
    const optionId = `__custom-select-options-${Math.random().toString(36).substring(2, 9)}`;
    const labelId = `__custom-select-label-${Math.random().toString(36).substring(2, 9)}`;
    
    let normalizedOptions: Array<OptionObject> = [];

    function initCurrentItemIndex() {
        currentOverItemIndex = normalizedOptions.findIndex((option) => option.key === value);
    }
    
    $: {
        normalizedOptions = options.map((option) => {
            if (typeof option === 'string') {
                return { key: option, label: option };
            }
            return option;
        });
        initCurrentItemIndex();
    }

    $: selectedLabel = normalizedOptions.find((option) => option.key === value)?.label;

    function onExpandClick() {
        expanded = !expanded;
        // if (expanded) {
        //     const button = optionWrapperRef.querySelector('button[tabindex="0"]') as HTMLButtonElement;
        //     button?.focus();
        // }
    }

    function onOptionClick(key: string) {
        value = key;
        expanded = false;
        initCurrentItemIndex();
    }

    function isSpace(e: KeyboardEvent) {
        return e.code === 'Space' || e.key === ' ';
    }

    function isEnter(e: KeyboardEvent) {
        return e.code === 'Enter' || e.key === 'Enter';
    }

    async function onKeyDownWrapperEvent(e: KeyboardEvent) {
        const isArrowUp = e.key === 'ArrowUp';
        const isArrowDown = e.key === 'ArrowDown';

        if (isSpace(e) || isEnter(e)) {
            e.preventDefault();
            e.stopPropagation();
            if (expanded) {
                onOptionClick(normalizedOptions[currentOverItemIndex].key);
            } else {
                onExpandClick();
            }
        }

        await tick();
        if (expanded) {
            if (isArrowUp || isArrowDown) {
                e.preventDefault();
                e.stopPropagation();
                currentOverItemIndex = isArrowUp ? Math.max(currentOverItemIndex - 1, 0) : Math.min(currentOverItemIndex + 1, normalizedOptions.length - 1);
            }
        }
    }

    function onClearClick() {
        value = '';
        expanded = false;
        initCurrentItemIndex();
    }
</script>

<style lang="postcss" scoped>

.custom-select {
    @apply border border-white border-opacity-10 relative rounded-full;
    background-color: var(--drop-down-bg);
}

ul {
    @apply hidden absolute top-full mt-1 z-[100] bg-[var(--drop-down-bg)] w-full border border-white border-opacity-5 rounded;
    @apply shadow-sm shadow-slate-600;
}

.container-wrapper {
    position: relative;
}

.container-wrapper[aria-expanded="true"] ul {
    display: block;
}


ul li[aria-selected="true"] button{
    @apply bg-[var(--bg-primary)] font-medium;
    color: hsl(205 93% 15%);
}

li {
    @apply rounded;
}

li button:nth-child(2n + 1){
    @apply border-b;
}
li button {
    @apply py-1 px-2 border-white border-opacity-5 w-full text-left rounded hover:!bg-white hover:bg-opacity-10 hover:!text-white;
}

.over-item {
    @apply bg-white bg-opacity-10;
}

</style>

