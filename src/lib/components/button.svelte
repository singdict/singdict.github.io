<button
    class={`rounded-full px-4 py-1 btn-color-${color} btn-fill-${fill} text-sm font-semibold`}
    class:w-full={expand}
    on:click
    on:dblclick
    disabled={disabled}
    {...$$restProps}
>
    <slot />
</button>

<script context="module" lang="ts" >
    export type ColorType = 'primary' | 'danger' | 'warning' | 'success' | 'light' | 'dark';
    export type FillType = 'solid' | 'ghost' | 'outline';
</script>

<script lang="ts">
    export let expand = false;
    export let color: ColorType = 'primary';
    export let fill: FillType = 'solid';
    export let disabled = false;
</script>

<style lang="postcss" scoped>
    button {
        --_internal_bg-color-hue: var(--_bg-color-hue, 206);
        --_internal_bg-color-saturation: var(--_bg-color-saturation, 93%);
        --_internal_bg-color-light: var(--_bg-color-light, 75%);
        --_internal_bg-opacity: var(--_bg-opacity, 1);
        --_internal_bg_color_hsl: var(--_bg_color_hsl, hsl(var(--_internal_bg-color-hue) var(--_internal_bg-color-saturation) var(--_internal_bg-color-light) / var(--_internal_bg-opacity)));
        --_internal_text-color-hue: var(--_text-color-hue, 206);
        --_internal_text-color-saturation: var(--_text-color-saturation, 88%);
        --_internal_text-color-light: var(--_text-color-light, 10%);
        --_internal_text-opacity: var(--_text-opacity, 1);
        --_internal_text-color_hsl: var(--_text-color_hsl, hsl(var(--_internal_text-color-hue) var(--_internal_text-color-saturation) var(--_internal_text-color-light) / var(--_internal_text-opacity)));
        color: var(--_internal_text-color_hsl);
        @apply transition-colors;
    }

    .btn-color-danger {
        --_bg-color-hue: 11;
        --_bg-color-saturation: 88%;
        --_bg-color-light: 72%;
        --_text-color-hue: 11;
        --_text-color-saturation: 88%;
        --_text-color-light: 25%;
    }

    .btn-color-success {
        --_bg-color-hue: 130;
        --_bg-color-saturation: 88%;
        --_bg-color-light: 86%;
        --_text-color-hue: 130;
        --_text-color-saturation: 88%;
        --_text-color-light: 25%;
    }

    .btn-color-warning {
        --_bg-color-hue: 54;
        --_bg-color-saturation: 88%;
        --_bg-color-light: 86%;
        --_text-color-hue: 54;
        --_text-color-saturation: 88%;
        --_text-color-light: 25%;
    }
    
    .btn-color-light {
        --_bg-color-hue: 0;
        --_bg-color-light: 100%;
        --_bg-color-saturation: 0%;
        --_text-color-hue: 0;
        --_text-color-saturation: 0%;
        --_text-color-light: 0%;
    }
    
    .btn-color-dark {
        --_bg-color-hue: 0;
        --_bg-color-saturation: 0%;
        --_bg-color-light: 20%;
        --_text-color-hue: 0;
        --_text-color-saturation: 0%;
        --_text-color-light: 100%;
    }

    .btn-fill-solid {
        background-color: var(--_internal_bg_color_hsl);
    }
    
    .btn-fill-solid:not(:disabled):hover {
        --_bg-opacity: 0.8;
        --_text-color-light: 10%;
        background-color: var(--_internal_bg_color_hsl);
    }
    
    .btn-fill-solid:not(:disabled):active {
        --_bg-opacity: 0.7;
        --_text-color-light: 5%;
        background-color: var(--_internal_bg_color_hsl);
    }

    .btn-fill-outline {
        --_text-color-light: 67%;
        border: 1px solid var(--_internal_bg_color_hsl);
    }

    .btn-color-dark.btn-fill-outline,
    .btn-color-light.btn-fill-outline,
    .btn-color-dark.btn-fill-ghost,
    .btn-color-light.btn-fill-ghost {
        --_bg-color-light: 100%;
        --_text-color-light: 100%;
    }

    .btn-fill-outline:not(:disabled):hover {
        --_bg-opacity: 0.8;
        --_text-color-light: 10%;
        background-color: var(--_internal_bg_color_hsl);
    }
    
    .btn-fill-outline:not(:disabled):active {
        --_bg-opacity: 0.7;
        --_text-color-light: 5%;
        background-color: var(--_internal_bg_color_hsl);
    }

    .btn-fill-ghost {
        --_text-color-light: 67%;
    }

    .btn-fill-ghost:not(:disabled):hover {
        --_bg-opacity: 0.2;
        --_text-color-light: 80%;
        background-color: var(--_internal_bg_color_hsl);
    }
    
    .btn-fill-ghost:not(:disabled):active {
        --_bg-opacity: 0.1;
        --_text-color-light: 80%;
        background-color: var(--_internal_bg_color_hsl);
    }

    button:not(:disabled).btn-color-dark.btn-fill-ghost:hover,
    button:not(:disabled).btn-color-dark.btn-fill-outline:hover,
    button:not(:disabled).btn-color-dark.btn-fill-solid:hover {
        --_bg-opacity: 1;
        --_bg-color-light: 25%;
        --_text-color-light: 100%;
    }
    
    button:not(:disabled).btn-color-dark.btn-fill-ghost:active,
    button:not(:disabled).btn-color-dark.btn-fill-outline:active,
    button:not(:disabled).btn-color-dark.btn-fill-solid:active {
        --_bg-opacity: 1;
        --_bg-color-light: 20%;
        --_text-color-light: 100%;
    }

    button:not(:disabled).btn-color-light.btn-fill-ghost:hover,
    button:not(:disabled).btn-color-light.btn-fill-outline:hover,
    button:not(:disabled).btn-color-light.btn-fill-solid:hover {
        --_bg-opacity: 1;
        --_bg-color-light: 100%;
        --_text-color-light: 0%;
    }
    
    button:not(:disabled).btn-color-light.btn-fill-ghost:active,
    button:not(:disabled).btn-color-light.btn-fill-outline:active,
    button:not(:disabled).btn-color-light.btn-fill-solid:active {
        --_bg-opacity: 1;
        --_bg-color-light: 90%;
        --_text-color-light: 0%;
    }

    button:disabled {
        --_bg-color-hue: 0;
        --_bg-color-saturation: 0%;
        --_bg-color-light: 30%;
        --_text-color-hue: 0;
        --_text-color-saturation: 0%;
        --_text-color-light: 100%;
        opacity: 0.5;
    }
</style>