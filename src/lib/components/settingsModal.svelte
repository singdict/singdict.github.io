<Dialog bind:open let:close>
    <Card class="min-w-[30rem] max-h-[80vh]">
        <div slot="header" class="flex justify-between items-center">
            <div>
                <h1 class="text-xl opacity-70 capitalize">{currentTitle(currentTabKey)}</h1>
                <span class="opacity-50 text-sm">Settings</span>
            </div>
            <button
                class="text-rose-200 hover:bg-rose-500 hover:bg-opacity-50 active:bg-rose-600 active:bg-opacity-50 font-bold w-fit h-fit rounded-full p-2"
                on:click={close}
            >
                <Cross1 size={12} />
            </button>
        </div>
        <Tabs {items} activeIndex={0} useHash={false} bind:activeKey={currentTabKey} hideButtonGroup>
            <div slot="tab" let:key class="p-1 flex flex-col gap-4 w-[30rem]">
                {#if key === "ai"}
                    <Input
                        label="OpenAI Secret Key"
                        placeholder="Enter OpenAI secret key for text generation"
                        autofocus
                        labelClass="text-[0.8em] opacity-50"
                        bind:value={openAIKey}
                    />
                    <Input
                        label="Voice RSS Key"
                        placeholder="Enter Voice RSS key for text to speech"
                        labelClass="text-[0.8em] opacity-50"
                        bind:value={textToSpeechKey}
                    />
                    <Checkbox classWrapper="mt-2 w-fit" reverse bind:checked={rememberKey}>
                        <span class="text-sm">Remember API Keys</span>
                    </Checkbox>
                {/if}
            </div>
        </Tabs>
        <div slot="footer">
            <Button fill="ghost" color="warning" expand on:click={onSave}>
                <div class="flex items-center gap-2 justify-center">
                    <Pencil2 size={18} />
                    <span>Save</span>
                </div>
            </Button>
        </div>
    </Card>
</Dialog>

<script lang="ts">
    import Dialog from './dialog.svelte';
    import Card from './card.svelte';
    import Tabs from './tabs.svelte';
	import Button from './button.svelte';
    import { Pencil2, Cross1 } from 'radix-icons-svelte';
    import Input from './input.svelte';
	import Checkbox from './checkbox.svelte';
	import { settings } from '$lib/settings';
	import { notificationStore } from '$lib/notificationStore';
	import { onMount } from 'svelte';

    export let open = false;

    let openAIKey = '';
    let textToSpeechKey = '';
    let rememberKey = false;

    let currentTabKey = 'ai';

    onMount(() => {
        openAIKey = $settings.openAIKey ?? '';
        textToSpeechKey = $settings.textToSpeechAPIKey ?? '';
        rememberKey = Boolean($settings.rememberAIKey);
    })

    const items = [
        {
            key: 'ai',
            value: 'AI Setting',
        },
    ];

    function currentTitle(key: string) {
        return items.find((item) => item.key === key)?.value;
    }

    function onSave() {
        settings.update({
            openAIKey,
            textToSpeechAPIKey: textToSpeechKey,
            rememberAIKey: rememberKey
        });
        notificationStore.add({
            message: 'Settings saved',
            type: 'success',
        });
        open = false;
    }
</script>