<ButtonGroup
    itemsCount={items.length}
    class={wrapperClass}
    style={wrapperStyle}
    bind:activeIndex={activeIndex}
    getKey={(index) => normalizedItems[index].key}
    hide={hideButtonGroup}
>
    <button
        id={normalizedItems[index].id}
        slot="item"
        let:buttonClass
        let:buttonStyle
        let:index
        let:activeStyle
        style="{buttonStyle} {style} {activeStyle}"
        class="{buttonClass} {className}"
        role="tab"
        type="button"
        aria-selected={activeIndex === index ? 'true' : 'false'}
        aria-controls={normalizedItems[index].panelId}
        on:click={() => onClickTab(index)}
    >
        {normalizedItems[index].value}
    </button>
</ButtonGroup>
<svelte:window on:hashchange={onHashChange} />

<script lang="ts">
    import ButtonGroup from '$lib/components/buttonGroup.svelte';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';
    export let items: (string | { key: string, value: string, id?: string, panelId?: string })[];
    export let className = '';
    export let style = '';
    export { className as class };
    export let wrapperClass = '';
    export let wrapperStyle = '';
    
    export let activeIndex = 0;
    export let activeKey: string | undefined = undefined;
    export let useHash = true;
    export let hideButtonGroup = false;

    let initialActiveIndex = -1;

    let normalizedItems: { key: string, value: string, id?: string, panelId?: string }[] = [];
    $: {
        normalizedItems = items.map(item => {
            if (typeof item === 'string') return { key: item, value: item };
            else return item;
        });
    }

    $: {
        activeKey = normalizedItems[activeIndex]?.key;
    }

    function onClickTab(index: number) {
        if (useHash) {
            window.location.hash = normalizedItems[index].key;
        } else {
            activeIndex = index;
        }
    }

    function onHashChangeHelper(hash: string | undefined) {
        if (!hash) {
            activeIndex = initialActiveIndex;
            return;
        }
        const index = normalizedItems.findIndex((el) => el.key === hash);
        if (index < 0) return;
        activeIndex = index;
    }
    function onHashChange() {
        if (!useHash) return;
        const hash = window.location.hash.substring(1);
        onHashChangeHelper(hash);
    }

    onMount(() => {
        initialActiveIndex = activeIndex;
        onHashChangeHelper($page.url.hash.substring(1));
    });

</script>