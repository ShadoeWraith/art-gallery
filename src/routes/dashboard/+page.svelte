<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { signOutRedirect, userManager } from '$lib/userManager';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let artwork: any = $state([]);
	let email: any = $state('');
	let loading: boolean = $state(true);

	onMount(async () => {
		try {
			const res = await fetch('/api/proxy/images');
			const json = await res.json();
			artwork = json.Items;

			userManager.signinCallback().then((user) => {
				email = user?.profile?.email;
			});
		} finally {
			loading = false;
		}
	});

	const signOut = async () => {
		await signOutRedirect();
	};
</script>

<section class="min-h-screen bg-white font-serif text-stone-900">
	<div
		class="flex h-20 w-full items-center justify-between border-b border-stone-200 bg-white px-8"
	>
		<div class="flex items-center gap-4">
			<h1 class="text-xs font-bold tracking-[0.4em] text-stone-900 uppercase">Curator Dashboard</h1>
			<span class="h-4 w-px bg-stone-200"></span>
			<span class="text-[10px] tracking-widest text-stone-400 uppercase"
				>{email || 'Administrator'}</span
			>
		</div>

		<div class="flex items-center gap-6">
			<a
				href="/dashboard/create"
				class="flex items-center gap-2 text-[10px] font-bold tracking-widest text-stone-500 uppercase transition-colors hover:text-stone-900"
			>
				<Icon icon="ph:plus-light" class="text-lg" />
				Add Artwork
			</a>
			<button
				onclick={signOut}
				class="group relative overflow-hidden border border-stone-900 px-6 py-2 transition-all"
			>
				<span
					class="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-white"
				>
					Sign Out
				</span>
				<div
					class="absolute inset-0 z-0 translate-y-full bg-stone-900 transition-transform duration-300 ease-out group-hover:translate-y-0"
				></div>
			</button>
		</div>
	</div>

	<main class="p-8 lg:p-12">
		<div class="mb-10 flex items-end justify-between border-b border-stone-100 pb-6">
			<div>
				<h2 class="text-3xl font-medium tracking-tight uppercase">Inventory Ledger</h2>
				<p class="mt-1 font-sans text-sm text-stone-400 italic">
					Managing {artwork?.length || 0} pieces in the collection
				</p>
			</div>
		</div>

		<div class="overflow-hidden border border-stone-200 bg-white">
			<Table.Root>
				<Table.Header class="bg-stone-50">
					<Table.Row class="border-b border-stone-200 hover:bg-transparent">
						<Table.Head class="w-12 text-center">
							<Checkbox class="border-stone-300" />
						</Table.Head>
						<Table.Head class="w-24 text-[10px] font-bold tracking-widest text-stone-900 uppercase"
							>Preview</Table.Head
						>
						<Table.Head class="text-[10px] font-bold tracking-widest text-stone-900 uppercase"
							>Title / ID</Table.Head
						>
						<Table.Head class="text-[10px] font-bold tracking-widest text-stone-900 uppercase"
							>Artist</Table.Head
						>
						<Table.Head
							class="hidden text-[10px] font-bold tracking-widest text-stone-900 uppercase md:table-cell"
							>Description</Table.Head
						>
						<Table.Head class="w-20"></Table.Head>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{#if loading}
						{#each Array(5) as _}
							<Table.Row>
								<Table.Cell colspan={6} class="p-4">
									<div class="h-12 w-full animate-pulse bg-stone-50"></div>
								</Table.Cell>
							</Table.Row>
						{/each}
					{:else if artwork && artwork.length > 0}
						{#each artwork as art}
							<Table.Row
								class="group border-b border-stone-100 transition-colors hover:bg-stone-50/50"
							>
								<Table.Cell class="text-center">
									<Checkbox
										class="border-stone-300 transition-colors group-hover:border-stone-900"
									/>
								</Table.Cell>
								<Table.Cell>
									<div class="h-16 w-16 border border-stone-200 bg-stone-100 p-1">
										<img
											src={`https://africa-curated-public.s3.us-west-1.amazonaws.com/artwork/${art.imageUrl}`}
											alt={art.title}
											class="h-full w-full object-contain mix-blend-multiply"
										/>
									</div>
								</Table.Cell>
								<Table.Cell>
									<p class="font-sans text-sm font-bold text-stone-900 uppercase">{art.title}</p>
									<p class="font-mono text-[9px] text-stone-400">
										ID: {art.id?.substring(0, 8) || 'N/A'}
									</p>
								</Table.Cell>
								<Table.Cell class="font-serif text-stone-600 italic">{art.artist}</Table.Cell>
								<Table.Cell
									class="hidden max-w-xs truncate font-sans text-xs text-stone-500 md:table-cell"
								>
									{art.description}
								</Table.Cell>
								<Table.Cell>
									<button class="text-stone-300 transition-colors hover:text-stone-900">
										<Icon icon="ph:dots-three-vertical-bold" class="text-xl" />
									</button>
								</Table.Cell>
							</Table.Row>
						{/each}
					{:else}
						<Table.Row>
							<Table.Cell colspan={6} class="py-20 text-center">
								<p class="font-serif text-stone-400 italic">
									No artwork found in the digital vault.
								</p>
								<a
									href="/dashboard/create"
									class="mt-4 inline-block text-[10px] font-bold tracking-widest uppercase underline underline-offset-4"
									>Add your first piece</a
								>
							</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		</div>
	</main>
</section>

<style>
	/* Styling for the shadcn Table components to match gallery theme */
	:global([data-radix-collection-item]) {
		border-color: #e7e5e4 !important; /* stone-200 */
	}
</style>
