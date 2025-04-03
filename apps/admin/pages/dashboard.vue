<script setup lang="ts">
import { useSession, signOut } from '@espress/auth/client';

// Get the current session
const sessionData = useSession(useFetch);

// Handle sign out
const handleSignOut = async () => {
  await signOut();
  navigateTo('/login');
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
              <a href="#" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Content
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Media
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Settings
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="ml-3 relative">
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700 mr-2">{{ sessionData.data?.user?.name }}</span>
                <button 
                  @click="handleSignOut"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign out
                </button>
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
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Dashboard content -->
          <div class="px-4 py-8 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
              <div v-if="sessionData.isPending">
                <p class="text-center text-gray-500">Loading...</p>
              </div>
              <div v-else-if="sessionData.data">
                <h2 class="text-lg font-medium text-gray-900">Welcome, {{ sessionData.data?.user?.name }}!</h2>
                <p class="mt-1 text-sm text-gray-500">You are signed in as {{ sessionData.data?.user?.email }}</p>
                <p class="mt-1 text-sm text-gray-500">Role: {{ sessionData.data?.user?.role || 'Not assigned' }}</p>
                
                <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <!-- Dashboard cards -->
                  <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <!-- Document icon -->
                          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                          <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">
                              Total Content
                            </dt>
                            <dd>
                              <div class="text-lg font-medium text-gray-900">
                                0
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-4 sm:px-6">
                      <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                          View all<span class="sr-only"> content</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <!-- Users icon -->
                          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                          <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">
                              Total Users
                            </dt>
                            <dd>
                              <div class="text-lg font-medium text-gray-900">
                                1
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-4 sm:px-6">
                      <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                          View all<span class="sr-only"> users</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <!-- Media icon -->
                          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                          <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">
                              Media Files
                            </dt>
                            <dd>
                              <div class="text-lg font-medium text-gray-900">
                                0
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-4 sm:px-6">
                      <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                          View all<span class="sr-only"> media</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-center text-gray-500">You are not signed in. Please <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-500">sign in</NuxtLink> to access the dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
