<div class="w-full h-full flex flex-col justify-center items-center gap-4" bind:this={parentRef}>
    <div class="flex gap-8">
        <Select options={sortByOptions} placeholder="Sort by" label="Sort By" hideLabel bind:value={sortBy} disabled={history.length === 0}>
            <span slot="prepend:label" class="mr-1 text-sm opacity-50">Sorted By: </span>
        </Select>
        <Checkbox classWrapper="flex items-center" reverse bind:checked={sortByAsc} disabled={history.length === 0}>
            Ascending
        </Checkbox>
    </div>
    <span class="text-sm opacity-50">
        {#if history.length > 0}
            Showing {history.length} {history.length === 1 ? 'result' : 'results'}
        {:else}
            No history found
        {/if}
    </span>
    <div class="min-w-[40rem]">
        {#if history.length > 0}
            <VirtualList bind:this={virtualList} itemCount={history.length} height={parentHeight - 100} itemSize={160} getKey={(index) => history[index].word}>
                <div slot="item" let:index let:style {style} class="p-1">
                    <Card class="w-full h-full">
                        <span slot="header" class="flex gap-2 items-baseline">
                            <span class="text-sm opacity-50 uppercase tracking-wide font-medium">{index + 1}.</span>
                            <a
                                href={makeUrl(history[index])}
                                class="font-semibold hover:text-sky-400 flex gap-1 items-center capitalize"
                            >
                                <span>{history[index].word}</span>
                                <ExternalLink size={18} />
                            </a>
                        </span>
                        <span class="ml-4 mb-2">
                            <span class="text-[0.8em] opacity-70">Last attempt</span>
                            <span class="font-medium text-sm opacity-90">{formatDateTime(history[index].lastAttempt)}</span>
                        </span>
                        <div role="status" aria-live="polite" class="grid grid-cols-3 justify-items-center mt-2">
                            <div class="flex flex-col-reverse items-center">
                                <span class="text-sm opacity-50 uppercase tracking-wide font-medium">Attempts</span>
                                <span aria-label="Number of attempts" class="text-[2em] font-bold text-sky-200">{humanizeNumber(history[index].stats.attempts)}</span>
                            </div>
                            <div class="flex flex-col-reverse items-center">
                                <span class="text-sm opacity-50 uppercase tracking-wide font-medium">Correct Attempts</span>
                                <span aria-label="Correct attempts" class="text-[2em] font-bold text-emerald-200">{humanizeNumber(history[index].stats.correct)}</span>
                            </div>
                            <div class="flex flex-col-reverse items-center">
                                <span class="text-sm opacity-50 uppercase tracking-wide font-medium">Incorrect Attempts</span>
                                <span aria-label="Incorrect attempts" class="text-[2em] font-bold text-rose-200">{humanizeNumber(calcIncorrectAttempts(history[index]))}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </VirtualList>
        {:else}
            <div style:height={`${parentHeight - 100}px`}></div>
        {/if}
    </div>
</div>

<svelte:head>
    <title>Word History</title>
    <meta name="description" content="Word history and stats" />
    <meta name="keywords" content="word history, word stats, word quiz" />
</svelte:head>

<script lang="ts">
    import Card from '$lib/components/card.svelte';
    import Checkbox from '$lib/components/checkbox.svelte';
    import VirtualList from 'svelte-tiny-virtual-list';
	import type { WordHistory } from '../../model/wordsSchema';
    import Select from '$lib/components/select.svelte';
	import { base } from '$app/paths';
    import { ExternalLink } from 'radix-icons-svelte';
    import { formatDateTime } from '$lib/utils';
	import { wordHistory } from '$lib/wordList';

    let parentRef: HTMLElement;
    let parentHeight = 500;
    let sortBy = 'incorrect';
    let sortByAsc = false;
    let history: Array<WordHistory> = $wordHistory;

    $: {
        if (parentRef) {
            parentHeight = parentRef.clientHeight;
        }
    }

    $: {
        sortBy, sortByAsc;
        history = history.sort((a, b) => {
            const first = sortByAsc ? a : b;
            const second = sortByAsc ? b : a;
            if (sortBy === 'attempts') {
                return first.stats.attempts - second.stats.attempts;
            } else if (sortBy === 'correct') {
                return first.stats.correct - second.stats.correct;
            } else if (sortBy === 'incorrect') {
                return calcIncorrectAttempts(first) - calcIncorrectAttempts(second);
            } else if (sortBy === 'lastAttempt') {
                return first.lastAttempt - second.lastAttempt;
            } else {
                return 0;
            }
        });
        recomputeSizes();
    }

    let sortByOptions = [
        {
            label: 'Attempts',
            key: 'attempts'
        },
        {
            label: 'Correct',
            key: 'correct'
        },
        {
            label: 'Incorrect',
            key: 'incorrect'
        },
        {
            label: 'Last Attempt',
            key: 'lastAttempt'
        }
    ];

    function makeUrl(word: WordHistory) {
        const tempWord = word.word.toLowerCase();
        const letter = tempWord[0];
        return `${base}/list/${letter}#${tempWord}`;
    }

    function calcIncorrectAttempts(word: WordHistory) {
        const { attempts, correct } = word.stats;
        return attempts - correct;
    }

    // ------------------ Virtual List -----------------------
    let virtualList: VirtualList | undefined;

    function recomputeSizes() {
        virtualList?.recomputeSizes(0);
    }
    // ------------------------------------------------------

    function humanizeNumber(num: number) {
        return Intl.NumberFormat('en', { notation: 'compact' }).format(num);
    }
</script>