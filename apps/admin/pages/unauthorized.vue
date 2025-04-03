<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md text-center">
      <div>
        <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Espress CMS Logo" />
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Access Denied</h2>
        <p class="mt-2 text-sm text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
      
      <div class="mt-8">
        <NuxtLink 
          to="/dashboard" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
