<script lang="ts">
    import Tabs from "$lib/components/tabs.svelte";
    import SuggestionMode from "./suggestionMode.svelte";
    import HistoryMode from "./historyMode.svelte";

    const items = [
        {
            key: "suggestion",
            value: "Suggestion",
        },
        {
            key: "history",
            value: "History",
        },
    ];
</script>

<Tabs {items} activeIndex={0}>
    <div
        slot="tab"
        let:id
        let:key
        let:panelId
        id={panelId}
        role="tabpanel"
        aria-hidden="false"
        aria-labelledby={id}
        class="w-full h-full"
    >
        {#if key === "suggestion"}
            <SuggestionMode />
        {:else}
            <HistoryMode />
        {/if}
    </div>
</Tabs>
