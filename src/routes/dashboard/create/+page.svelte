<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Icon from '@iconify/svelte';

	// --- State Management ---
	let artworkData = $state({
		title: '',
		artistId: '',
		tags: {
			colors: [] as string[],
			orientations: [] as string[]
		},
		selectedFrames: [] as string[],
		selectedSizes: [] as string[],
		description: ''
	});

	// Configuration Data
	const palette = [
		{ name: 'Red', hex: '#ef4444' },
		{ name: 'Orange', hex: '#f97316' },
		{ name: 'Yellow', hex: '#eab308' },
		{ name: 'Green', hex: '#22c55e' },
		{ name: 'Blue', hex: '#3b82f6' },
		{ name: 'Indigo', hex: '#6366f1' },
		{ name: 'Violet', hex: '#a855f7' },
		{ name: 'Black', hex: '#000000' },
		{ name: 'White', hex: '#ffffff' }
	];

	const commonSizes = [
		{ id: 's1', label: '8" x 10"', type: 'Small' },
		{ id: 's2', label: '11" x 14"', type: 'Small' },
		{ id: 's3', label: '16" x 20"', type: 'Medium' },
		{ id: 's4', label: '24" x 36"', type: 'Large' },
		{ id: 's5', label: '30" x 40"', type: 'Large' },
		{ id: 's6', label: 'A4', type: 'ISO' }
	];

	let artists = $state([
		{ id: '1', name: 'Zanele Muholi' },
		{ id: '2', name: 'William Kentridge' }
	]);

	let allFrames = $state([
		{ id: 'f1', name: 'Classic Oak' },
		{ id: 'f2', name: 'Modern Black' },
		{ id: 'f3', name: 'Gilded Ornate' },
		{ id: 'f4', name: 'Floating White' }
	]);

	let imageUrl = $state('');
	let isPreviewingMarkdown = $state(false);
	let textAreaRef: HTMLTextAreaElement | undefined = $state();

	// --- Markdown Parser Logic ---
	let renderedHTML = $derived.by(() => {
		let text = artworkData.description;
		if (!text) return '';
		// Custom Regex Parser for performance and reliability
		return text
			.replace(/^# (.*$)/gm, '<h1 class="preview-h1">$1</h1>')
			.replace(/^## (.*$)/gm, '<h2 class="preview-h2">$1</h2>')
			.replace(/^> (.*$)/gm, '<blockquote class="preview-quote">$1</blockquote>')
			.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*)\*/g, '<em>$1</em>')
			.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="preview-link" target="_blank">$1</a>')
			.replace(/^\- (.*$)/gm, '<li class="preview-li">$1</li>')
			.replace(/\n\n/g, '<br/><br/>');
	});

	// --- Toolbar Logic (Fixed Link Wrapping) ---
	function insertMarkdown(type: string) {
		if (!textAreaRef) return;
		const start = textAreaRef.selectionStart;
		const end = textAreaRef.selectionEnd;
		const text = artworkData.description;
		const selection = text.substring(start, end);
		const before = text.substring(0, start);
		const after = text.substring(end);

		let prefix = '',
			suffix = '',
			placeholder = '';

		switch (type) {
			case 'link':
				prefix = '[';
				suffix = '](https://)';
				placeholder = selection || 'link text';
				break;
			case 'bold':
				prefix = '**';
				suffix = '**';
				placeholder = selection || 'bold text';
				break;
			case 'h1':
				prefix = '# ';
				placeholder = selection || 'Heading';
				break;
			case 'list':
				prefix = '- ';
				placeholder = selection || 'item';
				break;
			case 'quote':
				prefix = '> ';
				placeholder = selection || 'quote';
				break;
		}

		artworkData.description = `${before}${prefix}${placeholder}${suffix}${after}`;

		setTimeout(() => {
			textAreaRef?.focus();
			const newStart = start + prefix.length;
			const newEnd = newStart + placeholder.length;
			textAreaRef?.setSelectionRange(newStart, newEnd);
		}, 0);
	}

	// --- Global Actions ---
	async function handleSave() {
		const entry = { ...artworkData, imageUrl, timestamp: Date.now(), category: 'Artwork' };
		try {
			// @ts-ignore - calling user engine function
			await saveToDB(entry);
			alert('Successfully saved to IndexedDB');
		} catch (err) {
			console.error(err);
		}
	}

	const handleFileSelect = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		const f = target.files?.[0];
		if (f) {
			if (imageUrl) URL.revokeObjectURL(imageUrl);
			imageUrl = URL.createObjectURL(f);
		}
	};

	const toggleArrayItem = (array: string[], item: string) => {
		return array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
	};
</script>

<section class="min-h-screen bg-white font-serif text-stone-900">
	<header
		class="sticky top-[5.125rem] z-40 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white/90 px-8 backdrop-blur-md"
	>
		<div class="flex items-center">
			<a
				href="/dashboard"
				class="flex items-center gap-2 text-[10px] tracking-[0.2em] text-stone-400 uppercase transition-colors hover:text-stone-900"
			>
				<Icon icon="ph:arrow-left-light" class="text-lg" />
				Back to Dashboard
			</a>
		</div>

		<Button onclick={handleSave} label="Save Asset" size="sm" />
	</header>
	<div class="grid grid-cols-1 lg:grid-cols-12">
		<div
			class="relative border-b border-stone-200 bg-stone-50 p-12 lg:col-span-5 lg:border-r lg:border-b-0"
		>
			<div class="top-28 flex flex-col items-center">
				<div
					class="group relative flex aspect-square w-full max-w-sm items-center justify-center border border-dashed border-stone-300 bg-white shadow-sm transition-colors hover:border-stone-400"
				>
					{#if imageUrl}
						<img
							src={imageUrl}
							alt="Preview"
							class="h-full w-full object-contain p-8 mix-blend-multiply"
						/>
					{:else}
						<Icon icon="ph:image-square-thin" class="text-6xl text-stone-100" />
					{/if}
					<input
						type="file"
						id="fileInput"
						class="hidden"
						accept="image/*"
						onchange={handleFileSelect}
					/>
					<button
						type="button"
						onclick={() => document.getElementById('fileInput')?.click()}
						class="absolute inset-0 cursor-pointer"
						aria-label="Upload Image"
					></button>
				</div>
				<p class="mt-4 text-[8px] tracking-[0.2em] text-stone-400 uppercase italic">
					High-resolution master source
				</p>
			</div>
		</div>

		<div class="space-y-20 p-12 lg:col-span-7 lg:p-20">
			<section class="space-y-10">
				<div class="relative">
					<label
						for="title"
						class="mb-2 block text-[10px] font-bold tracking-widest text-stone-400 uppercase"
						>Artwork Title</label
					>
					<input
						id="title"
						bind:value={artworkData.title}
						type="text"
						placeholder="Untitled"
						class="w-full border-b border-stone-100 bg-transparent py-2 text-2xl transition-colors focus:border-stone-900 focus:outline-none"
					/>
				</div>
				<div class="relative">
					<label
						for="artist"
						class="mb-2 block text-[10px] font-bold tracking-widest text-stone-400 uppercase"
						>Artist Profile</label
					>
					<select
						id="artist"
						bind:value={artworkData.artistId}
						class="w-full cursor-pointer appearance-none border-b border-stone-100 bg-transparent py-2 focus:border-stone-900 focus:outline-none"
					>
						<option value="" disabled>Select Artist from Directory</option>
						{#each artists as artist}<option value={artist.id}>{artist.name}</option>{/each}
					</select>
				</div>
			</section>

			<section class="space-y-12">
				<div class="space-y-4">
					<span class="text-[10px] font-bold tracking-widest text-stone-400 uppercase"
						>Color Palette</span
					>
					<div class="flex flex-wrap gap-3">
						{#each palette as color}
							<button
								type="button"
								onclick={() =>
									(artworkData.tags.colors = toggleArrayItem(artworkData.tags.colors, color.name))}
								class="h-8 w-8 rounded-full border transition-all {artworkData.tags.colors.includes(
									color.name
								)
									? 'ring-2 ring-stone-900 ring-offset-2'
									: 'border-stone-200'}"
								style="background-color: {color.hex}"
							></button>
						{/each}
					</div>
				</div>
			</section>

			<section class="space-y-6">
				<h4 class="border-b border-stone-100 pb-4 text-[10px] font-bold tracking-widest uppercase">
					Standard Dimensions
				</h4>
				<div class="grid grid-cols-2 gap-2 md:grid-cols-3">
					{#each commonSizes as size}
						<button
							type="button"
							onclick={() =>
								(artworkData.selectedSizes = toggleArrayItem(artworkData.selectedSizes, size.id))}
							class="border py-3 text-center transition-colors {artworkData.selectedSizes.includes(
								size.id
							)
								? 'border-stone-900 bg-stone-900 text-white'
								: 'border-stone-100 text-stone-400'}"
						>
							<span class="block text-[10px] font-bold">{size.label}</span>
							<span class="text-[8px] uppercase opacity-60">{size.type}</span>
						</button>
					{/each}
				</div>
			</section>

			<section class="space-y-4 border-t border-stone-100 pt-10">
				<div class="flex items-center justify-between">
					<label for="desc" class="text-[10px] font-bold tracking-widest text-stone-400 uppercase"
						>Curatorial Note</label
					>
					<button
						type="button"
						onclick={() => (isPreviewingMarkdown = !isPreviewingMarkdown)}
						class="text-[9px] font-bold tracking-widest uppercase {isPreviewingMarkdown
							? 'text-stone-900 underline'
							: 'text-stone-400'}"
					>
						{isPreviewingMarkdown ? 'Return to Editor' : 'Page Preview'}
					</button>
				</div>

				<div class="border border-stone-100 bg-stone-50/30">
					{#if !isPreviewingMarkdown}
						<div class="flex flex-wrap gap-1 border-b border-stone-100 bg-white p-2">
							<button
								type="button"
								onclick={() => insertMarkdown('h1')}
								class="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-50"
							>
								<Icon icon="ph:text-h-one" class="text-stone-400" /><span
									class="text-[9px] font-bold text-stone-400 uppercase">Head</span
								>
							</button>
							<button
								type="button"
								onclick={() => insertMarkdown('bold')}
								class="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-50"
							>
								<Icon icon="ph:text-bolder" class="text-stone-400" /><span
									class="text-[9px] font-bold text-stone-400 uppercase">Bold</span
								>
							</button>
							<button
								type="button"
								onclick={() => insertMarkdown('link')}
								class="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-50"
							>
								<Icon icon="ph:link" class="text-stone-400" /><span
									class="text-[9px] font-bold text-stone-400 uppercase">Link</span
								>
							</button>
							<button
								type="button"
								onclick={() => insertMarkdown('quote')}
								class="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-50"
							>
								<Icon icon="ph:quotes" class="text-stone-400" /><span
									class="text-[9px] font-bold text-stone-400 uppercase">Quote</span
								>
							</button>
						</div>
					{/if}

					<div class="min-h-[450px]">
						{#if isPreviewingMarkdown}
							<div class="preview-container animate-in p-12 duration-300 fade-in">
								{#if artworkData.description}
									{@html renderedHTML}
								{:else}
									<p class="text-sm text-stone-300 italic">No description provided.</p>
								{/if}
							</div>
						{:else}
							<textarea
								id="desc"
								bind:this={textAreaRef}
								bind:value={artworkData.description}
								placeholder="Describe materials, historical significance, and exhibition history..."
								class="min-h-[450px] w-full resize-none bg-transparent p-10 font-mono text-sm leading-relaxed text-stone-700 focus:outline-none"
							></textarea>
						{/if}
					</div>
				</div>
				<div class="text-right">
					<span class="text-[8px] tracking-widest text-stone-300 uppercase"
						>{artworkData.description.length} Characters recorded</span
					>
				</div>
			</section>

			<div class="h-32"></div>
		</div>
	</div>
</section>

<style>
	/* Styling select to remove default appearance */
	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a8a29e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
		background-size: 1.2em;
	}

	/* TYPOGRAPHY PREVIEW STYLES */
	.preview-container {
		font-family: serif;
		line-height: 1.8;
		color: #1c1917;
		max-width: 65ch;
		margin: 0 auto;
	}

	:global(.preview-h1) {
		font-size: 2.2rem;
		margin-bottom: 1.5rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: #000;
	}

	:global(.preview-h2) {
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		color: #78716c;
		border-bottom: 1px solid #f5f5f4;
		display: inline-block;
	}

	:global(.preview-quote) {
		border-left: 2px solid #e7e5e4;
		padding-left: 1.5rem;
		font-style: italic;
		color: #57534e;
		margin: 2rem 0;
	}

	:global(.preview-li) {
		list-style-type: disc;
		margin-left: 1.25rem;
		margin-bottom: 0.5rem;
	}

	:global(.preview-link) {
		text-decoration: underline;
		text-underline-offset: 4px;
		color: #78716c;
	}

	:global(strong) {
		font-weight: 700;
		color: #000;
	}
</style>
