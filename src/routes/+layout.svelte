<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/ui/nav.svelte';
	import Footer from '$lib/components/ui/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav></Nav>

{@render children?.()}

<Footer></Footer>
