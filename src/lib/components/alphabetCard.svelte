<button class="{className} rounded-[5px] border flex items-center justify-center text-[3.5em] font-extrabold transition-colors relative"
    class:cursor-default={!count}
    class:opacity-40={!count}
    class:alphabet-btn={count}
    style:border-color={`hsla(${normalizedHue}, 86%, 72%, 0.1)`}
    style:color={`hsla(${normalizedHue}, 70%, 81%, 1)`}
    style="background-color: hsla({normalizedHue}, 77%, 75%, 0.5); {style}"
    style:width={width}
    style:height={height}
    style:text-transform="uppercase"
    style:--hue={normalizedHue}
    on:click={count ? onClickCard : undefined}
    bind:this={buttonRef}
    disabled={!count}
>
    {letter}
    {#if count}
        <span class="absolute bottom-1 right-1 text-sm">{count}</span>
    {/if}
</button>

<script lang="ts">
	import { wait } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

    export let letter: string;
    export let count: number = 10;
    export let width: string = '12rem';
    export let height: string = '12rem';
    export let className: string = '';
    export let style: string = '';
    export let hue: number = 0;
    export { className as class };
    export let showTransition: boolean = false;
    export let onAfterTransition: (((letter: string) => void) | ((letter: string) => Promise<void>)) = async () => {
        await wait(500);
    };
    let buttonRef: HTMLElement;

    $: normalizedHue = hue % 360;

    const dispatch = createEventDispatcher<{
        click: MouseEvent;
    }>();


    async function constructHTMLElement() {
        return new Promise<HTMLElement>((resolve, reject) => {
            requestAnimationFrame(() => {
                try {
                    const element = document.createElement('div');
                    const { left, top } = buttonRef.getBoundingClientRect();
                    element.id = 'alphabet-card-transition';
                    element.classList.add('border', 'flex', 'items-center', 'justify-center', 'text-[3.5em]', 'font-extrabold', 'transition-colors', 'alphabet-btn', 'fixed', 'z-50');
                    element.style.borderColor = `hsla(${normalizedHue}, 86%, 72%, 0.1)`;
                    element.style.color = `hsla(${normalizedHue}, 70%, 81%, 1)`;
                    element.style.backgroundColor = `hsla(${normalizedHue}, 77%, 75%, 0.7)`;
                    element.style.width = width;
                    element.style.height = height;
                    element.style.left = '0';
                    element.style.top = '0';
                    element.style.transformOrigin = 'top left'
                    element.style.borderRadius = '5px';
                    element.style.transform = `translate(${left}px, ${top}px) scale(1)`
                    element.style.opacity = '0';
                    element.style.textTransform = 'uppercase';
                    element.style.setProperty('--hue', normalizedHue.toString());
                    resolve(element);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }

    async function onClickCard(e: MouseEvent) {
        if (!showTransition) {
            dispatch('click', e);
            return;
        }
        const element = await constructHTMLElement();
        document.body.appendChild(element);
        requestAnimationFrame(() => {
            const scaleW = window.innerWidth / element.offsetWidth;
            const scaleH = window.innerHeight / element.offsetHeight;
            element.style.opacity = '1';
            element.animate({
                transform: [
                    `${element.style.transform}`,
                    `translate(0, 0) scale(${scaleW}, ${scaleH})`,
                ],
                borderRadius: ['5px', '0']
            }, {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'forwards'
            }).onfinish = async () => {
                await onAfterTransition(letter.toLowerCase());
            };
        });
    }
</script>

<style lang="postcss">
    .alphabet-btn:hover {
        background-color: hsla(var(--hue), 77%, 90%, 0.5) !important;
    }

    .alphabet-btn:active {
        background-color: hsla(var(--hue), 77%, 90%, 0.3) !important;
    }
</style>
