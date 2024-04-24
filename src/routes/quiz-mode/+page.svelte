<Tabs {items} activeIndex={0}>
    <div slot="tab" let:id let:key let:panelId id={panelId} role="tabpanel" aria-hidden="false" aria-labelledby={id} class="w-full h-full">
        {#if key === 'quiz'}
            <QuizMode />
        {:else}
            <HistoryMode />
        {/if}
    </div>
</Tabs>
<script lang="ts">
    import Tabs from '$lib/components/tabs.svelte';
    import QuizMode from './quizMode.svelte';
    import HistoryMode from './historyMode.svelte';
    
    const items = [
        {
            key: 'quiz',
            value: 'Quiz'
        },
        {
            key: 'history',
            value: 'History'
        }
    ];
</script>