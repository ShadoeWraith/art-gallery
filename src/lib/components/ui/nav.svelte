<script>
	import Icon from '@iconify/svelte';

	let isOpen = false;
</script>

<nav class="relative border-b border-stone-400 bg-gray-200">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex flex-shrink-0 items-center">
				<a href="/" class="text-xl font-bold text-gray-800">ArtGallery</a>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden items-center space-x-8 md:flex">
				<a href="/shop" class="group relative text-gray-600 hover:text-gray-900">
					<p class="capitalize">Shop</p>
					<span
						class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
					></span>
				</a>
				<a href="/artists" class="group relative text-gray-600 hover:text-gray-900">
					<p class="capitalize">Artists</p>
					<span
						class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
					></span>
				</a>
				<a href="/collections" class="group relative text-gray-600 hover:text-gray-900">
					<p class="capitalize">Collections</p>
					<span
						class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
					></span>
				</a>
				<a href="/news" class="group relative text-gray-600 hover:text-gray-900">
					<p class="capitalize">News</p>
					<span
						class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
					></span>
				</a>
				<a href="/about" class="group relative text-gray-600 hover:text-gray-900">
					<p class="capitalize">About</p>
					<span
						class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
					></span>
				</a>
				<a href="/contact" class="group relative text-gray-600 hover:text-gray-900">
					<p class="capitalize">Contact</p>
					<span
						class="absolute top-8 h-1 w-full origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
					></span>
				</a>

				<div class="flex flex-row gap-3">
					<a href="/facebook">
						<Icon
							icon="mdi:facebook"
							font-size="28"
							class="text-gray-600 duration-100 hover:text-indigo-500"
						></Icon>
					</a>

					<a href="/instagram">
						<Icon
							icon="mdi:instagram"
							font-size="28"
							class="text-gray-600 duration-100 hover:text-indigo-500"
						></Icon>
					</a>

					<a href="/x">
						<Icon
							icon="ri:twitter-x-fill"
							font-size="28"
							class="text-gray-600 duration-100 hover:text-indigo-500"
						></Icon>
					</a>
					<a href="/pinterest">
						<Icon
							icon="mdi:pinterest"
							font-size="28"
							class="text-gray-600 duration-100 hover:text-indigo-500"
						></Icon>
					</a>
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button
					aria-label="mobile-menu-button"
					on:click={() => (isOpen = !isOpen)}
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
		<div class="absolute top-12 z-20 h-fit w-full bg-gray-200 px-4 pt-2 pb-3 md:hidden">
			<a href="/shop" class="block py-2 text-gray-600 hover:text-gray-900">Shop</a>
			<a href="/artists" class="block py-2 text-gray-600 hover:text-gray-900">Artists</a>
			<a href="/collections" class="block py-2 text-gray-600 hover:text-gray-900">Collections</a>
			<a href="/news" class="block py-2 text-gray-600 hover:text-gray-900">News</a>
			<a href="/about" class="block py-2 text-gray-600 hover:text-gray-900">About</a>
			<a href="/contact" class="block py-2 text-gray-600 hover:text-gray-900">Contact</a>

			<div class="m-auto flex flex-row gap-10 pt-5">
				<a href="/facebook">
					<Icon
						icon="mdi:facebook"
						font-size="24"
						class="text-gray-600 duration-100 hover:text-indigo-500"
					></Icon>
				</a>

				<a href="/instagram">
					<Icon
						icon="mdi:instagram"
						font-size="24"
						class="text-gray-600 duration-100 hover:text-indigo-500"
					></Icon>
				</a>

				<a href="/x">
					<Icon
						icon="ri:twitter-x-fill"
						font-size="24"
						class="text-gray-600 duration-100 hover:text-indigo-500"
					></Icon>
				</a>
				<a href="/pinterest">
					<Icon
						icon="mdi:pinterest"
						font-size="24"
						class="text-gray-600 duration-100 hover:text-indigo-500"
					></Icon>
				</a>
			</div>
		</div>
	{/if}
</nav>
