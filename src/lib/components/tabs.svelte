<div class="w-full h-full p-4 pt-6 grid gap-2" style="{getStyle(hideButtonGroup)}">
    <TabButtons items={normalizedItems} bind:activeIndex bind:activeKey {useHash} {hideButtonGroup}/>
    {#if activeIndex>= 0}
        <div class="overflow-auto">
            <slot name="tab" {activeIndex} {...normalizedItems[activeIndex]}  />
        </div>
    {/if}
</div>
<script lang="ts">
    import TabButtons from '$lib/components/tabButtons.svelte';

    export let items: Array<{
        key: string,
        value: string,
        id?: string,
        panelId?: string
    }>;
    export let activeIndex: number = -1;
    export let activeKey: string | undefined = undefined;
    export let useHash = true;
    export let hideButtonGroup = false;

    let normalizedItems: Required<(typeof items)[number]>[] = [];

    $: {
        normalizedItems = items.map((el) => {
            return {
                ...el,
                id: el.id ?? `_tabs_${el.key}_${Math.floor(Math.random() * 100)}`,
                panelId: el.panelId ?? `_panel_${el.key}_${Math.floor(Math.random() * 100)}`
            };
        })
    }

    function getStyle(isButtonsHidden: boolean) {
        if (isButtonsHidden) return 'grid-template-rows: 100%;';
        else return 'grid-template-rows: 2.2rem calc(100% - 2.2rem);';
    }
</script>