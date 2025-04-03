<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useSession } from '@espress/auth/client';
import { admin } from '@espress/auth/client';

// Get the current session
const sessionData = useSession(useFetch);

// Users data
const users = ref([]);
const isLoading = ref(true);
const error = ref('');

// Pagination
const pagination = reactive({
  total: 0,
  limit: 10,
  offset: 0,
  currentPage: 1,
  totalPages: 1
});

// User form for creating new users
const newUser = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user'
});

const userFormErrors = reactive({
  name: '',
  email: '',
  password: '',
  general: ''
});

const isCreatingUser = ref(false);
const showCreateUserForm = ref(false);

// Fetch users
const fetchUsers = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const result = await admin.listUsers({
      query: {
        limit: pagination.limit,
      offset: pagination.offset
      } 
    });
    
    if (result.error) {
      error.value = result.error.message || 'Failed to fetch users';
      return;
    }
    
    users.value = result.data.users;
    pagination.total = result.data.total;
    pagination.totalPages = Math.ceil(pagination.total / pagination.limit);
    pagination.currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
  } catch (err) {
    console.error('Error fetching users:', err);
    error.value = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};

// Create a new user
const createUser = async () => {
  try {
    // Reset errors
    userFormErrors.name = '';
    userFormErrors.email = '';
    userFormErrors.password = '';
    userFormErrors.general = '';
    
    // Validate form
    if (!newUser.name) {
      userFormErrors.name = 'Name is required';
      return;
    }
    if (!newUser.email) {
      userFormErrors.email = 'Email is required';
      return;
    }
    if (!newUser.password) {
      userFormErrors.password = 'Password is required';
      return;
    } else if (newUser.password.length < 8) {
      userFormErrors.password = 'Password must be at least 8 characters';
      return;
    }
    
    isCreatingUser.value = true;
    
    // Create user
    const result = await admin.createUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role
    });
    
    if (result.error) {
      userFormErrors.general = result.error.message || 'Failed to create user';
      return;
    }
    
    // Reset form
    newUser.name = '';
    newUser.email = '';
    newUser.password = '';
    newUser.role = 'user';
    
    // Refresh user list
    await fetchUsers();
    
    // Hide form
    showCreateUserForm.value = false;
  } catch (err) {
    console.error('Error creating user:', err);
    userFormErrors.general = 'An unexpected error occurred';
  } finally {
    isCreatingUser.value = false;
  }
};

// Set user role
const setUserRole = async (userId: string, role: string) => {
  try {
    const result = await admin.setRole({
      userId, role 
    });
    
    if (result.error) {
      alert(`Failed to update role: ${result.error.message}`);
      return;
    }
    
    // Refresh user list
    await fetchUsers();
  } catch (err) {
    console.error('Error setting user role:', err);
    alert('An unexpected error occurred');
  }
};

// Ban user
const banUser = async (userId: string) => {
  try {
    const reason = prompt('Enter reason for banning user:');
    if (reason === null) return; // User canceled
    
    const result = await admin.banUser({
      userId,
      banReason: reason,
      banExpiresIn: 30 * 24 * 60 * 60 // 30 days
    });
    
    if (result.error) {
      alert(`Failed to ban user: ${result.error.message}`);
      return;
    }
    
    // Refresh user list
    await fetchUsers();
  } catch (err) {
    console.error('Error banning user:', err);
    alert('An unexpected error occurred');
  }
};

// Unban user
const unbanUser = async (userId: string) => {
  try {
    const result = await admin.unbanUser({
      userId
    });
    
    if (result.error) {
      alert(`Failed to unban user: ${result.error.message}`);
      return;
    }
    
    // Refresh user list
    await fetchUsers();
  } catch (err) {
    console.error('Error unbanning user:', err);
    alert('An unexpected error occurred');
  }
};

// Remove user
const removeUser = async (userId: string) => {
  try {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    const result = await admin.removeUser({
      userId
    });
    
    if (result.error) {
      alert(`Failed to remove user: ${result.error.message}`);
      return;
    }
    
    // Refresh user list
    await fetchUsers();
  } catch (err) {
    console.error('Error removing user:', err);
    alert('An unexpected error occurred');
  }
};

// Pagination
const goToPage = (page: number) => {
  pagination.offset = (page - 1) * pagination.limit;
  fetchUsers();
};

// Fetch users on mount
onMounted(() => {
  fetchUsers();
});
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
              <NuxtLink to="/admin/users" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Users
              </NuxtLink>
              <NuxtLink to="/admin/settings" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
          <div class="flex justify-between">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">User Management</h1>
            <button 
              @click="showCreateUserForm = !showCreateUserForm" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ showCreateUserForm ? 'Cancel' : 'Create User' }}
            </button>
          </div>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Create user form -->
          <div v-if="showCreateUserForm" class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Create New User</h3>
              
              <div v-if="userFormErrors.general" class="mt-2 p-2 bg-red-100 text-red-700 rounded">
                {{ userFormErrors.general }}
              </div>
              
              <form @submit.prevent="createUser" class="mt-5 space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    v-model="newUser.name"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p v-if="userFormErrors.name" class="mt-1 text-sm text-red-600">{{ userFormErrors.name }}</p>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    v-model="newUser.email"
                    type="email"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p v-if="userFormErrors.email" class="mt-1 text-sm text-red-600">{{ userFormErrors.email }}</p>
                </div>
                
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    v-model="newUser.password"
                    type="password"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p v-if="userFormErrors.password" class="mt-1 text-sm text-red-600">{{ userFormErrors.password }}</p>
                </div>
                
                <div>
                  <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    id="role"
                    v-model="newUser.role"
                    class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="user">User</option>
                  </select>
                </div>
                
                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isCreatingUser"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span v-if="isCreatingUser">Creating...</span>
                    <span v-else>Create User</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Users table -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div v-if="isLoading" class="text-center py-4">
                <p class="text-gray-500">Loading users...</p>
              </div>
              
              <div v-else-if="error" class="text-center py-4">
                <p class="text-red-500">{{ error }}</p>
                <button 
                  @click="fetchUsers" 
                  class="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Retry
                </button>
              </div>
              
              <div v-else-if="users.length === 0" class="text-center py-4">
                <p class="text-gray-500">No users found.</p>
              </div>
              
              <div v-else>
                <div class="flex flex-col">
                  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50">
                            <tr>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created
                              </th>
                              <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="user in users" :key="user.id">
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 h-10 w-10">
                                    <div v-if="user.image" class="h-10 w-10 rounded-full">
                                      <img :src="user.image" alt="" class="h-10 w-10 rounded-full" />
                                    </div>
                                    <div v-else class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                      <span class="text-gray-500 font-medium">{{ user.name.charAt(0) }}</span>
                                    </div>
                                  </div>
                                  <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                      {{ user.name }}
                                    </div>
                                    <div v-if="user.id === sessionData.data?.user?.id" class="text-xs text-gray-500">
                                      (You)
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ user.email }}</div>
                                <div v-if="user.emailVerified" class="text-xs text-green-500">Verified</div>
                                <div v-else class="text-xs text-gray-500">Not verified</div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <select
                                  v-if="user.id !== sessionData.data?.user?.id"
                                  :value="user.role"
                                  @change="setUserRole(user.id, $event.target.value)"
                                  class="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option value="admin">Admin</option>
                                  <option value="editor">Editor</option>
                                  <option value="user">User</option>
                                </select>
                                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {{ user.role || 'User' }}
                                </span>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <span v-if="user.banned" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Banned
                                </span>
                                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ new Date(user.createdAt).toLocaleDateString() }}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex space-x-2 justify-end">
                                  <button
                                    v-if="user.id !== sessionData.data?.user?.id"
                                    @click="user.banned ? unbanUser(user.id) : banUser(user.id)"
                                    class="text-indigo-600 hover:text-indigo-900"
                                  >
                                    {{ user.banned ? 'Unban' : 'Ban' }}
                                  </button>
                                  <button
                                    v-if="user.id !== sessionData.data?.user?.id"
                                    @click="removeUser(user.id)"
                                    class="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Pagination -->
                <div class="mt-4 flex items-center justify-between">
                  <div class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ pagination.offset + 1 }}</span> to <span class="font-medium">{{ Math.min(pagination.offset + pagination.limit, pagination.total) }}</span> of <span class="font-medium">{{ pagination.total }}</span> users
                  </div>
                  <div class="flex-1 flex justify-end">
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        @click="goToPage(pagination.currentPage - 1)"
                        :disabled="pagination.currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        :class="{ 'opacity-50 cursor-not-allowed': pagination.currentPage === 1 }"
                      >
                        Previous
                      </button>
                      <button
                        v-for="page in pagination.totalPages"
                        :key="page"
                        @click="goToPage(page)"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
                        :class="page === pagination.currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'"
                      >
                        {{ page }}
                      </button>
                      <button
                        @click="goToPage(pagination.currentPage + 1)"
                        :disabled="pagination.currentPage === pagination.totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        :class="{ 'opacity-50 cursor-not-allowed': pagination.currentPage === pagination.totalPages }"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
