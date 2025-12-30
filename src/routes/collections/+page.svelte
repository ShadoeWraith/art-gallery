<script lang="ts">
	const collections = [
		{
			title: 'Contemporary',
			description: 'New media and modern perspectives.',
			images: [
				'/images/contemp-1.jpg',
				'/images/contemp-2.jpg',
				'/images/contemp-3.jpg',
				'/images/contemp-4.jpg'
			],
			// Updated to dynamic ID path
			href: '/collections/contemporary',
			id: '01'
		},
		{
			title: 'Photography',
			description: 'Visual stories from across the continent.',
			images: [
				'/images/photo-1.jpg',
				'/images/photo-2.jpg',
				'/images/photo-3.jpg',
				'/images/photo-4.jpg'
			],
			href: '/collections/photography',
			id: '02'
		},
		{
			title: 'Traditional',
			description: 'Ancestral techniques and timeless heritage.',
			images: [
				'/images/trad-1.jpg',
				'/images/trad-2.jpg',
				'/images/trad-3.jpg',
				'/images/trad-4.jpg'
			],
			href: '/collections/traditional',
			id: '03'
		},
		{
			title: 'Sculpture',
			description: 'Form and dimension in natural materials.',
			images: [
				'/images/sculp-1.jpg',
				'/images/sculp-2.jpg',
				'/images/sculp-3.jpg',
				'/images/sculp-4.jpg'
			],
			href: '/collections/sculpture',
			id: '04'
		}
	];
</script>

<section class="min-h-screen bg-white pb-32">
	<header class="mx-auto max-w-6xl px-8 pt-24 pb-20 md:px-12">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div class="space-y-4">
				<div class="h-px w-12 bg-stone-900"></div>
				<h1 class="font-serif text-5xl font-light text-stone-900 md:text-6xl">Collections</h1>
			</div>
			<p
				class="max-w-xs font-sans text-[10px] leading-relaxed tracking-[0.2em] text-stone-500 uppercase"
			>
				An index of curated mediums and movements within the gallery's current exhibition.
			</p>
		</div>
	</header>

	<div class="mx-auto max-w-6xl px-8 md:px-12">
		<div class="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 md:gap-y-32">
			{#each collections as collection}
				<a href={collection.href} class="group flex flex-col">
					<div class="relative aspect-square overflow-hidden bg-stone-50">
						<div class="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 bg-white">
							{#each collection.images as img, i}
								<div class="overflow-hidden bg-stone-100">
									<img
										src={img}
										alt=""
										class="h-full w-full object-cover transition-transform duration-[1.5s] ease-out
                                        {i === 0
											? 'group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-110'
											: ''}
                                        {i === 1
											? 'group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110'
											: ''}
                                        {i === 2
											? 'group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:scale-110'
											: ''}
                                        {i === 3
											? 'group-hover:translate-x-1 group-hover:translate-y-1 group-hover:scale-110'
											: ''}"
									/>
								</div>
							{/each}
						</div>
						<div
							class="absolute inset-0 bg-stone-900/0 transition-colors duration-500 group-hover:bg-stone-900/5"
						></div>
					</div>

					<div
						class="mt-8 border-l border-stone-100 pl-6 transition-colors group-hover:border-stone-900"
					>
						<span class="text-[9px] font-bold tracking-[0.4em] text-stone-300 uppercase">
							Series {collection.id}
						</span>
						<h2 class="mt-2 font-serif text-3xl text-stone-900">
							{collection.title}
						</h2>
						<p class="mt-3 font-sans text-[11px] tracking-widest text-stone-500 uppercase">
							{collection.description}
						</p>

						<div
							class="mt-6 flex -translate-x-2 items-center gap-3 text-[9px] font-bold tracking-[0.3em] text-stone-900 uppercase opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
						>
							<span>View Collection</span>
							<div class="h-px w-6 bg-stone-900"></div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<div class="mt-40 flex flex-col items-center px-8 text-center">
		<div class="mb-8 h-12 w-px bg-stone-100"></div>
		<p class="font-serif text-lg text-stone-400 italic">Can't find what you're looking for?</p>
		<a
			href="/contact"
			class="mt-4 text-[10px] font-bold tracking-[0.4em] text-stone-900 uppercase transition-colors hover:text-stone-500"
		>
			Contact our curators
		</a>
	</div>
</section>
