<script setup lang="ts">
import { ref, reactive } from 'vue';
import { signIn } from '@espress/auth/client';

// Define the login form
const form = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: '',
  general: ''
});

const isLoading = ref(false);

// Handle form submission
const handleSubmit = async () => {
  try {
    // Reset errors
    errors.email = '';
    errors.password = '';
    errors.general = '';

    // Validate form
    if (!form.email) {
      errors.email = 'Email is required';
      return;
    }
    if (!form.password) {
      errors.password = 'Password is required';
      return;
    }

    isLoading.value = true;

    // Sign in with email and password
    const result = await signIn.email({
      email: form.email,
      password: form.password
    });

    if (result.error) {
      errors.general = result.error.message || 'Login failed';
    } else {
      // Redirect to dashboard after successful login
      navigateTo('/dashboard');
    }
  } catch (error) {
    console.error('Login failed:', error);
    errors.general = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="w-full px-6 py-6 flex justify-center">
      <!-- Logo Here -->
    </div>
    <div class="flex flex-col justify-center min-h-full py-12 mt-auto mb-auto px-4 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="NoiseCard">
          <img src="https://cloud.tiptap.dev/images/gradients/gradient_login.png" class="NoiseCard__Gradient">
          <div class="relative p-8 sm:p-10 space-y-6 dark">
            <div class="space-y-1 text-center">
              <h1 class="text-2xl font-bold">Log in</h1>
            </div>

            <form class="space-y-6" @submit.prevent="handleSubmit">
              <div class="space-y-2">
                <div class="space-y-1">
                  <div class="grid gap-2">
                    <UiLabel for="email">Email</UiLabel>
                    <UiInput id="email" type="email" placeholder="m@example.com" v-model="form.email"
                      class="border-gray-400" required />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>
                  <div class="grid gap-2">
                    <div class="flex items-center">
                      <UiLabel for="password">Password</UiLabel>
                      <a href="#" class="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </a>
                    </div>
                    <UiInput id="password" type="password" v-model="form.password" class="border-gray-400" required />
                    <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                  </div>
                </div>
              </div>

              <UiButton type="submit" class="w-full" :disabled="isLoading">
                <span v-if="isLoading">Signing in...</span>
                <span v-else>Sign in</span>
              </UiButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
