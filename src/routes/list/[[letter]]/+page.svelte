<div class="w-full h-full px-4 py-8 justify-center flex isolate" bind:this={parentRef}>
    {#if wordList.length > 0}
        <section aria-label="Word list section" class="w-[400px] grid grid-rows-[45px_1fr] gap-4 z-[1] overflow-hidden">
            <div class="p-2">
                <Input placeholder="Search" wrapperClass="mr-2" searchItems={wordList.map((w) => w.word)} on:search={handleSearch} label="Search">
                    <MagnifyingGlass slot="start" class="text-white opacity-50" size={18} />
                </Input>
            </div>
            <div role="menu" tabindex="-1" on:keyup={onContainerKeyup} bind:this={listRef} class="!ring-0">
                <VirtualList itemCount={wordList.length} itemSize={50} height={containerHeight} scrollToIndex={currentSelectedWordIndex} stickyIndices={[currentSelectedWordIndex]}>
                    <div
                        slot="item"
                        let:style
                        let:index
                        {style}
                        style:--item-bg-color="hsl(208, 13%, 19%)"
                        class="flex justify-start items-center word-list-item-wrapper {(currentSelectedWordIndex === index) ? 'before:bg-[var(--item-bg-color)]' : ''} overflow-hidden"
                        role="listitem"
                    >
                        <button
                            class="word-list-item d-focus"
                            class:active={currentSelectedWordIndex === index}
                            tabindex={currentSelectedWordIndex === index ? 0 : -1}
                            on:click={() => currentSelectedWordIndex = index}
                            data-index={index}
                            on:keyup|stopPropagation={onContainerKeyup}
                        >
                            <span class="w-full whitespace-normal break-words">{wordList[index].word}</span>
                        </button>
                    </div>
                </VirtualList>
            </div>
        </section>
        <section aria-label="Word information section" class="flex-grow min-w-[40vw] max-w-[60vw] grid grid-rows-[45px_1fr] gap-4 z-0">
            <div class="flex items-center justify-between mt-3 ml-2">
                <div class="flex items-center h-full gap-8" aria-hidden="true">
                    {#each wordSymbol as { title, colorVar } (title)}
                        <div class="flex items-center gap-1">
                            <div class=" aspect-square h-2 w-2 rounded-full" style="background-color: var({colorVar});"></div>
                            <spam class="opacity-80" style="color: var({colorVar});">{title}</spam>
                        </div>
                    {/each}
                </div>
                <!--<Checkbox bind:checked={memoryTest}>
                    Memory Test
                </Checkbox>-->
            </div>
            <div class="word-information mt-[2px] h-full" style:max-height={`${containerHeight-2}px`}>
                {#if wordList[currentSelectedWordIndex]}
                    <WordInformation word={wordList[currentSelectedWordIndex]} memoryTest={memoryTest} />
                {/if}
            </div>
        </section>
    {:else}
        <div class="flex-grow flex items-center justify-center flex-col opacity-50">
            <ExclamationTriangle size={48} class="text-white mr-4" />
            <div class="text-white text-2xl">No words found</div>
        </div>
    {/if}
</div>
<svelte:window on:hashchange={onNavigationChange} />
<svelte:head>
    {#if $page.params.letter}
        <title>
            {`Words starting with ${$page.params.letter.toUpperCase()}`}
        </title>
    {:else}
        <title>Words list</title>
    {/if}
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import Input from '$lib/components/input.svelte';
	import { onMount, tick } from 'svelte';
	import type { WordSchema } from '../../../model/wordsSchema';
    import { MagnifyingGlass, ExclamationTriangle } from 'radix-icons-svelte';
    import VirtualList from 'svelte-tiny-virtual-list';
    import WordInformation from '$lib/components/wordInformation.svelte';
    import Checkbox from '$lib/components/checkbox.svelte';
    import { wordList as storeWordList } from '$lib/wordList';
	import { notificationStore } from '$lib/notificationStore';

    $: words = $storeWordList;
    let parentRef: HTMLDivElement;

    let memoryTest: boolean = false;

    function parseHash(hash: string) {
        if (hash === '#') return;
        if (hash.length > 0) return hash.slice(1);
        return;
    }

    let wordList: Array<WordSchema> = [];
    let currentSelectedWordIndex: number = 0;

    function initWordList(words: WordSchema[], letter?: string) {
        wordList = [];
        const normalizedLetter = letter?.[0]?.toLowerCase();
        for(const word of words) {
            word.word = word.word;
            if (!normalizedLetter || word.word[0] === normalizedLetter) wordList.push(word);
        }
    }

    onMount(() => {
        initWordList(words, $page.params.letter);
        onPageInit($page.url.hash);
    })

    function onPageInit(hash: string) {
        const word = parseHash(hash);
        if (word) {
            const normalizedWord = word.toLowerCase();
            const index = wordList.findIndex((w) => w.word === normalizedWord);
            if (index < 0) {
                notificationStore.add({
                    message: `The word "${word}" was not found in the list`,
                    type: 'danger',
                });
                return;
            }
            currentSelectedWordIndex = index >= 0 ? index : 0;
        } else {
            currentSelectedWordIndex = 0;
        }
    }

    function onNavigationChange() {
        onPageInit(window.location.hash);
    }

    let containerHeight: number = 500;
    $: {
        if (parentRef) {
            containerHeight = parentRef.clientHeight - 120;
        }
    }

    let listRef: HTMLDivElement;

    function onContainerKeyup(e: KeyboardEvent) {
        let tempIndex = currentSelectedWordIndex;
        switch(e.key) {
            case 'ArrowDown': {
                e.preventDefault();
                tempIndex = Math.min(currentSelectedWordIndex + 1, words.length - 1);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                tempIndex = Math.max(currentSelectedWordIndex - 1, 0);
                break;
            }
            default: return;
        }
        const button = listRef.querySelector(`button[data-index="${tempIndex}"]`) as HTMLButtonElement;
        if (!button) return;
        currentSelectedWordIndex = tempIndex;
        tick().then(() => {
            button.focus();
        });
    }

    function handleSearch(e: CustomEvent<string>) {
        const word = e.detail;
        const normalizedWord = word.toLowerCase();
        const index = wordList.findIndex((w) => w.word === normalizedWord);
        if (index < 0) return;
        currentSelectedWordIndex = index;
    }

    // ------------------------ WORD SYMBOLS ------------------------

    const wordSymbol = [
        {
            title: 'Collocations',
            colorVar: '--word-type-collocation',
        }
    ];

    // --------------------------------------------------------------

</script>

<style scoped lang="postcss">

    .word-list-item-wrapper {
        @apply relative isolate;
    }
    .word-list-item-wrapper::before {
        content: '';
        position: absolute;
        right: -1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 90%;
        z-index: -1;
    }

    .word-list-item {
        @apply w-full h-[90%] text-start capitalize rounded-tl-full rounded-bl-full pl-4 mr-1 ml-1;
    }

    .word-list-item.active, .word-information {
        background-color: hsl(208, 13%, 19%);
    }

    .word-information {
        @apply p-2 px-5 rounded-lg rounded-tl-none;
    }
</style>
