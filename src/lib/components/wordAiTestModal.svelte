<Dialog bind:open let:close>
    <Card class="min-w-[30rem] max-h-[80vh]">
        <div slot="header" class="flex justify-between items-center">
            <div>
                <h1 class="text-xl opacity-70 capitalize">{currentWord.word}</h1>
                <span class="opacity-50 text-sm">Test your knowledge using AI</span>
            </div>
            <button
                class="text-rose-200 hover:bg-rose-500 hover:bg-opacity-50 active:bg-rose-600 active:bg-opacity-50 font-bold w-fit h-fit rounded-full p-2"
                on:click={close}
            >
                <Cross1 size={12} />
            </button>
        </div>
        <Tabs {items} bind:activeIndex useHash={false} bind:activeKey={currentKey}>
            <div slot="tab" let:key class="p-1 flex flex-col gap-4 w-[30rem]">
                <div>
                    <div class="flex justify-end">
                        <Checkbox reverse bind:checked={spellcheck} classWrapper="w-fit">
                            <span class="text-sm">Spellcheck</span>
                        </Checkbox>
                    </div>
                    <div>
                        <div class="text-sm opacity-50">
                            {#if currentKey === 'sentence'}
                                Sentence
                            {:else if currentKey === 'definition'}
                                Definition
                            {/if}
                        </div>
                        {#if isEditable}
                            <InputArea label="User" hideLabel placeholder="Enter a {currentKey}" {spellcheck} rows={4} autofocus bind:value={sentence} />
                        {:else}
                            <div class="h-[7.5rem] p-2 overflow-auto bg-white bg-opacity-5 border border-white border-opacity-10 rounded">
                                {sentence}
                            </div>
                        {/if}
                    </div>
                </div>
                {#if isAIWorking || aiResponse.trim()}
                    <div in:fade>
                        <div class="text-sm opacity-50 mt-4">AI Response</div>
                        <div class="h-[7.5rem] p-2 overflow-auto bg-white bg-opacity-5 border border-white border-opacity-10 rounded relative" bind:this={responseBodyRef}>
                            <output aria-label="Ai response" class=" whitespace-pre-wrap">
                                {@html parseMarkdown(aiResponse)}
                            </output>
                            {#if !aiResponse.trim()}
                                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span class="text-sm opacity-50">
                                        No response
                                    </span>   
                                </span>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        </Tabs>
        <div slot="footer">
            <Button fill="ghost" color={isAIWorking ? 'danger' : undefined} expand on:click={onAiButtonClick}>
                <div class="flex items-center gap-2 justify-center">
                    {#if !isAIWorking}
                        <MagicWand size={18} />
                        <span>Ask AI</span>
                    {:else}
                        <Cross1 size={18} />
                        <span>Cancel</span>
                    {/if}
                </div>
            </Button>
        </div>
    </Card>
</Dialog>

<script lang="ts">
    import Dialog from './dialog.svelte';
    import Card from './card.svelte';
    import Tabs from './tabs.svelte';
    import InputArea from './inputArea.svelte';
    import Checkbox from './checkbox.svelte';
	import Button from './button.svelte';
    import { MagicWand, Cross1 } from 'radix-icons-svelte';
    import { marked } from 'marked';
    import { fade } from 'svelte/transition';
	import type { WordSchema } from '../../model/wordsSchema';
    import { settings } from '$lib/settings';
	import { notificationStore } from '$lib/notificationStore';
	import { OpenAIApi, type Message } from '$lib/openAI';

    export let open = false;
    export let currentWord: WordSchema;
    
    let isAIWorking = false;
    
    let spellcheck = false;
    let sentence = '';
    let isEditable = true;
    let aiResponse = '';
    let currentKey = 'sentence';
    let activeIndex = 0;

    function reset() {
        sentence = '';
        isEditable = true;
        aiResponse = '';
        activeIndex = 0;
    }

    $: {
        if (open) {
            reset();
        }
    }

    const items = [
        {
            key: 'sentence',
            value: 'Sentence',
        },
        {
            key: 'definition',
            value: 'Definition',
        }
    ];

    function onAiButtonClick() {
        isAIWorking = !isAIWorking;
        if (isAIWorking) {
            isEditable = false;
            createChatCompletion();
        } else {
            openAI?.stop();
            isEditable = true;
        }
    }

    function parseMarkdown(text: string) {
        return marked.parseInline(text, {
            mangle: false,
            headerIds: false,
        });
    }

    // ---------------------------- OpenAI ---------------------------
    let openAI: OpenAIApi | undefined;
    let responseBodyRef: HTMLDivElement;

    $: {
        const key = $settings.openAIKey?.trim();
        if (key) {
            openAI = new OpenAIApi({
                apiKey: key,
            });
        } else {
            openAI = undefined;
        }
    }

    async function createChatCompletionApi(generateMessage: () => Message) {
        if (!openAI) {
            notificationStore.add({
                message: 'Please add your OpenAI key in settings',
                type: 'danger',
            });
            return;
        }

        if (!sentence.trim()) {
            notificationStore.add({
                message: 'Please enter a sentence',
                type: 'danger',
            });
            return;
        }

        isAIWorking = true;
        isEditable = false;
        aiResponse = '';
        
        await openAI.createCompletion({
            model: 'gpt-3.5-turbo',
            messages: generateMessage(),
            streamCallback: (message, err) => {
                if (err) {
                    if (err === 'Aborted') {
                        notificationStore.add({
                            message: err,
                            type: 'success',
                        });
                    } else {
                        notificationStore.add({
                            message: err,
                            type: 'danger',
                        });
                    }
                    isAIWorking = false;
                    isEditable = true;
                    return;
                }
                aiResponse += message;
                responseBodyRef.scrollTop = responseBodyRef.scrollHeight;
            }
        });
        isAIWorking = false;
        isEditable = true;
    }

    async function createChatCompletionForSentence() {
        createChatCompletionApi(() => {
            const systemMessage = "You're a well read english teacher, who is very knowledgeable about the subject. You're also a good listener, and you're able to find grammar mistake and explain the errors in a way that makes sense to the student. \n"
                + 'You can go as far as explaining in "Markdown" or "HTML" language with "inline style" inside html tags if the situation required.\n'
                + `Today the student studying the usage of the word "${currentWord.word}" in a sentence. Your job is to help the student understand the usage of the word "${currentWord.word}" in a sentence with proper grammar checking step by step explanation.\n`
            return [
                {
                    role: 'system',
                    content: systemMessage
                },
                {
                    role: 'user',
                    content: sentence,
                }
            ];
        })
    }
    
    async function createChatCompletionForDefinition() {
        createChatCompletionApi(() => {
            const systemMessage = "You're a well read english teacher, who is very knowledgeable about the subject. You're also a good listener, and you're able to find grammar mistake and explain the errors in a way that makes sense to the student. \n"
                + 'You can go as far as explaining in "Markdown" or "HTML" language with "inline style" inside html tags if the situation required.\n'
                + `Today the student studying the definition of the word "${currentWord.word}". Your job is to help the student to figure out the definition of the word by correcting them using hints. Under no circumstance you're allowed to reveal the correct definition unless he gives the correct definition by themselves or give up.\n`
            return [
                {
                    role: 'system',
                    content: systemMessage
                },
                {
                    role: 'user',
                    content: sentence,
                }
            ];
        })
    }

    function createChatCompletion() {
        if (!openAI) {
            notificationStore.add({
                message: 'Please add your OpenAI key in settings',
                type: 'danger',
            });
            return;
        }

        if (currentKey === 'sentence') {
            createChatCompletionForSentence();
        } else if (currentKey === 'definition') {
            createChatCompletionForDefinition();
        } else {
            notificationStore.add({
                message: `This feature(${currentKey}) is not available yet`,
                type: 'danger',
            })
            return;
        }

    }
    // ---------------------------------------------------------------
</script>