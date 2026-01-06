<script lang="ts">
	import { page } from '$app/state';
	import * as Collapsible from '$lib/components/ui/collapsible';

	let {
		isMobileMenuOpen = $bindable(false),
		sections = [],
		handleFilters,
		resetFilter,
		clearFilters
	} = $props();
</script>

<aside
	class="
        fixed inset-x-0 bottom-0 z-[70] flex h-[85vh] flex-col rounded-t-3xl border-t border-stone-200 bg-white
        transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        lg:visible lg:sticky lg:top-20 lg:z-10 lg:col-span-2 lg:flex lg:h-[calc(100vh-5rem)] lg:translate-y-0 lg:rounded-none lg:border-t-0 lg:border-r
        {isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}
    "
>
	<div class="flex w-full items-center border-b border-stone-100 px-8 py-6">
		<div class="flex flex-1 items-baseline justify-between pr-4">
			<h4 class="text-[10px] font-black tracking-[0.2em] text-stone-950 uppercase">Filter By</h4>
			<button
				onclick={clearFilters}
				class="text-[9px] font-bold tracking-widest text-red-700 uppercase underline underline-offset-[3px] transition-colors hover:text-red-900"
			>
				Clear All
			</button>
		</div>

		<button
			onclick={() => (isMobileMenuOpen = false)}
			class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 lg:hidden"
		>
			<span class="rotate-45 text-2xl leading-none font-light text-stone-500">+</span>
		</button>
	</div>

	<div class="custom-scrollbar flex-1 overflow-y-auto overscroll-contain px-2 pb-32">
		{#each sections as section}
			<Collapsible.Root open>
				<Collapsible.Trigger
					class="group w-full border-b border-stone-100 px-6 py-5 hover:bg-stone-50"
				>
					<div class="flex w-full items-baseline">
						<h4 class="text-[10px] font-bold tracking-[0.2em] text-stone-950 uppercase">
							{section.title}
						</h4>
						<div class="ml-auto flex items-center gap-4">
							<button
								onclick={(e) => {
									e.stopPropagation();
									resetFilter(section.key);
								}}
								class="text-[9px] font-bold tracking-widest text-stone-600 uppercase underline underline-offset-[3px] hover:text-stone-950"
								>Reset</button
							>
							<span
								class="text-lg font-light text-stone-400 transition-transform duration-300 group-data-[state=open]:rotate-45"
								>+</span
							>
						</div>
					</div>
				</Collapsible.Trigger>

				<Collapsible.Content class="overflow-hidden">
					<div class="flex flex-col py-2">
						{#each section.items as item}
							{@const label = typeof item === 'string' ? item : item.label}
							{@const isActive = page.url.searchParams.get(section.key)?.split(',').includes(label)}

							<button
								onclick={() => handleFilters(section.key, label)}
								class="mx-2 flex items-center gap-4 rounded-md px-4 py-3.5 text-left text-[9px] font-medium tracking-[0.15em] uppercase transition-colors {isActive
									? 'bg-stone-100 text-stone-950'
									: 'text-stone-700 hover:bg-stone-50'}"
							>
								{#if section.type === 'color'}
									<div
										class={`h-3 w-3 shrink-0 rounded-full ring-1 ring-offset-2 transition-all ${item.color} ${isActive ? 'ring-stone-400' : 'ring-transparent'}`}
									></div>
								{:else if section.type === 'artist'}{:else}
									<div
										class="flex h-4 w-4 shrink-0 items-center justify-center border border-stone-400 bg-white"
									>
										<div
											class={`h-2 w-2 bg-stone-950 transition-transform duration-200 ${
												isActive ? 'scale-100' : 'scale-0'
											}`}
										></div>
									</div>
								{/if}

								<span>{label}</span>
							</button>
						{/each}
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		{/each}
	</div>

	<div class="mt-auto border-t border-stone-100 bg-white p-6 lg:hidden">
		<button
			onclick={() => (isMobileMenuOpen = false)}
			class="w-full bg-stone-950 py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase shadow-xl"
		>
			Apply & Show Results
		</button>
	</div>
</aside>
