<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { load } from '../+page.js';

	const { data } = $props();

	let artwork: any = $state();
	let frames: any = $state();
	let availableFrames: any = $state([]);

	let selectedFrame: any = $state(null);
	let loading: boolean = $state(true);

	onMount(async () => {
		const state = history.state?.['sveltekit:states'];
		let json;

		if (state.art !== undefined) {
			artwork = state.art;

			const cached = loadFromLocalStorage('frames');

			if (cached) {
				frames = cached;
				if (artwork?.frameIds?.length && Array.isArray(frames)) {
					availableFrames = artwork.frameIds
						.map((id: string) => frames.find((f: any) => f.id === id))
						.filter(Boolean);
				}
				return (loading = false);
			}

			await fetch(`/api/proxy/frames`)
				.then(async (res) => {
					json = await res.json();
					frames = json.Items;

					saveToLocalStorage('frames', frames);
				})
				.then(() => {
					if (artwork?.frameIds?.length && Array.isArray(frames)) {
						availableFrames = artwork.frameIds
							.map((id: string) => frames.find((f: any) => f.id === id))
							.filter(Boolean);
					}
				});
		} else {
			await fetch(`/api/proxy/images/${data.slug}`)
				.then(async (res) => {
					json = await res.json();
					artwork = json.Items[0];
				})
				.then(async () => {
					const cached = loadFromLocalStorage('frames');

					if (cached) {
						frames = cached;
						if (artwork?.frameIds?.length && Array.isArray(frames)) {
							availableFrames = artwork.frameIds
								.map((id: string) => frames.find((f: any) => f.id === id))
								.filter(Boolean);
						}
						return (loading = false);
					}

					await fetch(`/api/proxy/frames`)
						.then(async (res) => {
							json = await res.json();
							frames = json.Items;

							saveToLocalStorage('frames', frames);
						})
						.then(() => {
							if (artwork?.frameIds?.length && Array.isArray(frames)) {
								availableFrames = artwork.frameIds
									.map((id: string) => frames.find((f: any) => f.id === id))
									.filter(Boolean);
							}
						});
				});
		}
		loading = false;
	});

	const handleFrameSelection = (frame: any) => {
		if (frame === 'none') return (selectedFrame = null);
		selectedFrame = { ...frame };
	};

	const saveToLocalStorage = (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	const loadFromLocalStorage = (key: string) => {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	};
</script>

<section>
	<div
		class="col-span-12 grid border-r-2 border-stone-400 md:col-span-10 md:grid-cols-2 lg:grid-cols-4"
	>
		{#if loading}
			<!-- Skeleton version of artwork detail section -->
			<div
				class="col-span-12 grid border-r-2 border-stone-400 md:col-span-10 md:grid-cols-2 lg:grid-cols-4"
			>
				<!-- Image Skeleton -->
				<div
					class="col-span-2 w-full border-r-2 border-b-2 border-stone-400 bg-stone-300 py-16 md:py-32"
				>
					<div class="m-auto border-stone-400">
						<Skeleton
							class="borderimg m-auto h-96 max-h-[30rem] max-w-[42rem] bg-gray-500 shadow-2xl shadow-stone-500 max-sm:max-h-72 max-sm:max-w-80 lg:w-80"
						/>
					</div>
				</div>

				<!-- Text and Frame Skeleton -->
				<div class="col-span-2 w-full border-b-2 border-stone-400 pt-4 sm:text-2xl">
					<div class="md:mx-24">
						<!-- Title and Artist Skeleton -->
						<div class="mb-12 border-b-2 border-stone-400 px-4 pb-4">
							<Skeleton class="mb-2 h-8 w-1/2 bg-gray-400" />
							<Skeleton class="h-6 w-2/3 bg-gray-400" />
						</div>

						<!-- Frame Selection Skeleton -->
						<div class="mb-12 flex w-full flex-col gap-4 border-b-2 border-stone-400 pb-4">
							<div class="flex flex-col gap-2 px-4">
								<h3 class="text-xl">Frame Selection:</h3>
								<h4 class="text-lg font-bold">
									{selectedFrame !== null ? selectedFrame.name : 'None'}
								</h4>
							</div>
							<div class="mx-4 flex flex-wrap gap-4 md:m-0 md:justify-normal">
								<button
									class={`h-20 w-20 cursor-pointer rounded-sm border-2 border-stone-400 hover:bg-stone-300 ${selectedFrame === null ? 'bg-stone-300 outline-2 outline-indigo-500' : ''}`}
								>
									<Icon icon="radix-icons:value-none" class="m-auto text-4xl"></Icon>
								</button>
								{#each Array(4) as _}
									<Skeleton class="h-20 w-20 border-2 border-stone-400 bg-gray-400" />
								{/each}
							</div>
						</div>

						<!-- Description Skeleton -->
						<div class="px-4 pb-4">
							<h3 class="text-xl">Description:</h3>
							<div class="space-y-2">
								<Skeleton class="h-4 w-full bg-gray-400" />
								<Skeleton class="h-4 w-5/6 bg-gray-400" />
								<Skeleton class="h-4 w-2/3 bg-gray-400" />
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div
				class="col-span-2 w-full border-r-2 border-b-2 border-stone-400 bg-stone-300 py-16 md:py-32"
			>
				<div class="m-auto border-stone-400">
					<img
						src={`https://artgallery-images.s3.us-west-1.amazonaws.com/artwork/${artwork.imageUrl}`}
						alt={artwork.title}
						class="borderimg m-auto max-h-[30rem] max-w-[42rem] shadow-2xl shadow-stone-500 max-sm:max-h-72 max-sm:max-w-80 lg:w-auto"
						style={selectedFrame ? `border-image-source: url('${selectedFrame.imageUrl}')` : ''}
					/>
				</div>
			</div>
			<div class="col-span-2 w-full border-b-2 border-stone-400 py-8 sm:text-2xl">
				<div class="md:mx-24">
					<div class="mb-12 border-b-2 border-stone-400 px-4 pb-4">
						<h2 class="text-3xl">{artwork.title}</h2>
						<h3 class="text-xl">By: {artwork.artist}</h3>
					</div>

					<div class="mb-12 flex w-full flex-col gap-4 border-b-2 border-stone-400 pb-4">
						<div class="flex flex-col gap-2 px-4">
							<h3 class="text-xl">Frame Selection:</h3>
							<h4 class="text-lg font-bold">
								{selectedFrame !== null ? selectedFrame.name : 'None'}
							</h4>
						</div>
						<div class="mx-4 flex flex-wrap gap-4 md:justify-normal">
							<button
								onclick={() => {
									handleFrameSelection('none');
								}}
								class={`h-20 w-20 cursor-pointer rounded-sm border-2 border-stone-400 hover:bg-stone-300 ${selectedFrame === null ? 'bg-stone-300 outline-2 outline-indigo-500' : ''}`}
							>
								<Icon icon="radix-icons:value-none" class="m-auto text-4xl"></Icon>
							</button>

							{#each availableFrames as frame}
								<button
									onclick={() => {
										handleFrameSelection(frame);
									}}
									class={`h-20 w-20 cursor-pointer rounded-sm border-2 border-stone-400 p-4 hover:bg-stone-300 ${frame.id === selectedFrame?.id ? 'bg-stone-300 outline-2 outline-indigo-500' : ''}`}
								>
									<img src={frame.imageUrl} alt={frame.description} class="object-contain" />
								</button>
							{/each}
						</div>
					</div>

					<div class="px-4">
						<h3 class="text-xl">Description:</h3>
						<p class="text-lg">{artwork.description}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="h-12 w-full"></div>
</section>

<style>
	.borderimg {
		border: 10px solid transparent;
		border-image-width: 6.5rem;
		border-image-slice: 33%;
		border-image-outset: 2.75rem;
		border-image-repeat: round;
	}

	@media (width <= 40rem /* 640px */) {
		.borderimg {
			border-image-width: 4.15rem;
			border-image-outset: 1.5rem;
		}
	}

	@media (width >= 48rem /* 768px */) {
		.borderimg {
			border-image-width: 5.25rem;
			border-image-outset: 2rem;
		}
	}
</style>
