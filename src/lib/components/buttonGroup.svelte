
<div
    class="{className} {hide? 'hidden': ''}"
    {style}
    role="group"
    style:--active-color="hsl(206 12% 27%)"
    style:--click-color="hsl(206 12% 25%)"
    style:--bg-color="hsl(206 12% 27% / 0.3)"
>
    
    {#each {length: itemsCount} as _i, index (getKey(index)) }
        <slot name="item" buttonStyle={getStyle(index)} buttonClass={getClass(index)} activeStyle={getActiveStyle(activeIndex, index)} {index}></slot>
    {/each}
</div>
<script lang="ts">
    export let itemsCount: number;
    export let activeIndex: number = 0;
    export let className = '';
    export let style = ''
    export { className as class };
    export let getKey: (index: number) => any = (index) => index;
    export let hide: boolean = false;

    function getStyle(index: number) {
        let borderRadius = '';
        let padding = 'padding: 0.2em 1em;';
        let borderWidth = 'border-width: 0';
        const borderColorValue = 'hsl(206 12% 35%)';
        const borderRadiusValue = '100em';
        if (itemsCount === 1) {
           borderRadius = `border-radius: ${borderRadiusValue};` 
           borderWidth = 'border-width: 1px;';
        } else if (index === 0) {
            borderRadius = `border-radius: ${borderRadiusValue} 0 0 ${borderRadiusValue};`;
            borderWidth = 'border-width: 1px 0 1px 1px;';
        } else if (index === itemsCount - 1) {
            borderRadius = `border-radius: 0 ${borderRadiusValue} ${borderRadiusValue} 0;`;
            borderWidth = 'border-width: 1px;';
        } else {
            borderWidth = 'border-width: 1px 0 1px 1px;';
        }
        return `border-color: ${borderColorValue};border-style: solid;background-color: hsl(206 12% 27% / 0.3);${borderRadius}${padding}${borderWidth}`;
    }

    function getActiveStyle(currentActiveIndex: number, index: number) {
        if (currentActiveIndex === index) {
            return 'background-color: hsl(206 12% 27%);';
        }
        return 'background-color: hsl(206 12% 27% / 0.3);';
    }

    function getClass(_index: number) {
        return 'hover:!bg-[var(--active-color)] active:!bg-[var(--click-color)]'
    }
</script>

<style lang="postcss" scoped>
    div {
        @apply w-fit relative isolate;
        border-radius: 100em;
    }
</style>
