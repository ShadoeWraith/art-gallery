<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { stopPropagation } from 'svelte/legacy';

	const { data } = $props();
	let queryParams = data.queryParams;
	let artwork: any = $state([]);
	let startKey: any = $state('');
	let loading: boolean = $state(true);

	onMount(async () => {
		const res = await fetch(`/api/proxy/images${queryParams ? `${queryParams}` : ''}`);
		const json = await res.json();
		artwork = json.Items;
		startKey = json.nextStartKey;
		loading = false;
	});

	let colors = $state([
		{ label: 'Red', color: 'bg-red-500' },
		{ label: 'Orange', color: 'bg-orange-500' },
		{ label: 'Yellow', color: 'bg-yellow-500' },
		{ label: 'Green', color: 'bg-green-500' },
		{ label: 'Blue', color: 'bg-blue-500' },
		{ label: 'Indigo', color: 'bg-indigo-500' },
		{ label: 'Violet', color: 'bg-violet-500' },
		{ label: 'White', color: 'bg-white' },
		{ label: 'Black', color: 'bg-black' }
	]);
	let sizes = $state(['None for now']);
	let artists = $state(['First Last', 'Artist Name', 'Shaun']);

	let showFilters: boolean = $state(false);

	const setQueryParameter = (obj: any, key: string, value: string) => {
		const current = obj[key];

		if (key === 'tags') {
			const tagValues = current ? current.split(',').filter(Boolean) : [];

			if (tagValues.includes(value)) {
				const updated = tagValues.filter((t: string) => t !== value);
				if (updated.length > 0) {
					obj[key] = updated.join(',');
				} else {
					delete obj[key];
				}
			} else {
				tagValues.push(value);
				obj[key] = tagValues.join(',');
			}
		} else if (key !== 'tags') {
			if (current === value) {
				delete obj[key];
			} else {
				obj[key] = value;
			}
		} else {
			obj[key] = value;
		}
	};

	const getArtwork = async (queryString: string) => {
		artwork = [];
		const res = await fetch(`/api/proxy/images?${queryString}`);
		const json = await res.json();

		artwork = json.Items;
		startKey = json.nextStartKey;
	};

	const handleFilters = (type: string, value: string) => {
		let params = new URLSearchParams(window.location.search);
		let obj = Object.fromEntries(params.entries());

		if (obj.startKey) delete obj.startKey;

		setQueryParameter(obj, type, value);

		let queryString = new URLSearchParams(obj).toString();
		goto(`?${queryString}`, { invalidateAll: true });
		getArtwork(queryString);
	};

	const resetFilter = (type: string) => {
		let params = new URLSearchParams(window.location.search);
		let obj = Object.fromEntries(params.entries());

		if (obj[type]) delete obj[type];
		if (obj.startKey) delete obj.startKey;

		const queryString = new URLSearchParams(obj).toString();
		goto(`?${queryString}`, { invalidateAll: true });
		getArtwork(queryString);
	};

	const handleLoadMore = async () => {
		if (!startKey) return;

		const params = new URLSearchParams(window.location.search);
		params.set('startKey', startKey); // don't encode manually — fetch will handle it

		const queryString = params.toString();
		goto(`?${queryString}`, { noScroll: true });

		const res = await fetch(`/api/proxy/images?${queryString}`);
		const json = await res.json();

		artwork.push(...json.Items);
		startKey = json.nextStartKey;
	};
</script>

<section>
	<!-- Header -->
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Shop</h1>
	</div>

	<!-- Mobile Filter Toggle -->
	<div class="flex justify-end border-b-2 border-stone-400 p-4 lg:hidden">
		<button onclick={() => (showFilters = !showFilters)} class="text-lg font-semibold">
			{showFilters ? 'Hide Filters' : 'Show Filters'}
		</button>
	</div>

	<!-- Grid Layout -->
	<div class="grid grid-cols-12">
		<!-- Filters Sidebar -->
		<div
			class={`col-span-12 ${showFilters ? 'flex' : 'hidden'} flex-col border-r-2 border-stone-400 lg:col-span-2 lg:flex`}
		>
			<!-- Color Filter -->
			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Color</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('tags');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 py-4 pb-2">
					{#each colors as color}
						<button
							onclick={() => handleFilters('tags', color.label)}
							class="flex items-center gap-2 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<div class={`h-5 w-5 rounded border border-stone-400 ${color.color}`}></div>
							<span>{color.label}</span>
						</button>
					{/each}
				</Collapsible.Content>
			</Collapsible.Root>

			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Orientation</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('tags');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 py-4 pb-2">
					{#each sizes as size}
						<div
							class="flex items-center gap-4 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<span>{size}</span>
						</div>
					{/each}
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- Size Filter -->
			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Size</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('tags');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 py-4 pb-2">
					{#each sizes as size}
						<div
							class="flex items-center gap-4 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<span>{size}</span>
						</div>
					{/each}
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- Artist Filter -->
			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Artist</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('tags');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 py-4 pb-2">
					{#each artists as artist}
						<button
							onclick={() => handleFilters('artist', artist)}
							class="flex items-center gap-4 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<span>{artist}</span>
						</button>
					{/each}
				</Collapsible.Content>
			</Collapsible.Root>
		</div>

		<!-- Artwork Grid -->
		<div
			class="col-span-12 grid grid-cols-1 border-r-2 border-stone-400 sm:grid-cols-2 md:grid-cols-3 lg:col-span-10 lg:grid-cols-4"
		>
			{#if loading}
				{#each Array(10) as _}
					<div class="w-full border-r-2 border-b-2 border-stone-400 py-8">
						<div class="h-80 px-8">
							<Skeleton class="m-auto h-80 w-full bg-gray-400" />
						</div>
						<div class="m-auto w-full px-4 pt-2">
							<Skeleton class="mb-2 h-6 w-1/2 bg-gray-400" />
							<Skeleton class="h-8 w-3/4 bg-gray-400" />
						</div>
					</div>
				{/each}
			{:else if artwork.length === 0}
				<div class="col-span-4 m-auto grid min-h-screen w-full place-items-center text-3xl">
					No results found
				</div>
			{:else}
				{#each artwork as art}
					<a
						href={`shop/${art.id}`}
						class="max-h-[28rem] w-full border-r-2 border-b-2 border-stone-400 py-8"
					>
						<div class="h-80 px-8">
							<img src={art.imageUrl} alt="" class="m-auto h-80 object-contain" />
						</div>
						<div class="m-auto w-full px-4 pt-2">
							<h4 class="w-fit font-semibold uppercase">{art.artist}</h4>
							<h3 class="text-2xl">{art.title}</h3>
						</div>
					</a>
				{/each}
			{/if}
		</div>

		<!-- Load More Button -->
		{#if startKey}
			<div class="col-span-full grid place-content-center border-t-2 border-stone-400 py-12">
				<button
					onclick={handleLoadMore}
					class="cursor-pointer rounded-md border-2 border-indigo-500 bg-indigo-700 px-12 py-4 text-xl text-gray-200"
				>
					Load More
				</button>
			</div>
		{/if}
	</div>
</section>
