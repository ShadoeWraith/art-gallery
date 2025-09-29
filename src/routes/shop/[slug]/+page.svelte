<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	let artwork: any = $state();
	let frames: any = $state();
	let availableFrames: any = $state([]);

	let selectedFrame: any = $state(null);

	onMount(async () => {
		let json;
		await fetch(`/api/proxy/images/${data.slug}`)
			.then(async (res) => {
				json = await res.json();
				artwork = json.Item;
			})
			.then(async () => {
				await fetch(`/api/proxy/frames`)
					.then(async (res) => {
						json = await res.json();
						frames = json.Items;
					})
					.then(() => {
						if (artwork?.frameIds?.length && Array.isArray(frames)) {
							availableFrames = artwork.frameIds
								.map((id: string) => frames.find((f: any) => f.id === id))
								.filter(Boolean);
						}
					});
			});
	});

	const handleFrameSelection = (frame: any) => {
		if (frame === 'none') return (selectedFrame = null);
		selectedFrame = { ...frame };
	};
</script>

<section>
	<div
		class="col-span-12 grid border-r-2 border-stone-400 md:col-span-10 md:grid-cols-2 lg:grid-cols-4"
	>
		{#if artwork}
			<div
				class="col-span-2 w-full border-r-2 border-b-2 border-stone-400 bg-stone-300 py-16 md:py-32"
			>
				<div class="m-auto border-stone-400">
					<img
						src={artwork.imageUrl}
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
						<div class="m-auto flex flex-wrap justify-center gap-4 md:justify-normal">
							<button
								onclick={() => {
									handleFrameSelection('none');
								}}
								class={`cursor-pointer rounded-sm border-2 border-stone-400 p-4 hover:bg-stone-300 ${selectedFrame === null ? 'bg-stone-300 outline-2 outline-indigo-500' : ''}`}
							>
								<Icon icon="radix-icons:value-none" font-size="48" class="h-full w-20"></Icon>
							</button>

							{#each availableFrames as frame}
								<button
									onclick={() => {
										handleFrameSelection(frame);
									}}
									class={`cursor-pointer rounded-sm border-2 border-stone-400 p-4 hover:bg-stone-300 ${frame.id === selectedFrame?.id ? 'bg-stone-300 outline-2 outline-indigo-500' : ''}`}
								>
									<img src={frame.imageUrl} alt={frame.description} class="w-20" />
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
