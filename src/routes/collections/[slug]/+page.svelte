<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';

	// In a real app, you'd fetch this based on page.params.id
	const collectionId = page.params.slug;

	if (!collectionId) {
		throw new Error('Collection ID not found');
	}
	// Example data structure for the specific collection
	const collectionData = $derived({
		title: collectionId.charAt(0).toUpperCase() + collectionId.slice(1),
		curator: 'Elena Mensah',
		year: '2025',
		description:
			'An exploration of form and identity within the modern African landscape. This collection brings together voices that challenge traditional boundaries while honoring the deep-rooted heritage of their ancestors.',
		artworks: [
			{
				id: 1,
				title: 'Golden Horizon',
				artist: 'Kwame Adeyemi',
				size: '48 x 60 in',
				aspect: 'aspect-[4/5]'
			},
			{
				id: 2,
				title: 'The Silent Watcher',
				artist: 'Zuri Okoro',
				size: '36 x 36 in',
				aspect: 'aspect-square'
			},
			{
				id: 3,
				title: 'Rhythm of Dust',
				artist: 'Amara Diallo',
				size: '72 x 48 in',
				aspect: 'aspect-[3/2]'
			},
			{
				id: 4,
				title: 'Urban Echoes',
				artist: 'Moussa Sarr',
				size: '24 x 30 in',
				aspect: 'aspect-[4/5]'
			},
			{
				id: 5,
				title: 'Ancestral Thread',
				artist: 'Fatima Biu',
				size: '60 x 60 in',
				aspect: 'aspect-square'
			},
			{
				id: 6,
				title: 'Morning at the Market',
				artist: 'Kofi Boateng',
				size: '40 x 40 in',
				aspect: 'aspect-[2/3]'
			}
		]
	});
</script>

<section class="min-h-screen bg-white">
	<div class="mx-auto max-w-7xl px-8 pt-12 md:px-16">
		<a
			href="/collections"
			class="group inline-flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase transition-colors hover:text-stone-900"
		>
			<span class="h-px w-6 bg-stone-200 transition-all group-hover:w-10 group-hover:bg-stone-900"
			></span>
			Back to Index
		</a>
	</div>

	<header class="mx-auto max-w-7xl px-8 pt-16 pb-20 md:px-16">
		<div class="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-4xl">
				<h1
					class="font-serif text-5xl font-light tracking-tight text-stone-900 md:text-7xl lg:text-8xl"
				>
					{collectionData.title}
				</h1>
			</div>
			<div class="flex gap-10 border-l border-stone-100 pl-8">
				<div class="flex flex-col">
					<span class="text-[8px] font-bold tracking-[0.3em] text-stone-300 uppercase">Curator</span
					>
					<span class="font-sans text-xs text-stone-600">{collectionData.curator}</span>
				</div>
				<div class="flex flex-col">
					<span class="text-[8px] font-bold tracking-[0.3em] text-stone-300 uppercase">Series</span>
					<span class="font-sans text-xs text-stone-600">{collectionData.year}</span>
				</div>
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-7xl px-8 pb-32 md:px-16">
		<div class="columns-1 gap-10 space-y-16 md:columns-2 lg:columns-3 lg:gap-12">
			{#each collectionData.artworks as art}
				<div class="group flex break-inside-avoid flex-col">
					<a
						href="/shop/{art.id}"
						class="relative block overflow-hidden bg-stone-50 transition-all duration-500 hover:shadow-xl hover:shadow-stone-100"
					>
						<div class="{art.aspect} flex w-full items-center justify-center p-8 lg:p-12">
							<div
								class="flex h-full w-full items-center justify-center border border-stone-100 bg-white/50"
							>
								<Icon icon="ph:image-thin" class="text-3xl text-stone-200" />
							</div>
						</div>

						<div
							class="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:bg-stone-900/5 group-hover:opacity-100"
						>
							<span
								class="bg-white/95 px-5 py-2 text-[8px] font-bold tracking-[0.4em] text-stone-900 uppercase"
							>
								Details
							</span>
						</div>
					</a>

					<div class="mt-6 flex flex-col">
						<div class="flex items-baseline justify-between gap-4">
							<h3 class="font-serif text-lg text-stone-900">{art.title}</h3>
						</div>
						<p class="mt-1 text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
							{art.artist}
						</p>
						<p class="mt-2 text-[8px] tracking-[0.1em] text-stone-300 uppercase italic">
							{art.size}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<footer class="border-t border-stone-100 bg-stone-50/30 py-24 text-center">
		<div class="mb-20">
			<a
				href="/shop?collection={collectionId}"
				class="group relative inline-block overflow-hidden border border-stone-900 px-10 py-4"
			>
				<div
					class="absolute inset-0 translate-y-full bg-stone-900 transition-transform duration-300 ease-out group-hover:translate-y-0"
				></div>

				<span
					class="relative z-10 text-[10px] font-bold tracking-[0.4em] text-stone-900 uppercase transition-colors duration-300 group-hover:text-white"
				>
					Shop the {collectionData.title} Collection
				</span>
			</a>
		</div>
	</footer>
</section>

<style>
	/* Responsive masonry gaps */
	.columns-1 {
		column-gap: 2.5rem;
	}
	@media (min-width: 1024px) {
		.columns-1 {
			column-gap: 3rem;
		}
	}
</style>
