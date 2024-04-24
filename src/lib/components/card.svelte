<div
    class="w-fit card-wrapper {className}"
    {style}
    {...$$restProps}
>
    {#if $$slots.header}
        <header class="bg-black bg-opacity-20 p-2 border-b border-white border-opacity-20 rounded-t overflow-hidden">
            <slot name="header"></slot>
        </header>
    {/if}
    <slot></slot>
    {#if $$slots.footer}
        <footer class="bg-black bg-opacity-20 p-2 border-t border-white border-opacity-20 rounded-b overflow-hidden">
            <slot name="footer"></slot>
        </footer>
    {/if}
</div>

<script lang="ts">

    export let className = '';
    export let style = '';
    export { className as class };

</script>

<style lang="postcss" scoped>
    .card-wrapper {
        --card-bg-color-hsl: 206 12% 19%;
        --card-border-color-hsl: 206 12% 30%;
        background-color: hsl(var(--card-bg-color-hsl));
        border: 1px solid hsl(var(--card-border-color-hsl));
        color: hsl(206, 12%, 100%);
        @apply rounded;
    }
</style>
