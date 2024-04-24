<div class="fixed left-1/2 top-2 -translate-x-1/2">
    {#each $notificationStore as notification (notification.id)}
        <div
            in:fly={{ y: -30, duration: prefersReducedMotion ? 1 : 150 }}
            animate:flip={{ duration: prefersReducedMotion ? 1 : 500 }}
            out:fly={{ x: 30 }}
            class="min-w-[20rem] z-50 mb-2"
        >
            <Notification
                bind:message={notification.message}
                bind:type={notification.type}
                bind:duration={notification.duration}
                on:close={() => onNotificationClose(notification.id)}
            />
        </div>
    {/each}
</div>

<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition';
    import { notificationStore } from '$lib/notificationStore';
    import Notification from '$lib/components/notification.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

    let prefersReducedMotion: boolean = false;

    onMount(() => {
        if (!browser) return;
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion = mediaQuery.matches;

        mediaQuery.addEventListener('change', (e) => {
            prefersReducedMotion = e.matches;
        });
    });

    function onNotificationClose(id: string) {
        notificationStore.remove(id);
    }

</script>