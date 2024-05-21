<div class="flex justify-center flex-col items-center mt-3 h-full gap-2">
    <Input placeholder="Search" rootClass="w-1/3" on:search={onInputSearch} on:keyup={onKeyUpEvent} searchItems={words.map((w) => w.word)} label="Search">
        <MagnifyingGlass slot="start" class="text-white opacity-50" size={18} />
    </Input>
    <div class="h-full flex flex-wrap gap-4 p-4 justify-center overflow-y-auto">
        {#each Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)) as letter, index (letter)}
            <AlphabetCard letter={letter} hue={32 * index} {onAfterTransition} showTransition count={countWords(letter)}  />
        {/each}
    </div>
</div>

<svelte:head>
    <title>SingDict</title>
    <meta name="description" content="Interface to SingDict: the Open Singlish Dictionary" />
    <meta name="keywords" content="Singlish, Open Data" />
    <meta name="author" content="Chang-Uk Shin, Chow Siew Yen, Francis Bond" />
</svelte:head>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
    import AlphabetCard from '$lib/components/alphabetCard.svelte';
	import Input from '$lib/components/input.svelte';
    import { MagnifyingGlass } from 'radix-icons-svelte';
    import { wordList } from '$lib/wordList';
	import { onMount } from 'svelte';
	import { cleanTextToSpeechCache } from '$lib/textToSpeech';

    $: words = $wordList;

    async function onAfterTransition(letter: string) {
        await goto(`${base}/list/${letter}`)
    }

    function onInputSearchHelper(value: string) {
        const text = value.trim().toLowerCase();
        if (!text) return;
        const firstLetter = text[0];
        goto(`${base}/list/${firstLetter}#${text}`);
    }

    function onInputSearch(e: CustomEvent<string>) {
        const value = e.detail;
        onInputSearchHelper(value);
    }

    function onKeyUpEvent(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            const value = (e.target as HTMLInputElement).value;
            onInputSearchHelper(value);
        }
    }

    function countWords(letter: string) {
        let count = 0;
        const normalizedLetter = letter[0].toLowerCase();
        for (const word of words) {
            if (word.word[0] === normalizedLetter) count++;
        }
        return count;
    }

    onMount(() => {
        cleanTextToSpeechCache();
    })
</script>
