<script lang="ts">
	import idk from '$lib/assets/46.jpg';
	import girl from '$lib/assets/77.jpg';
</script>

<section class="w-full">
	<div class="mt-14 h-24 border-t-2 border-b-2 border-stone-400">
		<h2 class="m-auto w-fit py-6 text-4xl font-bold text-gray-800">Featured Artwork</h2>
	</div>

	<div class="bg-stone-300 py-8">
		<div class="grid grid-cols-1 gap-12 md:mx-48 md:grid-cols-3">
			<a href="/shop/1" class="m-auto w-fit border-b-2 border-stone-400 md:border-y-0">
				<img src={girl} alt="" class="borderimg m-auto h-96" />

				<div class="m-auto w-96 px-4 pt-2">
					<h4 class="w-fit font-semibold">Artwork Title</h4>
					<h3 class="text-2xl">Artist's Name</h3>
				</div>
			</a>

			<a href="/shop/1" class="m-auto w-fit border-b-2 border-stone-400 md:border-y-0">
				<img src={idk} alt="" class="borderimg m-auto" />

				<div class="m-auto w-96 px-4 pt-2">
					<h4 class="w-fit font-semibold">Artwork Title</h4>
					<h3 class="text-2xl">Artist's Name</h3>
				</div>
			</a>
		</div>
	</div>
</section>

<style>
	.borderimg {
		border: 10px solid transparent; /* Required for border-image */
		padding: 15px;
		background-color: #d6c2ac;
		border-image: url(../../lib/assets/frame-1.png) 30 round;
	}
</style>
