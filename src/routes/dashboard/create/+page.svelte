<script lang="ts">
	let file: any = null;
	let imageUrl = '';
	let dragActive = false;

	function handleFileSelect(event: any) {
		const selectedFile = event.target.files[0];
		if (selectedFile && selectedFile.type.startsWith('image/')) {
			file = selectedFile;
			imageUrl = URL.createObjectURL(selectedFile);
		}
	}

	function handleDrop(event: any) {
		event.preventDefault();
		dragActive = false;
		const droppedFile = event.dataTransfer.files[0];
		if (droppedFile && droppedFile.type.startsWith('image/')) {
			file = droppedFile;
			imageUrl = URL.createObjectURL(droppedFile);
		}
	}

	function handleDragOver(event: any) {
		event.preventDefault();
		dragActive = true;
	}

	function handleDragLeave() {
		dragActive = false;
	}

	function triggerFileInput() {
		// @ts-ignore
		document.getElementById('fileInput').click();
	}
</script>

<div></div>
<button
	class="relative h-96 w-96 cursor-pointer border-2 border-dashed p-8 text-center duration-100 {dragActive
		? 'border-indigo-500 bg-stone-300 duration-200'
		: 'border-stone-400'}"
	on:click={triggerFileInput}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
>
	{#if imageUrl}
		<img src={imageUrl} alt="Preview" class="m-auto h-full max-w-full object-contain" />
	{:else}
		<p>Click or drag & drop an image here</p>
	{/if}
</button>

<input type="file" id="fileInput" accept="image/*" on:change={handleFileSelect} />

<style>
	input[type='file'] {
		display: none;
	}
</style>
