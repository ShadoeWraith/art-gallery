<script lang="ts">
	import idk from '$lib/assets/46.jpg';
	import girl from '$lib/assets/77.jpg';
</script>

<section class="w-full">
	<div class="my-8 flex bg-stone-300 py-8">
		<div class="w-full px-12 md:m-24 md:w-1/3">
			<div class="m-auto border-b-2 border-stone-400 md:border-y-0">
				<img src={girl} alt="" class="borderimg frame-1 m-auto md:w-full" />
			</div>
		</div>

		<div class="w-full px-12 md:m-24 md:w-1/2">
			<div class="m-auto border-b-2 border-stone-400 md:border-y-0">
				<img src={idk} alt="" class="borderimg frame-2 m-auto md:w-full" />
			</div>
		</div>
	</div>
</section>

<style>
	.borderimg {
		border: 10px solid transparent;
		border-image-width: 5.75rem;
		border-image-slice: 33%;
		border-image-outset: 2.75rem;
		border-image-repeat: round;
	}
	.frame-1 {
		border-image-source: url(../../lib/assets/frame-1.png);
	}

	.frame-2 {
		border-image-source: url(../../lib/assets/frame-2.png);
	}
</style>
