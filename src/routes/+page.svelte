<script lang="ts">
	import elephants from '$lib/assets/50.jpg';
	import flowers from '$lib/assets/49.jpg';
	import idk from '$lib/assets/46.jpg';

	import girl from '$lib/assets/77.jpg';
	import horse from '$lib/assets/76.jpg';
	import people from '$lib/assets/114.jpg';

	import cigarGirl from '$lib/assets/0.jpg';
	import lion from '$lib/assets/24.jpg';
	import birds from '$lib/assets/29.jpg';

	import turtle from '$lib/assets/31.jpg';
	import boats from '$lib/assets/63.jpg';
	import kids from '$lib/assets/85.jpg';

	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';

	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<section>
	<Carousel.Root
		class="relative m-auto hidden overflow-hidden md:flex lg:h-[40rem]"
		opts={{
			align: 'start',
			loop: true
		}}
		plugins={[Autoplay({ delay: 8000 }), Fade()]}
	>
		<Carousel.Content>
			<!-- {#each Array(5) as _, i (i)} -->
			<Carousel.Item class="pl-1">
				<img src={idk} alt="" class="h-full w-full object-fill" />
			</Carousel.Item>
			<Carousel.Item class="pl-1">
				<img src={elephants} alt="" class="h-full w-full object-fill" />
			</Carousel.Item>
			<Carousel.Item class="pl-1">
				<img src={flowers} class="h-full w-full object-fill" alt="" />
			</Carousel.Item>
			<!-- {/each} -->
		</Carousel.Content>
		<Carousel.Previous
			class="absolute left-0 ml-5 h-28 w-12 border-2 border-transparent bg-[#eeeeeeA8] duration-250 hover:border-indigo-500"
		/>
		<Carousel.Next
			class="absolute right-0 mr-5 h-28 w-12 border-2 border-transparent bg-[#eeeeeeA8] duration-250 hover:border-indigo-500"
		/>
	</Carousel.Root>
	<Carousel.Root
		class="m-auto overflow-hidden md:hidden"
		opts={{
			align: 'start',
			loop: true
		}}
		plugins={[Autoplay({ delay: 8000 }), Fade()]}
	>
		<Carousel.Content>
			<!-- {#each Array(5) as _, i (i)} -->
			<Carousel.Item class="pl-1">
				<img src={girl} alt="" class="h-full w-full object-fill" />
			</Carousel.Item>
			<Carousel.Item class="pl-1">
				<img src={people} class="h-full w-full object-fill" alt="" />
			</Carousel.Item>
			<Carousel.Item class="pl-1">
				<img src={horse} alt="" class="h-full w-full object-fill" />
			</Carousel.Item>
			<!-- {/each} -->
		</Carousel.Content>
	</Carousel.Root>
</section>

<section class="w-full">
	<div class="mt-14 h-24 border-t-2 border-b-2 border-stone-400">
		<h2 class="m-auto w-fit py-6 text-4xl font-bold text-gray-800">Featured Artwork</h2>
	</div>

	<div class="bg-stone-300 py-8">
		<div class="grid grid-cols-1 gap-2 md:mx-48 md:grid-cols-3">
			<a
				href="/shop/05ff57ff-cfc9-477b-b8b9-d44dd0e0b476"
				class="m-auto w-full border-b-2 border-stone-400 md:border-y-0"
			>
				<img src={cigarGirl} alt="" class="m-auto h-96" />

				<div class="m-auto px-4 pt-2 md:w-96">
					<h4 class="w-fit font-semibold">Artwork Title</h4>
					<h3 class="text-2xl">Artist's Name</h3>
				</div>
			</a>
			<a
				href="/shop/b8d1a8c2-8e4c-4529-a73b-cc136163dbcc"
				class="m-auto w-full border-b-2 border-stone-400 md:border-x-2 md:border-y-0"
			>
				<img src={lion} alt="" class="m-auto h-96" />

				<div class="m-auto px-4 pt-2 md:w-96">
					<h4 class="w-fit font-semibold">Artwork Title</h4>
					<h3 class="text-2xl">Artist's Name</h3>
				</div>
			</a>
			<a
				href="/shop/05ff57ff-cfc9-477b-b8b9-d44dd0e0b476"
				class="m-auto w-full border-b-2 border-stone-400 md:border-y-0"
			>
				<img src={birds} alt="" class="m-auto h-96" />

				<div class="m-auto px-4 pt-2 md:w-96">
					<h4 class="w-fit font-semibold">Artwork Title</h4>
					<h3 class="text-2xl">Artist's Name</h3>
				</div>
			</a>
		</div>
	</div>

	<div class="m-auto flex h-16 items-center border-y-2 border-stone-400">
		<a
			href="/shop"
			class="mx-auto flex items-center gap-2 rounded-sm border border-stone-400 px-4 py-1 hover:bg-stone-300"
		>
			<span>View More</span>
		</a>
	</div>
</section>

<section>
	<div class="m-auto grid grid-cols-1 gap-12 py-8 md:mx-12 md:grid-cols-3">
		<a href="news" class="group relative h-[32rem] overflow-hidden hover:cursor-pointer">
			<img src={boats} alt="" class="object-fit h-full w-full p-2 md:p-0" />
			<div class="absolute"></div>
			<div
				class="absolute top-0 grid h-full w-full place-content-center duration-150 group-hover:bg-[#00000065]"
			>
				<h3 class="text-center text-4xl font-bold text-white">See What's New</h3>
			</div>
		</a>

		<a href="collections" class="group relative h-[32rem] overflow-hidden hover:cursor-pointer">
			<img src={turtle} alt="" class="object-fit h-full w-full p-2 md:p-0" />
			<div class="absolute"></div>
			<div
				class="absolute top-0 grid h-full w-full place-content-center duration-150 group-hover:bg-[#00000065]"
			>
				<h3 class="text-center text-4xl font-bold text-white">View Our Collections</h3>
			</div>
		</a>

		<a href="artists" class="group relative h-[32rem] overflow-hidden hover:cursor-pointer">
			<img src={kids} alt="" class="object-fit h-full w-full p-2 md:p-0" />
			<div class="absolute"></div>
			<div
				class="absolute top-0 grid h-full w-full place-content-center duration-150 group-hover:bg-[#00000065]"
			>
				<h3 class="text-center text-4xl font-bold text-white">Meet Our Artists</h3>
			</div>
		</a>
	</div>
</section>
