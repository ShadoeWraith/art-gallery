<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonProps = {
		href?: string;
		onclick?: (e: MouseEvent) => void;
		disabled?: boolean;
		loadingText?: string;
		className?: string;
		children?: Snippet;
		label?: string;
		size?: 'sm' | 'base' | 'lg';
	};

	let {
		href,
		onclick,
		disabled = false,
		loadingText = 'Loading...',
		label,
		className = '',
		children,
		size = 'base'
	}: ButtonProps = $props();

	// Size lookup table
	const sizeClasses = {
		sm: 'px-8 py-2 text-[9px]',
		base: 'px-12 py-3 text-[10px]',
		lg: 'px-16 py-5 text-[12px]'
	};

	const baseClass = `
        group relative inline-flex items-center justify-center overflow-hidden 
        border border-stone-900 transition-colors duration-300 
        active:scale-[0.98] font-bold tracking-[0.3em] uppercase
    `;
</script>

{#if href}
	<a {href} class="{baseClass} {sizeClasses[size]} {className}">
		<span
			class="relative z-10 text-stone-950 transition-colors duration-300 group-hover:text-white"
		>
			{#if children}{@render children()}{:else}{label}{/if}
		</span>
		<div
			class="absolute inset-[-1px] z-0 h-[105%] translate-y-full bg-stone-900 transition-transform duration-300 ease-out group-hover:translate-y-0"
		></div>
	</a>
{:else}
	<button
		{onclick}
		{disabled}
		class="{baseClass} {sizeClasses[
			size
		]} disabled:border-stone-200 disabled:text-stone-300 {className} cursor-pointer"
	>
		<span
			class="relative z-10 transition-colors duration-300
            {disabled ? 'text-stone-300' : 'text-stone-950 group-hover:text-white'}"
		>
			{#if disabled}
				{loadingText}
			{:else if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</span>
		<div
			class="absolute inset-[-1px] z-0 h-[105%] translate-y-full bg-stone-900 transition-transform duration-300 ease-out
            {disabled ? 'hidden' : 'group-hover:translate-y-0'}"
		></div>
	</button>
{/if}
