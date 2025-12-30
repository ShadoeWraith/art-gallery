<script lang="ts">
	import { goto } from '$app/navigation';
	import { Skeleton } from '$lib/components/ui/skeleton/index.ts';
	import { onMount } from 'svelte';

	let artists: any[] = $state([]);

	onMount(async () => {
		const res = await fetch('/api/proxy/artist');
		const json = await res.json();

		artists = json;

		console.log(artists);
	});

	const handleArtist = (artist: any) => {
		const artistCopy = JSON.parse(JSON.stringify(artist));

		goto(`/artists/${artist.id}`, {
			state: { art: artistCopy }
		});
	};
</script>

<section>
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Artists</h1>
	</div>
	<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
		{#each artists as artist}
			<a
				href={`/artists/${artist.id}`}
				onclick={() => handleArtist(artist)}
				class="w-full border-r-2 border-b-2 border-stone-400 py-8"
			>
				<div class="m-auto w-70">
					<span class="text-lg uppercase">{artist.firstName} {artist.lastName}</span>
				</div>
				<div class="m-auto mt-4 h-70 w-70">
					<Skeleton class="m-auto h-full w-full bg-gray-400" />
				</div>
			</a>
		{/each}
	</div>
</section>
