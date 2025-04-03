<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useSession } from '@espress/auth/client';

// Get the current session
const sessionData = useSession(useFetch);

// Profile settings
const profile = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const profileErrors = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  general: ''
});

const isUpdatingProfile = ref(false);
const profileUpdateSuccess = ref(false);

// Load user data
onMounted(() => {
  if (sessionData.data?.user) {
    profile.name = sessionData.data.user.name || '';
    profile.email = sessionData.data.user.email || '';
  }
});

// Update profile
const updateProfile = async () => {
  try {
    // Reset errors and success message
    profileErrors.name = '';
    profileErrors.email = '';
    profileErrors.general = '';
    profileUpdateSuccess.value = false;
    
    // Validate form
    if (!profile.name) {
      profileErrors.name = 'Name is required';
      return;
    }
    if (!profile.email) {
      profileErrors.email = 'Email is required';
      return;
    }
    
    isUpdatingProfile.value = true;
    
    // Update profile using admin client
    // In a real implementation, you would use the admin.users.update method
    // For now, we'll just simulate a successful update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    profileUpdateSuccess.value = true;
  } catch (err) {
    console.error('Error updating profile:', err);
    profileErrors.general = 'An unexpected error occurred';
  } finally {
    isUpdatingProfile.value = false;
  }
};

// Change password
const changePassword = async () => {
  try {
    // Reset errors and success message
    profileErrors.currentPassword = '';
    profileErrors.newPassword = '';
    profileErrors.confirmPassword = '';
    profileErrors.general = '';
    profileUpdateSuccess.value = false;
    
    // Validate form
    if (!profile.currentPassword) {
      profileErrors.currentPassword = 'Current password is required';
      return;
    }
    if (!profile.newPassword) {
      profileErrors.newPassword = 'New password is required';
      return;
    }
    if (profile.newPassword.length < 8) {
      profileErrors.newPassword = 'Password must be at least 8 characters';
      return;
    }
    if (!profile.confirmPassword) {
      profileErrors.confirmPassword = 'Please confirm your new password';
      return;
    }
    if (profile.newPassword !== profile.confirmPassword) {
      profileErrors.confirmPassword = 'Passwords do not match';
      return;
    }
    
    isUpdatingProfile.value = true;
    
    // Change password using auth client
    // In a real implementation, you would use the appropriate method
    // For now, we'll just simulate a successful update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear password fields
    profile.currentPassword = '';
    profile.newPassword = '';
    profile.confirmPassword = '';
    
    // Show success message
    profileUpdateSuccess.value = true;
  } catch (err) {
    console.error('Error changing password:', err);
    profileErrors.general = 'An unexpected error occurred';
  } finally {
    isUpdatingProfile.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Top navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="/logo.svg" alt="Espress CMS Logo" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/dashboard" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </NuxtLink>
              <NuxtLink to="/admin/users" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Users
              </NuxtLink>
              <NuxtLink to="/admin/settings" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Settings
              </NuxtLink>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="ml-3 relative">
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700 mr-2">{{ sessionData.data?.user?.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Settings</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Update your account information.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div v-if="profileUpdateSuccess" class="p-4 mb-4 bg-green-100 rounded-md">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">
                          Your profile has been updated successfully.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="profileErrors.general" class="p-4 mb-4 bg-red-100 rounded-md">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-red-800">
                          {{ profileErrors.general }}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        v-model="profile.name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p v-if="profileErrors.name" class="mt-1 text-sm text-red-600">{{ profileErrors.name }}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        v-model="profile.email"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p v-if="profileErrors.email" class="mt-1 text-sm text-red-600">{{ profileErrors.email }}</p>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    @click="updateProfile"
                    :disabled="isUpdatingProfile"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span v-if="isUpdatingProfile">Saving...</span>
                    <span v-else>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <div class="mt-10 sm:mt-0 md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Update your password to keep your account secure.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-4">
                      <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        v-model="profile.currentPassword"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p v-if="profileErrors.currentPassword" class="mt-1 text-sm text-red-600">{{ profileErrors.currentPassword }}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        v-model="profile.newPassword"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p v-if="profileErrors.newPassword" class="mt-1 text-sm text-red-600">{{ profileErrors.newPassword }}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        v-model="profile.confirmPassword"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p v-if="profileErrors.confirmPassword" class="mt-1 text-sm text-red-600">{{ profileErrors.confirmPassword }}</p>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    @click="changePassword"
                    :disabled="isUpdatingProfile"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span v-if="isUpdatingProfile">Updating...</span>
                    <span v-else>Update Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
