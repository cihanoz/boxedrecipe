<script lang="ts">
  import { goto } from '$app/navigation';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '$lib/firebase';
  
  let email = '';
  let password = '';

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Clear form after successful login
      await goto('/dashboard');
      email = '';
      password = '';
    } catch (error: unknown) {
      if ((error as { code: string }).code === 'auth/invalid-email') {
        alert('Invalid email address format.');
      } else if ((error as { code: string }).code === 'auth/user-disabled') {
        alert('This account has been disabled. Please contact support.');
      } else if ((error as { code: string }).code === 'auth/user-not-found') {
        alert('No account found with this email. Please sign up first.');
      } else if ((error as { code: string }).code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert('An error occurred during login. Please try again.');
        console.error(error);
      }
      return;
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            bind:value={email}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>

      <div class="text-sm text-center mt-4">
        <span class="text-gray-600">Don't have an account?</span>
        <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
          Sign up
        </a>
      </div>
    </form>
  </div>
</div>