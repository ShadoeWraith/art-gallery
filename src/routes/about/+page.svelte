<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

<section class="min-h-screen bg-white font-serif text-stone-900">
	<div
		class="relative flex min-h-[60vh] flex-col items-center justify-center border-b border-stone-200 px-8 text-center"
	>
		<p class="mb-6 text-[10px] tracking-[0.5em] text-stone-400 uppercase">Established 2025</p>
		<h1 class="max-w-4xl text-5xl leading-tight font-medium tracking-tighter uppercase md:text-7xl">
			Redefining the <span class="text-stone-500 italic">Boundaries</span> of African Art.
		</h1>
		<div class="mt-12 h-20 w-px animate-pulse bg-stone-900"></div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12">
		<div
			class="col-span-12 border-b border-stone-200 bg-stone-100 lg:col-span-6 lg:border-r lg:border-b-0"
		>
			<div class="flex h-full items-center justify-center p-12 md:p-24">
				<div class="relative aspect-[3/4] w-full max-w-md bg-stone-200 shadow-2xl">
					<img
						src="https://africa-curated-public.s3.us-west-1.amazonaws.com/assets/gallery-vision.jpg"
						alt="Curatorial Vision"
						class="h-full w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
					/>
					<div class="absolute -right-6 -bottom-6 hidden bg-white p-8 shadow-xl md:block">
						<p class="text-[10px] tracking-widest text-stone-400 uppercase">Our Focus</p>
						<p class="mt-2 text-sm font-bold uppercase">Contemporary Essence</p>
					</div>
				</div>
			</div>
		</div>

		<div class="col-span-12 flex flex-col justify-center p-8 md:p-16 lg:col-span-6 lg:p-24">
			<h2 class="mb-8 text-xs font-bold tracking-[0.3em] text-stone-900 uppercase">
				The Digital Shift
			</h2>
			<div class="space-y-8 font-sans text-lg leading-relaxed text-stone-600">
				<p>
					Africa Curated was born from a singular realization: the finest contemporary art from the
					continent deserves a global stage without the constraints of physical walls.
				</p>
				<p>
					By operating as an exclusively online gallery, we bridge the gap between emerging masters
					in Cape Town, Lagos, and Nairobi and collectors in London, New York, and beyond. We bypass
					the traditional gatekeeping of the art world to bring you a direct, authentic connection
					to African creativity.
				</p>
				<p class="font-serif text-xl text-stone-900 italic">
					"We don't just sell art; we document the evolving pulse of a continent."
				</p>
			</div>

			<div class="mt-12">
				<Button label="Explore the Collection" href="/shop" />
			</div>
		</div>
	</div>

	<div class="border-t border-stone-200 bg-stone-50 px-8 py-24 lg:px-24">
		<div class="grid grid-cols-1 gap-16 md:grid-cols-3">
			<div class="space-y-4">
				<div class="text-4xl font-light text-stone-300">01</div>
				<h4 class="text-xs font-bold tracking-widest text-stone-900 uppercase">
					Curated Excellence
				</h4>
				<p class="font-sans text-sm leading-relaxed text-stone-500">
					Every piece in our collection undergoes a rigorous curatorial review to ensure it
					represents the absolute pinnacle of contemporary African craft.
				</p>
			</div>
			<div class="space-y-4">
				<div class="text-4xl font-light text-stone-300">02</div>
				<h4 class="text-xs font-bold tracking-widest text-stone-900 uppercase">Direct Impact</h4>
				<p class="font-sans text-sm leading-relaxed text-stone-500">
					Our model ensures that a larger percentage of every acquisition goes directly to the
					artists, supporting the sustainable growth of local creative economies.
				</p>
			</div>
			<div class="space-y-4">
				<div class="text-4xl font-light text-stone-300">03</div>
				<h4 class="text-xs font-bold tracking-widest text-stone-900 uppercase">Global Logistics</h4>
				<p class="font-sans text-sm leading-relaxed text-stone-500">
					Despite our digital nature, our physical logistics are world-class. We provide white-glove
					shipping and insurance for every piece, anywhere in the world.
				</p>
			</div>
		</div>
	</div>
</section>
