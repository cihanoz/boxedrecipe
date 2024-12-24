<script lang="ts">
  import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
  
  let email = '';
  let message = '';
  let isError = false;
  let isLoading = false;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    isLoading = true;
    message = '';
    
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      message = 'Password reset email sent! Please check your inbox.';
      isError = false;
      email = ''; // Clear the input after success
    } catch (error: any) {
      isError = true;
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        default:
          message = 'An error occurred. Please try again later.';
      }
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Reset your password
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>

    {#if message}
      <div class={`rounded-md p-4 ${isError ? 'bg-red-50' : 'bg-green-50'}`}>
        <p class={`text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>
          {message}
        </p>
      </div>
    {/if}

    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          bind:value={email}
          required
          class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isLoading}
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          {/if}
          {isLoading ? 'Sending...' : 'Send reset link'}
        </button>
      </div>

      <div class="text-sm text-center">
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Back to login
        </a>
      </div>
    </form>
  </div>
</div> 