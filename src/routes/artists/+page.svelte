<script>
	import { Skeleton } from '$lib/components/ui/skeleton/index.ts';

	const artists = $state([{ name: 'First Last' }, { name: 'Artist Name' }]);
</script>

<section>
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Artists</h1>
	</div>
	<div class="grid grid-cols-3">
		{#each artists as artist}
			<a
				href={`/shop?artist=${artist.name}`}
				class="w-full border-r-2 border-b-2 border-stone-400 py-8"
			>
				<div class="h-80 px-8">
					<Skeleton class="m-auto h-80 w-full bg-gray-400" />
				</div>
				<div class="w-full px-4 pt-2">
					<!-- <Skeleton class="m-auto h-8 w-1/2 bg-gray-400" /> -->
					<span class="m-auto grid place-items-center uppercase">Click to test filter</span>
				</div>
			</a>
		{/each}
	</div>
</section>
