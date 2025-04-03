<script setup lang="ts">
import { ref, reactive } from 'vue';
import { signUp } from '@espress/auth/client';

// Define the registration form
const form = reactive({
  name: '',
  email: '',
  password: ''
});

const errors = reactive({
  name: '',
  email: '',
  password: '',
  general: ''
});

const isLoading = ref(false);

// Handle form submission
const handleSubmit = async () => {
  try {
    // Reset errors
    errors.name = '';
    errors.email = '';
    errors.password = '';
    errors.general = '';
    
    // Validate form
    if (!form.name) {
      errors.name = 'Name is required';
      return;
    }
    if (!form.email) {
      errors.email = 'Email is required';
      return;
    }
    if (!form.password) {
      errors.password = 'Password is required';
      return;
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      return;
    }
    
    isLoading.value = true;
    
    // Sign up with email and password
    const result = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password
    });
    
    if (result.error) {
      errors.general = result.error.message || 'Registration failed';
    } else {
      // Redirect to dashboard after successful registration
      navigateTo('/dashboard');
    }
  } catch (error) {
    console.error('Registration failed:', error);
    errors.general = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
      <div class="text-center">
        <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Espress CMS Logo" />
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full name"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-if="isLoading">Creating account...</span>
            <span v-else>Create account</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
