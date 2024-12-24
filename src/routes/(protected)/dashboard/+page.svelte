<script>
    import { authStore } from '$lib/firebase';
</script>

<div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    {#if $authStore.currentUser}
        <p>Welcome, {$authStore.currentUser.email}!</p>
    {/if}
</div> 