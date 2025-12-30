<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';

	let isOpen = $state(false);

	let navOptions = [
		{ label: 'Shop', href: '/shop' },
		{ label: 'Collections', href: '/collections' }, // Added as a direct button
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

	function isActive(href: string): boolean {
		const currentPath = page.url.pathname;
		if (currentPath === href) return true;
		if (currentPath.startsWith(href + '/')) return true;
		return false;
	}
</script>

<nav class="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-6 lg:px-12">
		<div class="flex h-20 items-center justify-between">
			<div class="flex flex-shrink-0 items-center">
				<a href="/" onclick={() => (isOpen = false)} class="group flex flex-col leading-none">
					<span class="font-serif text-2xl tracking-tighter text-stone-900">Africa Curated</span>
					<span
						class="text-[10px] tracking-[0.4em] text-stone-400 uppercase transition-colors group-hover:text-stone-600"
						>Art Gallery</span
					>
				</a>
			</div>

			<div class="hidden items-center space-x-8 lg:flex">
				<div class="flex space-x-8 border-r border-stone-200 pr-8">
					{#each navOptions as option}
						<a
							href={option.href}
							class="relative text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-stone-900"
							class:text-stone-900={isActive(option.href)}
							class:text-stone-400={!isActive(option.href)}
						>
							{option.label}
							{#if isActive(option.href)}
								<span class="absolute -bottom-1 left-0 h-[1px] w-full bg-stone-900"></span>
							{/if}
						</a>
					{/each}
				</div>

				<div class="flex flex-row gap-5">
					{#each navSocials as social}
						<a href={social.href} class="text-stone-400 transition-colors hover:text-stone-900">
							<Icon icon={social.icon} font-size="20"></Icon>
						</a>
					{/each}
				</div>
			</div>

			<div class="flex items-center lg:hidden">
				<button
					aria-label="mobile-menu-button"
					onclick={() => (isOpen = !isOpen)}
					class="text-stone-600 hover:text-stone-900 focus:outline-none"
				>
					<Icon icon={isOpen ? 'ph:x-light' : 'ph:list-light'} font-size="32" />
				</button>
			</div>
		</div>
	</div>

	{#if isOpen}
		<div class="fixed inset-0 top-20 z-40 h-screen w-full bg-white px-8 pt-12 lg:hidden">
			<div class="flex flex-col space-y-8">
				{#each navOptions as option}
					<a
						href={option.href}
						onclick={() => (isOpen = false)}
						class="border-b border-stone-100 pb-4 font-serif text-4xl text-stone-900 italic"
					>
						{option.label}
					</a>
				{/each}
			</div>

			<div class="mt-12 flex flex-row gap-8 border-t border-stone-100 pt-12">
				{#each navSocials as social}
					<a href={social.href} class="text-stone-400">
						<Icon icon={social.icon} font-size="28"></Icon>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>

<style>
	:global(body.menu-open) {
		overflow: hidden;
	}
</style>
