<div class="notification notification-{type} grid">
    {#if getNotificationIcon(type)}
        <div class="logo">
            <svelte:component this={getNotificationIcon(type)} size={32} />
        </div>
    {/if}
    <div class="relative">
        <span class="absolute top-0 left-0 border-2 timeline" style:border-color="var(--timeline-color)" style:--timeline-duration="{duration}ms"></span>
        <p class="p-3">{message}</p>
        <div class="flex justify-end pb-2 px-2">
            <Button fill="ghost" color={getButtonType(type)} on:click={() => dispatcher('close')}>
                Close
            </Button>
        </div>
    </div>
</div>

<script lang="ts">
    import type { Notification } from '$lib/notificationStore';
    import {
        ExclamationTriangle,
        CrossCircled,
        InfoCircled,
        CheckCircled,
    } from 'radix-icons-svelte';
    import Button, { type ColorType } from './button.svelte';
    import { createEventDispatcher } from 'svelte';

    export let message: string;
    export let type: Notification['type'] = 'default';
    export let duration: number = 5000;

    const dispatcher = createEventDispatcher<{
        close: void;
    }>();

    function getNotificationIcon(type: unknown) {
        switch (type) {
            case 'info':
                return InfoCircled;
            case 'success':
                return CheckCircled;
            case 'warning':
                return ExclamationTriangle;
            case 'danger':
                return CrossCircled;
            default: undefined
        }
    }

    function getButtonType(type: unknown): ColorType {
        switch (type) {
            case 'info':
                return 'primary';
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            case 'danger':
                return 'danger';
            default: return 'dark';
        }
    }
</script>

<style lang="postcss" scoped>
    .notification {
        @apply rounded-md shadow-md overflow-hidden w-full;
        --card-bg-color-hsl: 206 12% 21%;
        --card-border-color-hsl: 206 12% 30%;
        background-color: hsl(var(--card-bg-color-hsl));
        border: 1px solid hsl(var(--card-border-color-hsl));
        grid-template-columns: auto 1fr;
    }

    .notification-info {
        --timeline-color: theme('colors.sky.300');
        --text-color: theme('colors.sky.800');
        @apply text-sky-100;
    }

    .notification-warning {
        --timeline-color: theme('colors.yellow.300');
        --text-color: theme('colors.yellow.800');
        @apply text-yellow-100;
    }

    .notification-success {
        --timeline-color: theme('colors.green.300');
        --text-color: theme('colors.green.800');
        @apply text-green-100;
    }

    .notification-danger {
        --timeline-color: theme('colors.red.300');
        --text-color: theme('colors.red.800');
        @apply text-red-100;
    }

    .notification-default {
        --timeline-color: theme('colors.gray.300');
        --text-color: theme('colors.gray.800');
        @apply text-gray-100;
        grid-template-columns: 1fr;
    }

    .logo {
        @apply p-4 flex items-center justify-center;
        background-color: var(--timeline-color);
        color: var(--text-color);
    }

    .timeline {
        @apply w-full;
        transform-origin: top left;
        animation: timeline-animation var(--timeline-duration) linear forwards;
    }

    @keyframes timeline-animation {
        0% {
            transform: scaleX(1);
        }
        100% {
            transform: scaleX(0);
        }
    }
</style>