<script>
    import Navbar from './Navbar.svelte';
    import Sidebar from './Sidebar.svelte';
    import Footer from './Footer.svelte';
</script>

<div class="min-h-screen flex flex-col">
    <div class="flex-1 flex">
        <Sidebar />
        <main class="flex-1 p-4">
            <slot />
        </main>
    </div>
    <Footer />
</div>
