<script lang="ts">
    import "../app.css";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import { afterNavigate } from "$app/navigation";
    import NotificationContainer from "$lib/components/notificationContainer.svelte";
    import SettingsModal from "$lib/components/settingsModal.svelte";
    import { Gear } from "radix-icons-svelte";

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Quiz Mode", href: "/quiz-mode" },
        { name: "About", href: "/about" },
    ];

    let animation: Animation | undefined = undefined;
    let isSettingsModalOpen = false;

    afterNavigate(() => {
        const element = document.getElementById("alphabet-card-transition");
        if (animation) {
            animation.cancel();
            element?.remove();
            animation = undefined;
            return;
        }
        requestAnimationFrame(() => {
            if (!element) return;
            element.style.transformOrigin = "center center";
            element.style.height = "100%";
            element.style.width = "100%";

            requestAnimationFrame(() => {
                animation = element.animate(
                    [
                        { transform: "scale(1)", opacity: 1 },
                        { transform: "scale(0.1)", opacity: 0 },
                    ],
                    {
                        duration: 500,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
                animation.onfinish = () => {
                    element.remove();
                };
                animation.oncancel = () => {
                    element.remove();
                };
            });
        });
    });

    function hasNavItemSelected(id: string | null, href: string) {
        if (href === "/") {
            if (id === href) return true;
            return id?.startsWith("/list");
        }
        return id === href;
    }
</script>

<div
    class="h-full grid relative"
    style="grid-template-rows: 3rem calc(100% - 3rem);"
>
    <header class="h-[3rem] flex px-4 items-baseline">
        <a
            href={`${base}/`}
            aria-label="logo"
            class="flex items-center hover:text-sky-200 transition-colors"
        >
            <span class="font-bold text-[1.4em]">V</span>
            <span class="mt-1">ocabulary</span>
        </a>
        <nav class="flex-grow flex justify-center -ml-[10rem]">
            <ul class="flex items-center">
                {#each navItems as { name, href } (href)}
                    <li
                        class="px-4 py-1 border-b-[3px] {hasNavItemSelected(
                            $page.route.id,
                            href
                        )
                            ? 'text-[var(--bg-primary)] border-[var(--bg-primary)] font-extrabold'
                            : 'border-transparent'}"
                    >
                        <a href={`${base}${href}`}>{name}</a>
                    </li>
                {/each}
            </ul>
        </nav>
        <button
            class="transition-colors p-2 hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 h-fit rounded-full mt-2"
            aria-label="Open Setting"
            title="Open Settings"
            on:click={() => (isSettingsModalOpen = true)}
        >
            <Gear size={18} />
        </button>
    </header>
    <main>
        <slot />
    </main>
    <NotificationContainer />
    <SettingsModal bind:open={isSettingsModalOpen} />
</div>

<svelte:head>
    <meta name="author" content="Amit Singh" />
</svelte:head>
