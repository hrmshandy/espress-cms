import { useSession } from '@espress/auth/client';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("🚀 ~ defineNuxtRouteMiddleware ~ from:", from)
  console.log("🚀 ~ defineNuxtRouteMiddleware ~ to:", to)
  const { data: session } = await useSession(useFetch);

  if ((to.path === '/login' || to.path === '/register') && session.value) {
    return navigateTo("/dashboard");
  }
    
  // If no session data exists, redirect to login page
  if (!session.value) {
    return navigateTo("/login");
  }
  
  // Check for specific role-based access if needed
  // For example, restrict certain paths to admin role only
  // if (to.path.startsWith('/settings') && session?.user?.role !== 'admin') {
  //   return navigateTo('/unauthorized');
  // }
  
  // // Restrict admin panel access to admin users
  // if (to.path.startsWith('/admin') && session?.user?.role !== 'admin') {
  //   return navigateTo('/unauthorized');
  // }
  // Skip authentication for login and register pages
});
