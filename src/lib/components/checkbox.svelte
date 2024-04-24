<label class="checkbox-wrapper focus-if-within {classWrapper}" class:flex-row-reverse={reverse} class:opacity-50={disabled}>
    <slot />
    <input type="checkbox" class="sr-only" bind:checked on:change {disabled} {...$$restProps} />
    <div class="w-4 h-4 aspect-square rounded bg-white custom-checkbox">
        {#if checked}
            <Check class="w-full h-full" />
        {/if}
    </div>
</label>

<script lang="ts">
    import { Check } from 'radix-icons-svelte';
    export let classWrapper: string = '';
    export let checked: boolean = false;
    export let reverse = false;
    export let disabled = false;
</script>

<style postcss scoped>
    .checkbox-wrapper {
        @apply flex items-center gap-2 cursor-pointer px-1;
        --bg-color-hsl: 205 12% 47%;
    }

    .custom-checkbox {
        @apply border;
        background-color: hsl(var(--bg-color-hsl) / 0.2);
        border-color: hsl(var(--bg-color-hsl));
        color: hsl(var(--bg-color-hsl));
    }
</style>