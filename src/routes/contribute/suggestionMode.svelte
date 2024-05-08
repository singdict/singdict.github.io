<div class="h-full flex justify-center items-center">
    <Card>
        <div class="p-4 px-8 w-[25rem] flex gap-4 flex-col">
            <Select options={modes} bind:value={currentMode} label="Mode" rootClass="w-full" />
            <Input
                label="Amount of Words"
                placeholder="Words to be quizzed"
                class="text-sm"
                labelClass="text-[0.7em]"
                wrapperClass="py-1"
                type="number"
                hint="like 20, 15, ..."
                step="1"
                bind:value={amountOfWords}
                bind:error={amountOfWordsError}
            />
            <Input
                label="Random Seed"
                placeholder="Randomize words"
                class="text-sm"
                labelClass="text-[0.7em]"
                wrapperClass="py-1"
                hint="like 'my awesome seed', '12312', ..."
                bind:value={randomSeed}
                bind:error={randomSeedError}
            />
            <Input
                label="% of history"
                placeholder="Percentage of history to be reused"
                class="text-sm" 
                labelClass="text-[0.7em]"
                wrapperClass="py-1"
                type="number"
                step="any"
                hint="like 20, 15, ..."
                bind:value={historyPercentage}
                bind:error={historyPercentageError}
            />
            <Select label="Group By" placeholder="Group word by" bind:value={currentGroupBySelectionKey} options={groupByItems} clearable />
            {#if currentGroupBySelectionKey === 'linkTitle' || currentGroupBySelectionKey === 'linkURL'}
                <Select
                    label="Group By {getTitle(currentGroupBySelectionKey)}"
                    placeholder={getPlaceholder(currentGroupBySelectionKey)}
                    bind:value={currentGroupBySelectionChildKey}
                    options={linkItems}
                    clearable
                />
            {/if}
        </div>
        <div slot="footer">
            <Button expand fill="solid" on:click={onQuizStartClick}>
                Quiz Me
            </Button>
        </div>
    </Card>
</div>

<svelte:head>
    <title>Contribute</title>
    <meta name="description" content="Contribute" />
</svelte:head>

<script lang="ts">
    import Card from '$lib/components/card.svelte';
    import Input from '$lib/components/input.svelte';
    import Button from '$lib/components/button.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
    import Select from '$lib/components/select.svelte';
	import { wordList } from '$lib/wordList';

    let amountOfWords = '20';
    let randomSeed: string | undefined = undefined;
    let historyPercentage: string = '20';

    let amountOfWordsError = '';
    let randomSeedError = '';
    let historyPercentageError = '';

    // --------------------------- Group By ---------------------------
    type OptionType = {
        key: string;
        label: string;
    }

    const groupByItems: OptionType[] = [
        {
            key: 'linkTitle',
            label: 'Link Title',
        },
        {
            key: 'linkURL',
            label: 'Link',
        }
    ];

    let currentGroupBySelectionChildKey = '';
    let currentGroupBySelectionKey = '';

    let linkItems: Array<OptionType> = [];

    function initLinkItems(cb: (url: string, title: string) => OptionType) {
        linkItems = [];
        const linkItemsMap = new Map<string, string>();
        $wordList.forEach((el) => {
            const { links } = el;
            if (!Array.isArray(links)) return;
            links.forEach((link) => {
                if (linkItemsMap.has(link.link)) return;
                linkItemsMap.set(link.link, link.title);
            });
        });

        linkItemsMap.forEach((label, key) => {
            linkItems.push(cb(key, label));
        });
        linkItems.sort((a, b) => a.label.localeCompare(b.label));
        linkItems = linkItems;
    }

    $: {
        switch(currentGroupBySelectionKey) {
            case 'linkTitle':
                initLinkItems((url, title) => ({ key: url, label: title }));
                break;
            case 'linkURL':
                initLinkItems((url) => ({ key: url, label: url }));
                break;
            case 'clear': currentGroupBySelectionKey = ''; break;
            default:
                break;
        }
    }

    function resetGroupByConfig() {
        currentGroupBySelectionChildKey = '';
    }

    $: {
        currentGroupBySelectionKey;
        resetGroupByConfig();
    }

    function getTitle(key: string) {
        const item = groupByItems.find((el) => el.key === key);
        return item?.label ?? '';
    }

    function getPlaceholder(key: string) {
        switch(key) {
            case 'linkTitle': return 'Select a link title';
            case 'linkURL': return 'Select an URL';
            default: return '';
        }
    
    }

    function normalizeGroupByItem(key: string) {
        switch(key) {
            case 'linkTitle': case 'linkURL': return 'link'
            default: return '';
        }
    }

    // -----------------------------------------------------------------

    // ------------------------- Spell Mode ----------------------------

    const modes = [{
        key: 'spell',
        label: 'Spell Bee',
    }, {
        key: 'guess',
        label: 'Guess Definition',
    }];
    let currentMode = modes[1].key;

    // -----------------------------------------------------------------


    function onQuizStartClick() {
        const query = new URLSearchParams({
            amt_words: amountOfWords,
            seed: randomSeed ?? '',
            history_percentage: historyPercentage,
            group_by: JSON.stringify({
                key: normalizeGroupByItem(currentGroupBySelectionKey),
                childKey: currentGroupBySelectionChildKey,
            }),
            quiz_mode: currentMode,
        });
        goto(`${base}/quiz-mode/quiz?${query.toString()}`);
    }

</script>