<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	// Assuming you're using this for consistency

	interface Artist {
		id: string;
		firstName: string;
		lastName: string;
		description: string;
		imageUrl?: string;
	}

	let { data } = $props();
	let artist = $state<Artist | null>(null);

	onMount(async () => {
		// Corrected state key to match your handleArtist function ('art')
		const navigatedState = history.state?.['sveltekit:states']?.art;

		if (navigatedState) {
			artist = navigatedState;
		} else {
			try {
				const res = await fetch(`/api/proxy/artist?id=${data.slug}`);
				if (res.ok) {
					artist = await res.json();
				}
			} catch (err) {
				console.error('Fetch error:', err);
			}
		}
	});
</script>

<div class="min-h-screen bg-white font-serif text-stone-900">
	{#if artist}
		<div class="flex h-12 w-full items-center border-b border-stone-200 bg-white px-6">
			<a
				href="/artists"
				class="flex items-center gap-2 text-[10px] tracking-[0.2em] text-stone-400 uppercase transition-colors hover:text-stone-900"
			>
				<Icon icon="ph:arrow-left-light" class="text-lg" />
				Back to Directory
			</a>
		</div>

		<main class="mx-auto max-w-7xl px-8 py-16 lg:py-24">
			<div class="grid grid-cols-1 gap-16 lg:grid-cols-12">
				<div class="lg:top-24 lg:col-span-5 lg:self-start">
					<div class="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 shadow-2xl">
						{#if artist.imageUrl}
							<img
								src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artists/${artist.imageUrl}`}
								alt={`${artist.firstName} ${artist.lastName}`}
								class="h-full w-full object-cover"
							/>
						{:else}
							<div
								class="flex h-full items-center justify-center text-xs tracking-widest text-stone-300 uppercase"
							>
								No Portrait Available
							</div>
						{/if}
					</div>

					<div class="mt-12">
						<p class="mb-2 text-[10px] tracking-[0.4em] text-stone-400 uppercase">
							Featured Artist
						</p>
						<h1 class="text-5xl font-medium tracking-tighter uppercase md:text-6xl lg:text-7xl">
							{artist.firstName}
							<span class="block">{artist.lastName}</span>
						</h1>
						<div class="mt-8 h-px w-24 bg-stone-900"></div>
					</div>
				</div>

				<div class="lg:col-span-7">
					<section class="description-container">
						<h3 class="mb-10 text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">
							Biography & Artistic Vision
						</h3>
						<div
							class="font-sans text-lg leading-relaxed text-stone-600 lg:text-xl lg:leading-loose"
						>
							{@html artist.description}
						</div>
					</section>

					<div class="mt-16 border-t border-stone-100 pt-16">
						<Button
							href={`/shop?artist=${encodeURIComponent(artist.firstName + ' ' + artist.lastName)}`}
							label="View Available Works"
						/>
					</div>
				</div>
			</div>

			<section class="mt-32 border-t border-stone-200 pt-20">
				<div class="mb-12 flex items-baseline justify-between">
					<h3 class="text-2xl font-medium tracking-tight uppercase">Featured Portfolio</h3>
					<p class="text-xs tracking-widest text-stone-400 uppercase">Curated Selection</p>
				</div>

				<div class="grid grid-cols-1 gap-1 border-t border-l border-stone-100 sm:grid-cols-3">
					{#each Array(3) as _, i}
						<div
							class="group flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden border-r border-b border-stone-100 bg-stone-50"
						>
							<div
								class="text-[10px] tracking-[0.3em] text-stone-300 uppercase transition-colors group-hover:text-stone-900"
							>
								Exhibition Piece {i + 1}
							</div>
							<div
								class="mt-4 h-px w-0 bg-stone-900 transition-all duration-500 group-hover:w-12"
							></div>
						</div>
					{/each}
				</div>
			</section>
		</main>
	{:else}
		<div class="flex h-screen items-center justify-center bg-white">
			<div class="flex flex-col items-center">
				<div class="h-12 w-px animate-bounce bg-stone-200"></div>
				<p class="mt-4 text-[10px] tracking-[0.5em] text-stone-400 uppercase">Loading Artist</p>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.description-container p) {
		margin-bottom: 2rem;
	}
	:global(.description-container h2) {
		font-family: ui-serif, Georgia, serif;
		font-size: 2rem;
		margin-top: 3rem;
		margin-bottom: 1.5rem;
		font-weight: 400;
		color: #1c1917; /* stone-900 */
		letter-spacing: -0.025em;
	}
	/* Custom Scrollbar for the sticky sidebar */
	main {
		scrollbar-width: thin;
		scrollbar-color: #e7e5e4 transparent;
	}
</style>
