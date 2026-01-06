<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Icon from '@iconify/svelte';

	// Simplified list for footer columns
	const navLinks = [
		{ label: 'Shop', href: '/shop' },
		{ label: 'Collections', href: '/collections' },
		{ label: 'Artists', href: '/artists' },
		{ label: 'About Us', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<footer class="w-full border-t border-stone-200 bg-stone-50 pt-16 pb-8">
	<div class="mx-auto max-w-7xl px-6 lg:px-12">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-24">
			<div class="flex flex-col space-y-4">
				<div class="flex flex-col leading-none">
					<span class="font-serif text-xl tracking-tighter text-stone-900">Africa Curated</span>
					<span class="text-[9px] tracking-[0.3em] text-stone-400 uppercase">Art Gallery</span>
				</div>
				<p class="font-sans text-sm leading-relaxed text-stone-500">
					Bridging the narrative of the African experience through universal artistic languages.
				</p>
			</div>

			<div class="flex flex-col space-y-4">
				<h5 class="text-xs font-semibold tracking-[0.2em] text-stone-900 uppercase">Gallery</h5>
				<nav class="flex flex-col space-y-2">
					<a
						href="/shop"
						class="text-sm tracking-wider text-stone-500 uppercase transition-colors hover:text-stone-900"
						>Shop All</a
					>
					<a
						href="/collections"
						class="text-sm tracking-wider text-stone-500 uppercase transition-colors hover:text-stone-900"
						>Collections</a
					>
					<a
						href="/artists"
						class="text-sm tracking-wider text-stone-500 uppercase transition-colors hover:text-stone-900"
						>By Artist</a
					>
				</nav>
			</div>

			<div class="flex flex-col space-y-4">
				<h5 class="text-xs font-semibold tracking-[0.2em] text-stone-900 uppercase">Company</h5>
				<nav class="flex flex-col space-y-2">
					<a
						href="/about"
						class="text-sm tracking-wider text-stone-500 uppercase transition-colors hover:text-stone-900"
						>Our Story</a
					>
					<a
						href="/contact"
						class="text-sm tracking-wider text-stone-500 uppercase transition-colors hover:text-stone-900"
						>Contact</a
					>
				</nav>
			</div>

			<div class="flex flex-col space-y-6">
				<h5 class="text-xs font-semibold tracking-[0.2em] text-stone-900 uppercase">Connect</h5>
				<div class="flex flex-col space-y-1 text-sm text-stone-500">
					<a
						href="mailto:hello@africacurated.com"
						class="text-stone-900 underline underline-offset-4 transition-colors hover:text-stone-600"
					>
						hello@africacurated.com
					</a>
					<p class="pt-2">2618 San Miguel Suite 267</p>
					<p>Newport Beach, CA 92660</p>
				</div>

				<div class="flex gap-4">
					{#each ['mdi:facebook', 'mdi:instagram', 'ri:twitter-x-fill', 'mdi:pinterest'] as icon}
						<a href="/" class="text-stone-400 transition-colors hover:text-stone-900">
							<Icon {icon} font-size="24" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-20 border-t border-stone-200 pt-12">
			<div class="flex flex-col items-center justify-between gap-8 md:flex-row">
				<div class="text-center md:text-left">
					<h5 class="text-sm font-medium text-stone-900">Join our mailing list</h5>
					<p class="mt-1 text-xs tracking-widest text-stone-400 uppercase">
						Stay updated on new exhibitions
					</p>
				</div>
				<form class="flex w-full max-w-sm gap-2">
					<Input
						type="email"
						placeholder="Email Address"
						class="rounded-none border-stone-200 bg-transparent text-sm placeholder:text-stone-400 focus-visible:ring-stone-400"
					/>
					<Button
						type="submit"
						class="rounded-none bg-stone-900 px-6 text-xs tracking-widest text-white uppercase hover:bg-stone-700"
					>
						Join
					</Button>
				</form>
			</div>
		</div>

		<div class="mt-16 text-center">
			<span class="text-[10px] tracking-[0.2em] text-stone-400 uppercase">
				&copy; 2025 Africa Curated. All rights reserved.
			</span>
		</div>
	</div>
</footer>
