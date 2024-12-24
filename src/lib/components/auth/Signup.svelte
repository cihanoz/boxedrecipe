<script lang="ts">
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { auth } from '$lib/firebase';
  import { goto } from '$app/navigation';
  
  let email = '';
  let password = '';
  let confirmPassword = '';
  let fullName = '';

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate full name is not empty
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
        // Redirect to homepage after successful signup
        await goto('/dashboard');
      }
    } catch (error: unknown) {
      if ((error as { code: string }).code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please use a different email or try logging in.');
      } else if ((error as { code: string }).code === 'auth/invalid-email') {
        alert('The email address is not valid.');
      } else if ((error as { code: string }).code === 'auth/operation-not-allowed') {
        alert('Email/password accounts are not enabled. Please contact support.');
      } else if ((error as { code: string }).code === 'auth/weak-password') {
        alert('The password is too weak. Please choose a stronger password.');
      } else {
        alert('An error occurred during signup. Please try again.');
        console.error(error);
      }
      return;
    }
    console.log('Signup attempt:', { email, password, fullName });
    
    // Clear form
    email = '';
    password = '';
    confirmPassword = '';
    fullName = '';
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="full-name" class="sr-only">Full name</label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            bind:value={fullName}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Full name"
          />
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            bind:value={email}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div>
          <label for="confirm-password" class="sr-only">Confirm password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            bind:value={confirmPassword}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>

      <div class="text-sm text-center">
        <span class="text-gray-600">Already have an account?</span>
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
          Sign in
        </a>
      </div>
    </form>
  </div>
</div>