<script>
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from './label/label.svelte';
</script>

<footer class="w-full border-t-2 border-stone-400 bg-stone-300">
	<div class="m-auto grid grid-cols-1 md:grid-cols-3 md:py-8 lg:mx-24">
		<div class="flex flex-col gap-4 border-r-2 border-b-2 border-stone-400 px-4 py-2 md:border-b-0">
			<h5 class="mb-2 font-semibold">Shop</h5>
			<a href="/shop" class="group relative">
				<p class="capitalize">Shop All</p>
				<span
					class="absolute top-8 h-1 w-1/2 origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
				></span>
			</a>
			<a href="/artist" class="group relative">
				<p class="capitalize">By Artist</p>
				<span
					class="absolute top-8 h-1 w-1/2 origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
				></span>
			</a>
			<!-- <a href="/collection" class="group relative">
				<p class="capitalize">By Collection</p>
				<span
					class="absolute top-8 h-1 w-1/2 origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
				></span>
			</a> -->
		</div>
		<div class="flex flex-col gap-4 border-r-2 border-b-2 border-stone-400 px-4 py-2 md:border-b-0">
			<h5 class="mb-2 font-semibold">Company</h5>
			<a href="/about" class="group relative">
				<p class="capitalize">About Us</p>
				<span
					class="absolute top-8 h-1 w-1/2 origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
				></span>
			</a>
			<!-- <a href="/news" class="group relative">
				<p class="capitalize">News</p>
				<span
					class="absolute top-8 h-1 w-1/2 origin-left scale-x-0 rounded-lg bg-indigo-500 duration-100 group-hover:scale-x-100"
				></span>
			</a> -->
		</div>
		<div class="flex flex-col gap-4 border-b-2 border-stone-400 px-4 py-2 md:border-b-0">
			<h5 class="mb-2 font-semibold">Contact</h5>
			<a href="contact" class="font-semibold underline underline-offset-4">email@email.com</a>
			<div class="flex flex-col">
				<span>2618 San Miguel Suite 267</span>
				<span>Newport Beach, CA 92660</span>
			</div>

			<div class="flex gap-2 md:gap-8">
				<a href="/facebook">
					<Icon
						icon="mdi:facebook"
						font-size="32"
						class="text-gray-900 duration-100 hover:text-indigo-500"
					></Icon>
				</a>

				<a href="/instagram">
					<Icon
						icon="mdi:instagram"
						font-size="32"
						class="text-gray-900 duration-100 hover:text-indigo-500"
					></Icon>
				</a>

				<a href="/x">
					<Icon
						icon="ri:twitter-x-fill"
						font-size="32"
						class="text-gray-900 duration-100 hover:text-indigo-500"
					></Icon>
				</a>
				<a href="/pinterest">
					<Icon
						icon="mdi:pinterest"
						font-size="32"
						class="text-gray-900 duration-100 hover:text-indigo-500"
					></Icon>
				</a>
			</div>
		</div>
		<!-- <div class="flex flex-col gap-4 border-stone-400 px-4 py-2">
			<h5 class="mb-2 font-semibold">Newsletter</h5>

			<Label>Sign up to our newsletter.</Label>
			<form class="flex w-full max-w-sm flex-col items-center md:flex-row md:space-x-2">
				<Input
					type="email"
					placeholder="email"
					class="border-2 border-stone-400 bg-stone-200 placeholder:text-gray-700"
				/>
				<Button type="submit" class="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 md:mt-0 md:w-fit"
					>Subscribe</Button
				>
			</form>
		</div> -->
	</div>
	<div class="flex h-12 w-full border-stone-400 md:border-t-2">
		<span class="m-auto w-full text-center text-xs md:text-base">
			Copyright, An Art Gallery Company&copy;, 2025 All Rights Reserved.
		</span>
	</div>
</footer>
