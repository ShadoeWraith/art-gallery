<script lang="ts">
	let image = $state(null);

	async function getImage() {
		const res = await fetch('/api/image/1');
		image = await res.json();
	}
</script>

<button onclick={getImage}>Get the Image</button>

{#if image !== null}
	<img src={image} alt="girl" />
{/if}
