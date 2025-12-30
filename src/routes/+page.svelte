<script lang="ts">
	// ... your existing imports stay exactly the same
	import cigarGirl from '$lib/assets/0.jpg';
	import lion from '$lib/assets/24.jpg';
	import birds from '$lib/assets/29.jpg';
	import turtle from '$lib/assets/31.jpg';
	import idk from '$lib/assets/46.jpg';
	import elephants from '$lib/assets/50.jpg';
	import boats from '$lib/assets/63.jpg';
	import kids from '$lib/assets/85.jpg';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';
</script>

<section class="border-b border-stone-200">
	<Carousel.Root
		class="relative m-auto overflow-hidden md:flex lg:h-[85vh]"
		opts={{ align: 'start', loop: true }}
		plugins={[Autoplay({ delay: 8000 }), Fade()]}
	>
		<Carousel.Content class="h-full">
			<Carousel.Item class="pl-0">
				<div class="relative h-full min-h-[60vh] w-full lg:min-h-[85vh]">
					<img src={idk} alt="Artwork 1" class="h-full w-full object-cover brightness-95" />

					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 z-[40] h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
					></div>

					<div
						class="pointer-events-none absolute bottom-12 left-12 z-[50] flex flex-col items-start"
					>
						<h2 class="font-serif text-3xl tracking-wide text-white italic drop-shadow-md">
							Temp Title
						</h2>
						<p
							class="mt-2 text-[10px] font-bold tracking-[0.3em] text-stone-200 uppercase opacity-90"
						>
							by First Last
						</p>
					</div>
				</div>
			</Carousel.Item>

			<Carousel.Item class="pl-0">
				<div class="relative h-full min-h-[60vh] w-full lg:min-h-[85vh]">
					<img src={elephants} alt="Artwork 2" class="h-full w-full object-cover brightness-95" />

					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 z-[40] h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
					></div>

					<div
						class="pointer-events-none absolute bottom-12 left-12 z-[50] flex flex-col items-start"
					>
						<h2 class="font-serif text-3xl tracking-wide text-white italic drop-shadow-md">
							Temp Title
						</h2>
						<p
							class="mt-2 text-[10px] font-bold tracking-[0.3em] text-stone-200 uppercase opacity-90"
						>
							by First Last
						</p>
					</div>
				</div>
			</Carousel.Item>
		</Carousel.Content>

		<Carousel.Previous
			class="absolute left-6 z-[60] hidden h-12 w-12 border-none bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 md:flex"
		/>
		<Carousel.Next
			class="absolute right-6 z-[60] hidden h-12 w-12 border-none bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 md:flex"
		/>
	</Carousel.Root>
</section>

<section class="w-full bg-white">
	<div class="py-16 text-center">
		<span class="text-xs tracking-[0.3em] text-stone-400 uppercase">Curated Collection</span>
		<h2 class="mt-2 text-4xl font-light tracking-tight text-stone-900 italic">Featured Artwork</h2>
	</div>

	<div class="px-6 pb-20 lg:px-20">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
			<a href="/shop/05ff57ff-cfc9-477b-b8b9-d44dd0e0b476" class="group block">
				<div class="overflow-hidden bg-stone-50 transition-all duration-700 group-hover:shadow-xl">
					<img
						src={cigarGirl}
						alt=""
						class="h-[450px] w-full object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
					/>
				</div>
				<div class="mt-6 text-center">
					<h3 class="mt-1 text-xl font-medium tracking-tighter text-stone-800 uppercase">
						Artwork Title
					</h3>
					<p class="mt-1 font-serif text-stone-500 italic">Artist Name</p>
				</div>
			</a>

			<a href="/shop/b8d1a8c2-8e4c-4529-a73b-cc136163dbcc" class="group block">
				<div class="overflow-hidden bg-stone-50 transition-all duration-700 group-hover:shadow-xl">
					<img
						src={lion}
						alt=""
						class="h-[450px] w-full object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
					/>
				</div>
				<div class="mt-6 text-center">
					<h3 class="mt-1 text-xl font-medium tracking-tighter text-stone-800 uppercase">
						Artwork Title
					</h3>
					<p class="mt-1 font-serif text-stone-500 italic">Artist Name</p>
				</div>
			</a>

			<a href="/shop/16d4a638-1e01-40e3-b371-d57ddfa17684" class="group block">
				<div class="overflow-hidden bg-stone-50 transition-all duration-700 group-hover:shadow-xl">
					<img
						src={birds}
						alt=""
						class="h-[450px] w-full object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
					/>
				</div>
				<div class="mt-6 text-center">
					<h3 class="mt-1 text-xl font-medium tracking-tighter text-stone-800 uppercase">
						Artwork Title
					</h3>
					<p class="mt-1 font-serif text-stone-500 italic">Artist Name</p>
				</div>
			</a>
		</div>
	</div>

	<div class="flex justify-center border-t border-stone-100 py-12">
		<a
			href="/shop"
			class="group relative overflow-hidden border border-stone-900 px-8 py-3 transition-all hover:text-white"
		>
			<span class="relative z-10 text-sm tracking-widest uppercase">Explore the Collection</span>
			<div
				class="absolute inset-0 z-0 translate-y-full bg-stone-900 transition-transform duration-300 group-hover:translate-y-0"
			></div>
		</a>
	</div>
</section>

<section class="bg-stone-50 px-4 py-20 lg:px-12">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<a href="/artists" class="group relative h-[30rem] overflow-hidden">
			<img
				src={kids}
				alt=""
				class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90"
			></div>
			<div class="absolute bottom-10 left-0 w-full text-center">
				<h3 class="text-3xl font-light tracking-widest text-white uppercase">Meet Our Artists</h3>
				<span class="mt-2 inline-block h-[1px] w-12 bg-white transition-all group-hover:w-24"
				></span>
			</div>
		</a>

		<a href="/about" class="group relative h-[30rem] overflow-hidden">
			<img
				src={turtle}
				alt=""
				class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90"
			></div>
			<div class="absolute bottom-10 left-0 w-full text-center">
				<h3 class="text-3xl font-light tracking-widest text-white uppercase">The Gallery</h3>
				<span class="mt-2 inline-block h-[1px] w-12 bg-white transition-all group-hover:w-24"
				></span>
			</div>
		</a>

		<a href="/contact" class="group relative h-[30rem] overflow-hidden md:col-span-2 lg:col-span-1">
			<img
				src={boats}
				alt=""
				class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90"
			></div>
			<div class="absolute bottom-10 left-0 w-full text-center">
				<h3 class="text-3xl font-light tracking-widest text-white uppercase">Get In Touch</h3>
				<span class="mt-2 inline-block h-[1px] w-12 bg-white transition-all group-hover:w-24"
				></span>
			</div>
		</a>
	</div>
</section>

<style>
	:global(body) {
		background-color: #fafaf9; /* stone-50 */
	}
</style>
