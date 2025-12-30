<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	let artwork: any = $state();
	let frames: any = $state();
	let availableFrames: any = $state([]);

	let selectedFrame: any = $state(null);
	let selectedImage: string = $state('');
	let loading: boolean = $state(true);

	onMount(async () => {
		const state = history.state?.['sveltekit:states'];
		let json;

		if (state !== undefined && state.length > 0) {
			console.log(state);
			artwork = state.art;
			selectedImage = artwork.imageUrl;

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
					selectedImage = artwork.imageUrl;
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

	const handleSelectedArtwork = (url: string) => {
		selectedImage = url;
	};

	const goBack = () => {
		history.back();
	};
</script>

<section class="min-h-screen bg-white font-serif text-stone-900">
	<div class="flex h-12 w-full items-center border-b border-stone-200 px-6">
		<button
			onclick={goBack}
			class="flex items-center gap-2 text-[10px] tracking-[0.2em] text-stone-400 uppercase transition-colors hover:text-stone-900"
		>
			<Icon icon="ph:arrow-left-light" class="text-lg" />
			Back to Collection
		</button>
	</div>

	<div class="grid grid-cols-12">
		{#if loading}
			<div class="col-span-12 grid lg:grid-cols-2">
				<div
					class="flex items-center justify-center border-stone-200 bg-stone-50 py-20 lg:border-r"
				>
					<Skeleton class="h-64 w-48 bg-stone-200" />
				</div>
				<div class="p-12">
					<Skeleton class="mb-4 h-10 w-3/4 bg-stone-200" />
					<Skeleton class="h-6 w-1/4 bg-stone-200" />
				</div>
			</div>
		{:else}
			<div
				class="col-span-12 flex flex-col border-b border-stone-200 bg-stone-50 lg:col-span-7 lg:border-r lg:border-b-0"
			>
				<div class="flex items-center justify-center px-8 py-16 md:px-20 md:py-24">
					<img
						src={`https://artgallery-images.s3.us-west-1.amazonaws.com/artwork/${selectedImage}`}
						alt={artwork.title}
						class="borderimg max-h-[55vh] w-auto shadow-2xl transition-all duration-500"
						style={selectedFrame && artwork.imageUrl === selectedImage
							? `border-image-source: url('${selectedFrame.imageUrl}')`
							: ''}
					/>
				</div>

				{#if artwork.subImageUrls && artwork.subImageUrls.length > 0}
					<div class="mt-auto flex justify-center gap-3 border-t border-stone-200 bg-white p-4">
						<button
							onclick={() => handleSelectedArtwork(artwork.imageUrl)}
							class="h-16 w-16 border transition-all"
							class:border-stone-900={artwork.imageUrl === selectedImage}
							class:border-stone-100={artwork.imageUrl !== selectedImage}
						>
							<img
								src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artwork/${artwork.imageUrl}`}
								alt="Main"
								class="h-full w-full object-cover"
							/>
						</button>
						{#each artwork.subImageUrls as subImage}
							<button
								onclick={() => handleSelectedArtwork(subImage)}
								class="h-16 w-16 border transition-all"
								class:border-stone-900={subImage === selectedImage}
								class:border-stone-100={subImage !== selectedImage}
							>
								<img
									src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artwork/${subImage}`}
									alt="Detail"
									class="h-full w-full object-cover"
								/>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="col-span-12 flex flex-col p-8 md:p-12 lg:col-span-5 lg:p-16">
				<header class="mb-10 border-b border-stone-100 pb-10">
					<p class="mb-2 text-[10px] tracking-[0.3em] text-stone-400 uppercase">Original Artwork</p>
					<h2 class="mb-3 text-3xl font-medium tracking-tight md:text-4xl">{artwork.title}</h2>
					<h3 class="font-serif text-lg text-stone-600 italic">{artwork.artist}</h3>
				</header>

				<div class="mb-10">
					<div class="mb-4 flex items-baseline justify-between">
						<h4 class="text-[11px] font-bold tracking-widest text-stone-900 uppercase">
							Frame Selection
						</h4>
						<span class="font-serif text-xs text-stone-500 italic">
							{selectedFrame !== null ? selectedFrame.name : 'Unframed'}
						</span>
					</div>

					<div class="flex flex-wrap gap-2">
						<button
							onclick={() => handleFrameSelection('none')}
							class="flex h-14 w-14 items-center justify-center border transition-all"
							class:border-stone-900={selectedFrame === null}
							class:border-stone-100={selectedFrame !== null}
						>
							<Icon icon="ph:prohibit-light" class="text-xl text-stone-300" />
						</button>

						{#each availableFrames as frame}
							<button
								onclick={() => handleFrameSelection(frame)}
								class="h-14 w-14 border p-0.5 transition-all"
								class:border-stone-900={frame.id === selectedFrame?.id}
								class:border-stone-100={frame.id !== selectedFrame?.id}
							>
								<img src={frame.imageUrl} alt={frame.name} class="h-full w-full object-cover" />
							</button>
						{/each}
					</div>
				</div>

				<div class="mb-10">
					<h4 class="mb-3 text-[11px] font-bold tracking-widest text-stone-900 uppercase">
						Description
					</h4>
					<p class="font-sans text-base leading-relaxed text-stone-600">
						{artwork.description}
					</p>
				</div>

				<button
					class="group relative w-full overflow-hidden border border-stone-900 bg-stone-900 py-4 text-white transition-all"
				>
					<span class="relative z-10 text-[10px] font-bold tracking-[0.4em] uppercase"
						>Inquire for Purchase</span
					>
					<div
						class="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"
					></div>
					<span
						class="absolute inset-0 z-10 flex items-center justify-center text-[10px] font-bold tracking-[0.4em] text-stone-900 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>Contact Gallery</span
					>
				</button>
			</div>
		{/if}
	</div>
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
