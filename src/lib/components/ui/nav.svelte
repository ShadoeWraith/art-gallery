<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/state'; 

    let isOpen = $state(false);

    let navOptions = [
        { label: 'Shop', href: '/shop' },
        { label: 'Artists', href: '/artists' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' }
    ];

    let navSocials = [
        { icon: 'mdi:facebook', href: '/facebook' },
        { icon: 'mdi:instagram', href: '/instagram' },
        { icon: 'ri:twitter-x-fill', href: '/x' },
        { icon: 'mdi:pinterest', href: '/pinterest' }
    ];

    function isActive(href: any) {
        return page.url.pathname === href;
    }
</script>

<nav class="relative border-b border-stone-400 bg-[#e6e6e6]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
            <div class="flex flex-shrink-0 items-center">
                <a href="/" onclick={() => (isOpen = false)} class="relative text-xl font-bold text-gray-800 group">
                    <span class="text-indigo-600">Africa Curated</span> <span class="text-gray-400">| Art Gallery</span>
                        <span
                            class="absolute top-8 left-0 h-1 w-full origin-left rounded-lg bg-indigo-500 duration-100"
                            class:scale-x-0={!isActive('/')}
                            class:scale-x-100={isActive('/')}
                            class:group-hover:scale-x-100={!isActive('/')}
                        ></span>
                    </a
                >
            </div>

            <div class="hidden items-center space-x-8 lg:flex">
                {#each navOptions as option}
                    <a href={option.href} class="group relative text-gray-600 hover:text-gray-900">
                        <p class="capitalize">{option.label}</p>
                        <span
                            class="absolute top-8 h-1 w-full origin-left rounded-lg bg-indigo-500 duration-100"
                            class:scale-x-0={!isActive(option.href)}
                            class:scale-x-100={isActive(option.href)}
							class:text-gray-900={isActive(option.href)}
                            class:group-hover:scale-x-100={!isActive(option.href)}
							></span>
                    </a>
                {/each}

                <div class="flex flex-row gap-3">
                    {#each navSocials as social}
                        <a href={social.href}>
                            <Icon
                                icon={social.icon}
                                font-size="28"
                                class="text-gray-600 duration-100 hover:text-indigo-500"
                            ></Icon>
                        </a>
                    {/each}
                </div>
            </div>

            </div>
    </div>

    {#if isOpen}
        <div class="absolute top-12 z-20 h-fit w-full bg-[#e6e6e6] px-4 pt-2 pb-3 lg:hidden">
            {#each navOptions as option}
                <a
                    href={option.href}
                    onclick={() => (isOpen = false)}
                    class="block py-2 text-gray-600 hover:text-gray-900"
                    class:text-indigo-600={isActive(option.href)}
                    >{option.label}</a
                >
            {/each}

            <div class="m-auto flex flex-row gap-10 pt-5">
                {#each navSocials as social}
                    <a href={social.href}>
                        <Icon
                            icon={social.icon}
                            font-size="24"
                            class="text-gray-600 duration-100 hover:text-indigo-500"
                        ></Icon>
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</nav>