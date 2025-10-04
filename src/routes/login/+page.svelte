<script lang="ts">
	import { userManager } from '$lib/userManager';

	const signIn = () => {
		userManager.signinRedirect();
	};
</script>

<button onclick={signIn}>Login</button>
