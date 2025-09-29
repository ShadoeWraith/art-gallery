<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let artwork: any = $state([]);

	onMount(async () => {
		const res = await fetch('/api/proxy/images');
		const json = await res.json();
		artwork = json.Items;
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
	let sizes = $state(['22x29', '34x45', '46x60']);
</script>

<section>
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Shop</h1>
	</div>
	<div class="grid grid-cols-12">
		<div class="col-span-2 hidden flex-col border-r-2 border-stone-400 lg:flex">
			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Color</h4>
						<Icon icon="mdi:chevron-down" class="ml-auto"></Icon>
						<span class="sr-only">Toggle</span>
					</div>
				</Collapsible.Trigger>

				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 py-4 pb-2">
					{#each colors as color}
						<div
							class=" flex items-center gap-2 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<div class={`h-5 w-5 rounded border-1 border-stone-400 ${color.color}`}></div>
							<span>{color.label}</span>
						</div>
					{/each}
				</Collapsible.Content>
			</Collapsible.Root>
			<Collapsible.Root open>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Size</h4>
						<Icon icon="mdi:chevron-down" class="ml-auto"></Icon>
						<span class="sr-only">Toggle</span>
					</div>
				</Collapsible.Trigger>

				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 py-4 pb-2">
					{#each sizes as size}
						<div
							class=" flex items-center gap-4 px-4 underline-offset-2 hover:cursor-pointer hover:underline"
						>
							<span>{size}</span>
						</div>
					{/each}
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
		<div
			class="col-span-12 grid grid-cols-1 border-r-2 border-stone-400 md:grid-cols-3 lg:col-span-10 lg:grid-cols-4"
		>
			{#if artwork}
				{#each artwork as art}
					<a href={`shop/${art.id}`} class="w-full border-r-2 border-b-2 border-stone-400 py-8">
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
	</div>
</section>
