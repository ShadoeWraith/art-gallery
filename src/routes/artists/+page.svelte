<script lang="ts">
	import { goto } from '$app/navigation';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let artists = $derived(data.artists || []);

	const handleArtist = (artist: any) => {
		const artistCopy = JSON.parse(JSON.stringify(artist));
		goto(`/artists/${artist.id}`, {
			state: { art: artistCopy }
		});
	};
</script>

<section class="min-h-screen bg-background text-foreground">
	<div class="flex h-24 w-full items-center border-b border-border px-8">
		<h1 class="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase">
			Directory / <span class="text-foreground">Our Artists</span>
		</h1>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if !artists.length && !data.error}
			{#each Array(8) as _}
				<div class="border-r border-b border-border p-10">
					<div class="mb-6"><Skeleton class="h-6 w-3/4 opacity-50" /></div>
					<div class="aspect-[3/4] w-full bg-stone-100/50"></div>
				</div>
			{/each}
		{:else}
			{#each artists as artist}
				<a
					href={`/artists/${artist.id}`}
					onclick={(e) => {
						e.preventDefault();
						handleArtist(artist);
					}}
					class="group relative border-r border-b border-border p-10 transition-colors duration-500 hover:bg-stone-50/50"
				>
					<div class="relative">
						<div class="mb-6 flex items-start justify-between">
							<h2
								class="text-lg leading-tight font-medium tracking-tight text-foreground uppercase"
							>
								{artist.firstName} <br />
								{artist.lastName}
							</h2>
							<Icon
								icon="ph:arrow-right-thin"
								class="text-stone-300 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-stone-900"
							/>
						</div>

						<div class="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
							{#if artist.profileImageUrl}
								<img
									src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artists/${artist.profileImageUrl}`}
									alt={`${artist.firstName} ${artist.lastName}`}
									class="h-full w-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center bg-stone-50">
									<span class="text-[8px] tracking-[0.3em] text-stone-300 uppercase"
										>Image Missing</span
									>
								</div>
							{/if}
						</div>

						<div class="mt-8 flex items-end justify-between">
							<div>
								<p class="text-[8px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
									Representation
								</p>
								<p class="font-serif text-xs text-stone-500 italic">Exclusive Curator Artist</p>
							</div>
							<span
								class="text-[9px] font-bold tracking-[0.2em] text-stone-900 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							>
								View
							</span>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</section>

<style>
	/* Ensure the grid itself has a top border to complete the look */
	.grid {
		border-top: 1px solid var(--border);
		/* Prevent layout shift on hover if any borders are added */
		box-sizing: border-box;
	}
</style>
