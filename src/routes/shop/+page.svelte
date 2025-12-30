<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { data } = $props();
	let queryParams = data.queryParams;
	let artwork: any = $state([]);
	let artists: any = $state([]);
	let loadingArtists: boolean = $state(true);
	let startKey: any = $state('');
	let loading: boolean = $state(true);
	let loadMoreDisabled: boolean = $state(false);
	let isMobileMenuOpen = $state(false);

	onMount(async () => {
		const fullUrl = `/api/proxy/images${queryParams ? `${queryParams}` : ''}`;
		const cached = loadFromLocalStorage('artworkData');

		// --- Fetch Artists (Fresh every time) ---
		const fetchArtists = async () => {
			try {
				const res = await fetch('/api/proxy/artist');
				if (res.ok) {
					artists = await res.json();
				}
			} catch (e) {
				console.error('Failed to fetch artists', e);
			} finally {
				loadingArtists = false;
			}
		};

		// --- Fetch Artwork (Your existing logic) ---
		const fetchArtwork = async () => {
			if (cached && cached.fullUrl === fullUrl && cached.fullUrl !== '/api/proxy/images') {
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
		};

		// Trigger both
		fetchArtists();
		fetchArtwork();
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

		goto(`/shop/${art.id}`, {
			state: { art: artCopy }
		});
	};
</script>

<section class="min-h-screen bg-white font-serif text-stone-900">
	<div class="flex h-24 w-full items-center border-b border-stone-200 px-8">
		<h1 class="text-xs tracking-[0.4em] text-stone-400 uppercase">
			Collection / <span class="text-stone-900">Shop All</span>
		</h1>
	</div>

	<div class="grid grid-cols-12">
		{#if isMobileMenuOpen}
			<div
				role="presentation"
				onclick={() => (isMobileMenuOpen = false)}
				class="fixed inset-0 z-[60] bg-stone-900/40 backdrop-blur-sm transition-all duration-500 lg:hidden"
			></div>
		{/if}

		<aside
			class="
        /* MOBILE BOTTOM SHEET */
        /* DESKTOP SIDEBAR */ fixed inset-x-0 bottom-0 z-[70] flex h-[85vh] flex-col
        rounded-t-3xl border-t border-stone-200
        
        bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        lg:visible lg:sticky lg:top-20 lg:z-10 lg:col-span-2 lg:flex lg:h-[calc(100vh-5rem)] lg:translate-y-0 lg:rounded-none lg:border-t-0 lg:border-r
        
        {isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}
    "
		>
			<div class="flex w-full items-center border-b border-stone-100 px-8 py-6">
				<div class="flex flex-1 items-baseline justify-between pr-4">
					<h4 class="text-[10px] font-bold tracking-[0.2em] text-stone-900 uppercase">Filter By</h4>
					{#if page.url.searchParams.size > 0}
						<button
							onclick={clearFilters}
							class="text-[9px] font-bold tracking-widest text-red-700 uppercase underline underline-offset-[3px] transition-colors hover:text-red-800"
						>
							Clear All
						</button>
					{/if}
				</div>

				<button
					onclick={() => (isMobileMenuOpen = false)}
					class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 lg:hidden"
				>
					<span class="rotate-45 text-2xl leading-none font-light text-stone-400">+</span>
				</button>
			</div>

			<div class="custom-scrollbar flex-1 overflow-y-auto overscroll-contain px-2 pb-32">
				<Collapsible.Root open>
					<Collapsible.Trigger
						class="group w-full border-b border-stone-100 px-6 py-5 transition-colors hover:bg-stone-50"
					>
						<div class="flex w-full items-baseline">
							<h4 class="text-[10px] font-bold tracking-[0.2em] text-stone-900 uppercase">
								Orientation
							</h4>
							<div class="ml-auto flex items-center gap-4">
								<button
									onclick={(e) => {
										e.stopPropagation();
										resetFilter('tags');
									}}
									class="text-[9px] font-bold tracking-widest text-stone-400 uppercase underline underline-offset-[3px] hover:text-stone-900"
								>
									Reset
								</button>
								<span
									class="text-lg font-light text-stone-300 transition-transform duration-300 group-data-[state=open]:rotate-45"
									>+</span
								>
							</div>
						</div>
					</Collapsible.Trigger>
					<Collapsible.Content class="overflow-hidden">
						<div class="flex flex-col space-y-0.5 py-2">
							{#each orientation as o}
								<button
									onclick={() => handleFilters('tags', o)}
									class="flex w-full items-center gap-4 px-6 py-4 text-left text-[9px] tracking-[0.15em] uppercase transition-all hover:bg-stone-50"
									class:bg-stone-50={page.url.searchParams.get('tags')?.split(',').includes(o)}
								>
									<div
										class="flex h-4 w-4 shrink-0 items-center justify-center border border-stone-200 bg-white"
									>
										<div
											class="h-2 w-2 bg-stone-900 transition-all duration-300
                {page.url.searchParams.get('tags')?.split(',').includes(o)
												? 'scale-100'
												: 'scale-0'}"
										></div>
									</div>
									<span
										class={page.url.searchParams.get('tags')?.split(',').includes(o)
											? 'font-bold text-stone-900'
											: 'text-stone-500'}
									>
										{o}
									</span>
								</button>
							{/each}
						</div>
					</Collapsible.Content>
				</Collapsible.Root>

				<Collapsible.Root open>
					<Collapsible.Trigger
						class="group w-full border-b border-stone-100 px-6 py-5 hover:bg-stone-50"
					>
						<div class="flex w-full items-baseline">
							<h4 class="text-[10px] font-bold tracking-[0.2em] text-stone-900 uppercase">Color</h4>
							<div class="ml-auto flex items-center gap-4">
								<button
									onclick={(e) => {
										e.stopPropagation();
										resetFilter('tags');
									}}
									class="text-[9px] font-bold tracking-widest text-stone-400 uppercase underline underline-offset-[3px] hover:text-stone-900"
								>
									Reset
								</button>
								<span
									class="text-lg font-light text-stone-300 transition-transform duration-300 group-data-[state=open]:rotate-45"
									>+</span
								>
							</div>
						</div>
					</Collapsible.Trigger>
					<Collapsible.Content class="overflow-hidden">
						<div class="grid grid-cols-1 py-2">
							{#each colors as color}
								<button
									onclick={() => handleFilters('tags', color.label)}
									class="flex w-full items-center gap-4 px-6 py-4 text-[9px] tracking-[0.15em] uppercase transition-all hover:bg-stone-50"
								>
									<div
										class={`h-3 w-3 shrink-0 rounded-full ring-1 ring-transparent ring-offset-2 transition-all ${color.color} ${page.url.searchParams.get('tags')?.includes(color.label) ? 'ring-stone-400' : ''}`}
									></div>
									<span
										class={page.url.searchParams.get('tags')?.includes(color.label)
											? 'font-bold text-stone-900'
											: 'text-stone-500'}>{color.label}</span
									>
								</button>
							{/each}
						</div>
					</Collapsible.Content>
				</Collapsible.Root>

				<Collapsible.Root open>
					<Collapsible.Trigger
						class="group w-full border-b border-stone-100 px-6 py-5 hover:bg-stone-50"
					>
						<div class="flex w-full items-baseline">
							<h4 class="text-[10px] font-bold tracking-[0.2em] text-stone-900 uppercase">
								Artist
							</h4>
							<div class="ml-auto flex items-center gap-4">
								<button
									onclick={(e) => {
										e.stopPropagation();
										resetFilter('artist');
									}}
									class="text-[9px] font-bold tracking-widest text-stone-400 uppercase underline underline-offset-[3px] hover:text-stone-900"
								>
									Reset
								</button>
								<span
									class="text-lg font-light text-stone-300 transition-transform duration-300 group-data-[state=open]:rotate-45"
									>+</span
								>
							</div>
						</div>
					</Collapsible.Trigger>
					<Collapsible.Content class="overflow-hidden">
						<div class="flex flex-col py-2">
							{#each artists as artist}
								{@const fullName = `${artist.firstName} ${artist.lastName}`}
								<button
									onclick={() => handleFilters('artist', fullName)}
									class="w-full px-6 py-4 text-left text-[9px] tracking-[0.15em] uppercase transition-all hover:bg-stone-50"
									class:text-stone-900={page.url.searchParams
										.get('artist')
										?.split(',')
										.includes(fullName)}
									class:font-bold={page.url.searchParams
										.get('artist')
										?.split(',')
										.includes(fullName)}
									class:text-stone-500={!page.url.searchParams
										.get('artist')
										?.split(',')
										.includes(fullName)}
								>
									{fullName}
								</button>
							{/each}
						</div>
					</Collapsible.Content>
				</Collapsible.Root>
			</div>

			<div class="mt-auto border-t border-stone-100 bg-white p-6 lg:hidden">
				<button
					onclick={() => (isMobileMenuOpen = false)}
					class="w-full bg-stone-900 py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase shadow-xl transition-transform active:scale-[0.98]"
				>
					Apply & Show Results
				</button>
			</div>
		</aside>

		<style>
			.custom-scrollbar::-webkit-scrollbar {
				width: 3px;
			}
			.custom-scrollbar::-webkit-scrollbar-thumb {
				background: #e5e7eb;
				border-radius: 10px;
			}
			/* Prevent body scroll when menu is open */
			:global(body:has(.translate-y-0)) {
				overflow: hidden;
			}
		</style>

		<button
			onclick={() => (isMobileMenuOpen = true)}
			class="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-stone-400 bg-white/70 px-8 py-4 text-[9px] font-bold tracking-[0.3em] text-stone-900 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 active:scale-95 lg:hidden"
			class:opacity-0={isMobileMenuOpen}
			class:pointer-events-none={isMobileMenuOpen}
		>
			<Icon icon="ph:sliders-horizontal-bold" class="text-xs" />
			<span>FILTER</span>

			{#if page.url.searchParams.size > 0}
				<div class="flex items-center gap-1.5">
					<span class="h-1 w-1 rounded-full bg-stone-900"></span>
					<span class="text-[8px] font-medium tracking-normal text-stone-500">
						({page.url.searchParams.size})
					</span>
				</div>
			{/if}
		</button>

		<div class="col-span-12 lg:col-span-10">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#if loading}
					{#each Array(8) as _}
						<div class="border-b border-stone-100 p-8 sm:border-r">
							<Skeleton class="h-80 w-full rounded-none bg-stone-100" />
							<div class="mt-6 space-y-2">
								<Skeleton class="h-4 w-1/3 bg-stone-100" />
								<Skeleton class="h-6 w-3/4 bg-stone-100" />
							</div>
						</div>
					{/each}
				{:else if artwork.length === 0}
					<div
						class="col-span-full flex w-full flex-col items-center justify-center py-40 text-center"
					>
						<p class="font-serif text-2xl text-stone-400 italic">
							No pieces match your current criteria.
						</p>
						<button
							onclick={clearFilters}
							class="mt-6 text-[10px] font-bold tracking-[0.2em] text-stone-900 uppercase underline underline-offset-8 transition-colors hover:text-stone-600"
						>
							View All Works
						</button>
					</div>
				{:else}
					{#each artwork as art}
						<a
							href={`/shop/${art.id}`}
							onclick={(e) => {
								e.preventDefault();
								handleArtwork(art);
							}}
							class="group relative border-b border-stone-100 p-8 transition-colors hover:bg-stone-50 sm:border-r"
						>
							<div
								class="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-stone-100/50 p-6 transition-all duration-700 group-hover:shadow-2xl"
							>
								<img
									src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artwork/${art.imageUrl}`}
									alt={art.title}
									class="h-full w-full object-contain transition-transform duration-1000 group-hover:scale-105"
								/>
							</div>
							<div class="mt-8 text-center sm:text-left">
								<p class="text-[10px] tracking-[0.2em] text-stone-400 uppercase">Available Work</p>
								<h3 class="mt-1 text-lg font-medium tracking-tighter text-stone-900 uppercase">
									{art.title}
								</h3>
								<h4 class="mt-1 font-serif text-stone-500 italic">{art.artist}</h4>
							</div>
						</a>
					{/each}
				{/if}
			</div>

			{#if startKey}
				<div class="flex justify-center border-t border-stone-100 py-20">
					<button
						disabled={loadMoreDisabled}
						onclick={handleLoadMore}
						class="group relative overflow-hidden border border-stone-900 px-12 py-3 transition-colors duration-300 disabled:border-stone-200 disabled:text-stone-300"
					>
						<span
							class="relative z-10 text-xs tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-white"
						>
							{loadMoreDisabled ? 'Loading...' : 'Load More Works'}
						</span>
						<div
							class="absolute inset-0 z-0 translate-y-full bg-stone-900 transition-transform duration-300 ease-out group-hover:translate-y-0 disabled:hidden"
						></div>
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Styling for the Skeleton pulses to be subtler in stone */
	:global(.skeleton) {
		background-color: #f5f5f4 !important;
	}
</style>
