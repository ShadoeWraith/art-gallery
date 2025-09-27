<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import Icon from '@iconify/svelte';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

	import girl from '$lib/assets/77.jpg';
	import cigarGirl from '$lib/assets/0.jpg';
	import lion from '$lib/assets/24.jpg';
	import birds from '$lib/assets/29.jpg';
	import horse from '$lib/assets/76.jpg';
	import people from '$lib/assets/114.jpg';
	import turtle from '$lib/assets/31.jpg';
	import boats from '$lib/assets/63.jpg';

	let images = $state([girl, cigarGirl, lion, birds, horse, people, turtle, boats]);
</script>

<section>
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Shop</h1>
	</div>
	<div class="grid grid-cols-12">
		<div class="col-span-2 hidden flex-col border-r-2 border-stone-400 md:flex">
			<Collapsible.Root>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Color</h4>
						<Icon icon="mdi:chevron-down" class="ml-auto"></Icon>
						<span class="sr-only">Toggle</span>
					</div>
				</Collapsible.Trigger>

				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 pb-2">
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-red-500"></div>
						<span>Red</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-orange-500"></div>
						<span>Orange</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-yellow-500"></div>
						<span>Yellow</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-green-500"></div>
						<span>Green</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-blue-500"></div>
						<span>Blue</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-indigo-500"></div>
						<span>Indigo</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-violet-500"></div>
						<span>Violet</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-white"></div>
						<span>White</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-black"></div>
						<span>Black</span>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
			<Collapsible.Root>
				<Collapsible.Trigger class="w-full">
					<div class="flex w-full items-center border-b-2 border-stone-400 p-4">
						<h4 class="text-lg">Size</h4>
						<Icon icon="mdi:chevron-down" class="ml-auto"></Icon>
						<span class="sr-only">Toggle</span>
					</div>
				</Collapsible.Trigger>

				<Collapsible.Content class="space-y-2 border-b-2 border-stone-400 pb-2">
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-red-500"></div>
						<span>Red</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-orange-500"></div>
						<span>Orange</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-yellow-500"></div>
						<span>Yellow</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-green-500"></div>
						<span>Green</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-blue-500"></div>
						<span>Blue</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-indigo-500"></div>
						<span>Indigo</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-violet-500"></div>
						<span>Violet</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-white"></div>
						<span>White</span>
					</div>
					<div class=" flex items-center gap-2 px-4">
						<div class="h-5 w-5 rounded border-1 border-stone-400 bg-black"></div>
						<span>Black</span>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
		<div
			class="col-span-12 grid grid-cols-1 border-r-2 border-stone-400 md:col-span-10 md:grid-cols-2 lg:grid-cols-4"
		>
			{#each images as image}
				<a href="/shop/3" class="w-full border-r-2 border-b-2 border-stone-400 py-8">
					<div class="h-80 px-8">
						<img src={image} alt="" class="m-auto h-80 object-fill" />
					</div>

					<div class="m-auto w-full px-4 pt-2">
						<h4 class="w-fit font-semibold">Artwork Title</h4>
						<h3 class="text-2xl">Artist's Name</h3>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
