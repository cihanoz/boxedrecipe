<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase';
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  
  let user: any = null;
  let dropdownOpen = false;
  let initials = '';

  onMount(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
      if (user?.displayName) {
        initials = user.displayName
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase();
      }
    });
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dropdownOpen = false;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      dropdownOpen = false;
    }
  };
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="bg-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-indigo-600">YourLogo</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a
            href="/"
            class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
          >
            Home
          </a>
          <!-- Add more navigation items as needed -->
        </div>
      </div>

      <div class="flex items-center">
        {#if user}
          <div class="ml-3 relative user-menu">
            <div>
              <button
                type="button"
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                on:click={toggleDropdown}
              >
                {#if user.photoURL}
                  <img
                    class="h-8 w-8 rounded-full"
                    src={user.photoURL}
                    alt="User avatar"
                  />
                {:else}
                  <div class="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {initials || user.email[0].toUpperCase()}
                  </div>
                {/if}
              </button>
            </div>

            {#if dropdownOpen}
              <div
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
              >
                <div class="px-4 py-2 text-xs text-gray-500">
                  {user.email}
                </div>
                <a
                  href="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Your Profile
                </a>
                <a
                  href="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Settings
                </a>
                <button
                  on:click={handleLogout}
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            {/if}
          </div>
        {:else}
          <div class="hidden sm:flex sm:items-center sm:space-x-4">
            <a
              href="/login"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign in
            </a>
            <a
              href="/signup"
              class="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </a>
          </div>
          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Icon for menu -->
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div class="sm:hidden">
    <div class="pt-2 pb-3 space-y-1">
      <a
        href="/"
        class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
      >
        Home
      </a>
      <!-- Add more mobile menu items as needed -->
    </div>
    {#if !user}
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="space-y-1">
          <a
            href="/login"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Sign in
          </a>
          <a
            href="/signup"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Sign up
          </a>
        </div>
      </div>
    {/if}
  </div>
</nav>
