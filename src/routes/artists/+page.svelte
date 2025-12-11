<script>
	import { Skeleton } from '$lib/components/ui/skeleton/index.ts';

	const artists = $state([{ name: 'First Last' }, { name: 'Artist Name' }]);
</script>

<section>
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Artists</h1>
	</div>
	<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
		{#each artists as artist}
			<a
				href={`/shop?artist=${artist.name}`}
				class="w-full border-r-2 border-b-2 border-stone-400 py-8"
			>
				<div class="m-auto w-70">
					<span class="text-lg uppercase">{artist.name}</span>
				</div>
				<div class="m-auto mt-4 h-70 w-70">
					<Skeleton class="m-auto h-full w-full bg-gray-400" />
				</div>
			</a>
		{/each}
	</div>
</section>
