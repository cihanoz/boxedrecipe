<script>
    import { onMount } from 'svelte';
    import { authStore } from '$lib/firebase';
    import { goto } from '$app/navigation';
    import AppLayout from '$lib/components/layout/AppLayout.svelte';

    onMount(() => {
        // Check authentication state
        const unsubscribe = authStore.subscribe((auth) => {
            if (!auth.currentUser) {
                // Redirect to login if not authenticated
                goto('/login');
            }
        });

        // Cleanup subscription on component destroy
        return () => unsubscribe();
    });
</script>

{#if $authStore.currentUser}
    <AppLayout>
        <slot />
    </AppLayout>
{/if} 