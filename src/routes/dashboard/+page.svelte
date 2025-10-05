<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	import { signOutRedirect, userManager } from '$lib/userManager';

	import { onMount } from 'svelte';
	let artwork: any = $state([]);
	let email: any = $state('');

	onMount(async () => {
		const res = await fetch('/api/proxy/images');
		const json = await res.json();
		artwork = json.Items;

		userManager.signinCallback().then((user) => {
			console.log(user);
			email = user?.profile?.email;
		});
	});

	const sideBarItem = $state([{ label: 'Create Image', href: 'dashboard/create' }]);

	const signOut = async () => {
		await signOutRedirect();
	};
</script>

<section>
	<div class="flex h-16 w-full items-center border-b-2 border-stone-400">
		<h1 class="w-full text-center text-4xl">Dashboard</h1>
	</div>

	<!-- {#if email} -->
	<div>
		<h2>Hello: {email}</h2>

		<button
			onclick={signOut}
			class="rounded-md border-2 border-indigo-500 bg-indigo-600 px-4 py-1 text-gray-200"
			>Sign Out</button
		>
	</div>

	<div>
		<Table.Root class="m-auto my-12 max-w-3/4 bg-stone-300">
			<Table.Header>
				<Table.Row class="bg-gray-500">
					<Table.Head class="w-2 text-gray-100">Select</Table.Head>
					<Table.Head class="text-gray-100">Image</Table.Head>
					<Table.Head class="text-gray-100">Title</Table.Head>
					<Table.Head class="text-gray-100">Artist</Table.Head>
					<Table.Head class="text-gray-100">Description</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if artwork}
					{#each artwork as art}
						<Table.Row class="cursor-pointer hover:bg-indigo-300">
							<Table.Cell>
								<Checkbox class="m-auto cursor-pointer"></Checkbox>
							</Table.Cell>
							<Table.Cell class="font-medium"
								><img
									src={art.imageUrl}
									alt="{art.title} image"
									class="h-20 w-20 object-contain"
								/></Table.Cell
							>
							<Table.Cell>{art.title}</Table.Cell>
							<Table.Cell>{art.artist}</Table.Cell>
							<Table.Cell>{art.description}</Table.Cell>
						</Table.Row>
					{/each}
				{:else}
					<div>Loading...</div>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	<!-- {:else}
		<div class="m-auto my-12 flex h-96 w-fit flex-col text-center">
			<span class="text-2xl font-bold">Not Authorized to view this page. </span>

			<a
				href="/"
				class="m-auto w-fit rounded-md border-2 border-indigo-500 bg-indigo-600 px-12 py-4 text-xl font-bold text-gray-200"
				>Return Home</a
			>
		</div>
	{/if} -->
</section>
