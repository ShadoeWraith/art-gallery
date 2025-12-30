<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Icon from '@iconify/svelte';

	let formData = $state({
		name: '',
		email: '',
		subject: 'General Inquiry',
		message: ''
	});

	let status = $state('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		status = 'Sending...';

		// Example: saveToDB(formData);

		setTimeout(() => {
			status = 'Message Sent.';
		}, 1500);
	};

	// Icons only, using your preferred set
	const socials = [
		{ icon: 'mdi:facebook', href: '/facebook' },
		{ icon: 'mdi:instagram', href: '/instagram' },
		{ icon: 'ri:twitter-x-fill', href: '/x' },
		{ icon: 'mdi:pinterest', href: '/pinterest' }
	];
</script>

<section class="min-h-screen bg-white font-serif text-stone-900">
	<div class="flex h-24 w-full items-center border-b border-stone-200 px-8">
		<h1 class="text-xs tracking-[0.4em] text-stone-400 uppercase">
			Inquiries / <span class="text-stone-900">Contact Us</span>
		</h1>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12">
		<div class="col-span-12 border-stone-200 p-8 md:p-16 lg:col-span-7 lg:border-r lg:p-24">
			<header class="mb-16">
				<h2 class="text-4xl font-medium tracking-tight uppercase md:text-5xl">Get in Touch</h2>
				<p class="mt-4 max-w-xl font-sans text-lg text-stone-500">
					Our gallery operates exclusively online, connecting global collectors with curated African
					artistry. Reach out for acquisitions or inquiries.
				</p>
			</header>

			<form onsubmit={handleSubmit} class="space-y-12">
				<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
					<div class="relative">
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							placeholder=" "
							class="peer w-full border-b border-stone-300 bg-transparent py-2 font-sans text-stone-950 focus:border-stone-900 focus:outline-none"
						/>
						<label
							for="name"
							class="pointer-events-none absolute top-2 left-0 text-xs tracking-widest text-stone-500 uppercase transition-all
                peer-focus:-top-4 peer-focus:text-stone-950
                peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-stone-950"
						>
							Full Name
						</label>
					</div>

					<div class="relative">
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							placeholder=" "
							class="peer w-full border-b border-stone-300 bg-transparent py-2 font-sans text-stone-950 focus:border-stone-900 focus:outline-none"
						/>
						<label
							for="email"
							class="pointer-events-none absolute top-2 left-0 text-xs tracking-widest text-stone-500 uppercase transition-all
                peer-focus:-top-4 peer-focus:text-stone-950
                peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-stone-950"
						>
							Email Address
						</label>
					</div>
				</div>

				<div class="relative">
					<select
						id="subject"
						bind:value={formData.subject}
						class="peer w-full appearance-none border-b border-stone-300 bg-transparent py-2 font-sans text-stone-950 focus:border-stone-900 focus:outline-none"
					>
						<option value="" disabled selected>Select an option</option>
						<option>General Inquiry</option>
						<option>Acquisition Request</option>
						<option>Artist Representation</option>
						<option>Curatorial Partnership</option>
					</select>
					<label
						for="subject"
						class="absolute -top-4 left-0 text-xs font-bold tracking-widest text-stone-950 uppercase"
					>
						Inquiry Type
					</label>
				</div>

				<div class="relative">
					<textarea
						id="message"
						bind:value={formData.message}
						required
						placeholder=" "
						rows="4"
						class="peer w-full resize-none border-b border-stone-300 bg-transparent py-2 font-sans text-stone-950 focus:border-stone-900 focus:outline-none"
					></textarea>
					<label
						for="message"
						class="pointer-events-none absolute top-2 left-0 text-xs tracking-widest text-stone-500 uppercase transition-all
            peer-focus:-top-4 peer-focus:text-stone-950
            peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-stone-950"
					>
						Your Message
					</label>
				</div>

				<div class="flex items-center gap-8">
					<Button label={status || 'Send Message'} size="lg" />
				</div>
			</form>
		</div>

		<div class="col-span-12 bg-stone-50 p-8 md:p-16 lg:col-span-5 lg:p-24">
			<div class="space-y-20">
				<section>
					<h4 class="mb-6 text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">
						Digital Gallery
					</h4>
					<p class="font-sans text-lg leading-relaxed text-stone-600">
						Exclusively Online<br />
						Global Shipping & Private Advisory Available
					</p>
				</section>

				<section>
					<h4 class="mb-6 text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">
						Direct Channels
					</h4>
					<div class="space-y-6 font-sans text-stone-600">
						<div class="group cursor-pointer">
							<p class="mb-1 text-[10px] tracking-widest text-stone-400 uppercase">Inquiries</p>
							<p
								class="flex items-center gap-3 text-stone-900 transition-colors group-hover:text-stone-500"
							>
								<Icon icon="ph:envelope-light" class="text-xl" />
								hello@africacurated.com
							</p>
						</div>
						<div class="group cursor-pointer">
							<p class="mb-1 text-[10px] tracking-widest text-stone-400 uppercase">Support</p>
							<p
								class="flex items-center gap-3 text-stone-900 transition-colors group-hover:text-stone-500"
							>
								<Icon icon="ph:chat-circle-dots-light" class="text-xl" />
								support@africacurated.com
							</p>
						</div>
					</div>
				</section>

				<section>
					<h4 class="mb-8 text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">
						Follow the Collection
					</h4>
					<div class="flex flex-wrap gap-10">
						{#each socials as social}
							<a href={social.href} class="text-stone-400 transition-colors hover:text-stone-900">
								<Icon icon={social.icon} font-size="32" />
							</a>
						{/each}
					</div>
				</section>

				<div class="pt-12">
					<div class="h-px w-full bg-stone-200"></div>
					<p class="mt-8 font-serif text-sm leading-relaxed text-stone-400 italic">
						"Bridging the gap between the continent's finest artists and global collectors through a
						seamless digital experience."
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a8a29e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
		background-size: 1.5em;
	}
</style>
