<script>
	import Icon from '@iconify/svelte';

	let isOpen = $state(false);

	let navOptions = [
		{ label: 'Shop', href: 'shop' },
		{ label: 'Artists', href: 'artists' },
		{ label: 'Collections', href: 'collections' },
		{ label: 'News', href: 'news' },
		{ label: 'About Us', href: 'about' },
		{ label: 'Contact', href: 'contact' }
	];

	let navSocials = [
		{ icon: 'mdi:facebook', href: 'facebook' },
		{ icon: 'mdi:instagram', href: 'instagram' },
		{ icon: 'ri:twitter-x-fill', href: 'x' },
		{ icon: 'mdi:pinterest', href: 'pinterest' }
	];
</script>

<nav class="relative border-b border-stone-400 bg-[#e6e6e6]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex flex-shrink-0 items-center">
				<a href="/" onclick={() => (isOpen = false)} class="text-xl font-bold text-gray-800"
					>ArtGallery</a
				>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden items-center space-x-8 md:flex">
				{#each navOptions as option}
					<a href={option.href} class="group relative text-gray-600 hover:text-gray-900">
						<p class="capitalize">{option.label}</p>
						<span
							class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
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

			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button
					aria-label="mobile-menu-button"
					onclick={() => (isOpen = !isOpen)}
					class="text-gray-600 hover:text-gray-900 focus:outline-none"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isOpen}
		<div class="absolute top-12 z-20 h-fit w-full bg-[#e6e6e6] px-4 pt-2 pb-3 md:hidden">
			{#each navOptions as option}
				<a
					href={option.href}
					onclick={() => (isOpen = false)}
					class="block py-2 text-gray-600 hover:text-gray-900">{option.label}</a
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
