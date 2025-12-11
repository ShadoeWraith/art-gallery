<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { goto } from '$app/navigation';

	const { data } = $props();
	let queryParams = data.queryParams;
	let artwork: any = $state([]);
	let startKey: any = $state('');
	let loading: boolean = $state(true);
	let loadMoreDisabled: boolean = $state(false);

	onMount(async () => {
		const fullUrl = `/api/proxy/images${queryParams ? `${queryParams}` : ''}`;
		const cached = loadFromLocalStorage('artworkData');

		if (cached && cached.fullUrl === fullUrl && cached.fullUrl !== "/api/proxy/images") {
			artwork = cached.items;
			startKey = cached.startKey;
			loading = false;
		} else {
			const res = await fetch(fullUrl);
			const json = await res.json();

			artwork = json.Items;
			startKey = json.nextStartKey;
			loading = false;

			saveToLocalStorage('artworkData', {
				items: json.Items,
				startKey: json.nextStartKey,
				fullUrl
			});
		}
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
	let orientation = $state(['Horizontal', 'Vertical']);
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
		const fullUrl = `/api/proxy/images?${queryString}`;
		const cached = loadFromLocalStorage('artworkData');

		if (cached && cached.fullUrl === fullUrl) {
			artwork = cached.items;
			startKey = cached.startKey;
		} else {
			const res = await fetch(fullUrl);
			const json = await res.json();

			artwork = json.Items;
			startKey = json.nextStartKey;

			saveToLocalStorage('artworkData', {
				items: json.Items,
				startKey: json.nextStartKey,
				fullUrl
			});
		}
	};

	const saveToLocalStorage = (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	const loadFromLocalStorage = (key: string) => {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	};

	const handleFilters = (type: string, value: string) => {
		let params = new URLSearchParams(window.location.search);
		let obj = Object.fromEntries(params.entries());

		if (obj.startKey) delete obj.startKey;

		setQueryParameter(obj, type, value);

		let queryString = new URLSearchParams(obj).toString();
		goto(`?${queryString}`, { noScroll: true });
		getArtwork(queryString);
	};

	const resetFilter = (type: string, subType: string | null = null) => {
		let params = new URLSearchParams(window.location.search);
		let obj = Object.fromEntries(params.entries());

		if (obj[type]) delete obj[type];
		if (obj.startKey) delete obj.startKey;

		const queryString = new URLSearchParams(obj).toString();
		goto(`?${queryString}`, { noScroll: true });
		getArtwork(queryString);
	};

	const clearFilters = () => {
		const queryString = '';
		goto('/shop', { noScroll: true });
		getArtwork(queryString);
	};

	const handleLoadMore = async () => {
		if (!startKey) return;
		loadMoreDisabled = true;

		const params = new URLSearchParams(window.location.search);
		params.set('startKey', startKey);

		const queryString = params.toString();
		const fullUrl = `/api/proxy/images?${queryString}`;
		const cached = loadFromLocalStorage('artworkData');

		goto(`?${queryString}`, { noScroll: true });

		if (!cached || cached.fullUrl !== fullUrl) {
			const res = await fetch(fullUrl);
			const json = await res.json();

			artwork.push(...json.Items);
			startKey = json.nextStartKey;

			loadMoreDisabled = false;

			saveToLocalStorage('artworkData', {
				items: artwork,
				startKey: json.nextStartKey,
				fullUrl
			});
		}
	};

	const handleArtwork = (art: any) => {
		const artCopy = JSON.parse(JSON.stringify(art));

		console.log(artCopy);

		goto(`/shop/${art.id}`, {
			state: { art: artCopy }
		});
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
			class={`col-span-12 ${showFilters ? 'flex' : 'hidden'} flex-col border-r-2 border-b-2 border-stone-400 [box-shadow:4px_0_6px_-2px_rgba(0,0,0,0.1)] lg:col-span-2 lg:flex`}
		>
			<div class="flex w-full items-center border-b-2 border-stone-400 px-4 py-2">
				<h4 class="text-lg font-semibold">Filters</h4>
				<div class="ml-auto flex items-center gap-1">
					<button
						onclick={clearFilters}
						class="text-right text-sm font-bold duration-150 hover:text-red-600 cursor-pointer"
					>
						Clear Filters
					</button>
				</div>
			</div>
			<!-- Color Filter -->
			<Collapsible.Root open class="">
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Color</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('tags', 'color');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600 cursor-pointer"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 bg-stone-300 py-4 pb-2">
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

			<!-- Orientation Filter -->
			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Orientation</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('tags', 'orientation');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600 cursor-pointer"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 bg-stone-300 py-4 pb-2">
					{#each orientation as o}
						<button
							onclick={() => handleFilters('tags', o)}
							class="flex items-center gap-4 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<span>{o}</span>
						</button>
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
									resetFilter('tags', 'size');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600 cursor-pointer"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 bg-stone-300 py-4 pb-2">
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
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4 shadow-lg">
						<h4 class="text-lg">Artist</h4>
						<div class="ml-auto flex items-center gap-1">
							<button
								onclick={(event) => {
									event.stopPropagation();
									resetFilter('artist');
								}}
								class="text-right text-sm font-bold duration-150 hover:text-indigo-600 cursor-pointer"
							>
								Reset
							</button>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 bg-stone-300 py-4 pb-2">
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
				<div
					class="col-span-4 m-auto w-full py-28 text-center text-3xl md:min-h-[50vh] lg:min-h-screen"
				>
					No results found
				</div>
			{:else}
				{#each artwork as art}
					<button
						onclick={() => handleArtwork(art)}
						class="max-h-[28rem] w-full border-r-2 border-b-2 border-stone-400 py-8 cursor-pointer"
					>
						<div class="h-80 mx-4 p-6 bg-stone-300 m-auto rounded">
							<img
								src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artwork/${art.imageUrl}`}
								alt={`image of ${art.title} by: ${art.artist}`}
								class="m-auto h-full bg-transparent object-contain"
							/>
						</div>
						<div class="m-auto w-full px-4 pt-2">
							<h4 class="w-fit font-semibold uppercase">{art.artist}</h4>
							<h3 class="text-2xl">{art.title}</h3>
						</div>
					</button>
				{/each}
			{/if}
		</div>

		<!-- Load More Button -->
		{#if startKey}
			<div class="col-span-full grid place-content-center border-t border-stone-400 py-4">
				<button
					disabled={loadMoreDisabled}
					onclick={handleLoadMore}
					class="cursor-pointer rounded-md border-2 border-indigo-500 bg-indigo-700 px-8 py-2 text-xl font-semibold text-gray-200 duration-150 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400"
				>
					Load More
				</button>
			</div>
		{:else}
			<div class="col-span-full grid place-content-center border-t border-stone-400 py-8"></div>
		{/if}
	</div>
</section>
