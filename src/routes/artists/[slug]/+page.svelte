<script lang="ts">
	import { onMount } from 'svelte';

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
		const navigatedState = history.state?.['sveltekit:states']?.artist;

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

<div class="min-h-screen bg-stone-50 font-serif text-stone-900">
	{#if artist}
		<div class="flex h-16 w-full items-center border-b-2 border-stone-400 bg-white">
			<h1 class="w-full text-center text-4xl tracking-widest uppercase">Artist Profile</h1>
		</div>

		<main class="mx-auto max-w-6xl px-6 py-12">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-4">
					<div class="aspect-[4/5] w-full overflow-hidden border-2 border-stone-400 bg-stone-200">
						{#if artist.imageUrl}
							<img
								src={artist.imageUrl}
								alt={`${artist.firstName} ${artist.lastName}`}
								class="h-full w-full object-cover"
							/>
						{:else}
							<div class="flex h-full items-center justify-center text-stone-400 italic">
								No Image Available
							</div>
						{/if}
					</div>
					<div class="mt-6 border-t border-stone-300 pt-6">
						<h2 class="text-3xl font-light">{artist.firstName}</h2>
						<h2 class="mb-4 text-3xl font-bold">{artist.lastName}</h2>
						<p class="text-sm tracking-tighter text-stone-500 uppercase">
							Contemporary Artist • Uganda
						</p>
					</div>
				</div>

				<div class="md:col-span-8">
					<section class="description-container">
						<h3
							class="mb-6 text-xs tracking-[0.2em] text-stone-400 uppercase underline underline-offset-8"
						>
							Biography
						</h3>
						<div class="text-justify text-xl leading-relaxed text-stone-800">
							{@html artist.description}
						</div>
					</section>
				</div>
			</div>

			<section class="mt-16 border-t-2 border-stone-400 pt-12">
				<div class="mb-8 flex flex-col items-center justify-between md:flex-row">
					<h3 class="text-3xl italic">Artwork</h3>
					<a
						href={`/shop?artist=${encodeURIComponent(artist.firstName + ' ' + artist.lastName)}`}
						class="mt-4 border-b border-stone-900 pb-1 text-sm tracking-widest uppercase transition-all hover:border-stone-500 hover:text-stone-500 md:mt-0"
					>
						Shop
					</a>
				</div>

				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<div
						class="flex aspect-square items-center justify-center border border-stone-300 bg-stone-200 text-xs text-stone-400 italic"
					>
						Artwork I
					</div>
					<div
						class="flex aspect-square items-center justify-center border border-stone-300 bg-stone-200 text-xs text-stone-400 italic"
					>
						Artwork II
					</div>
					<div
						class="flex aspect-square items-center justify-center border border-stone-300 bg-stone-200 text-xs text-stone-400 italic"
					>
						Artwork III
					</div>
				</div>
			</section>
		</main>
	{:else}
		<div class="flex h-screen items-center justify-center">
			<div class="text-center">
				<div
					class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-stone-900"
				></div>
				<p class="animate-pulse font-sans text-stone-400">Loading artist profile...</p>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.description-container p) {
		margin-bottom: 1.8rem;
	}
	:global(.description-container h2) {
		font-size: 1.75rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}
</style>
