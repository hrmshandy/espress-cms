import { createAuthClient } from 'better-auth/vue';
import { adminClient, emailOTPClient, usernameClient } from 'better-auth/client/plugins';

/**
 * Client-side authentication for Espress CMS
 * This is used in the frontend applications to handle authentication
 */
export const authClient = createAuthClient({
  plugins: [adminClient(), emailOTPClient(), usernameClient() ],
});

// Export the auth client methods
export const {
  // Session management
  useSession,
  getSession,
  
  // Sign in methods
  signIn, 
  
  // Sign up methods
  signUp,
  
  // Sign out
  signOut,
  
  // Password management
  resetPassword,
  changePassword,
  
  // Email verification
  verifyEmail,
} = authClient;

// Export the admin client methods
export const admin = authClient.admin;
