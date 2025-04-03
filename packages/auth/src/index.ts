import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, emailOTP, username } from 'better-auth/plugins';

// Import the shared Prisma client from the database package
import { prisma } from '@espress/database';

/**
 * Core authentication configuration for Espress CMS
 */
export const auth = betterAuth({
  // Use the Prisma adapter with our existing Prisma client
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  
  // Configure email and password authentication
  emailAndPassword: {
    enabled: true,
  },
  
  // Add plugins
  plugins: [
    admin(),
    emailOTP({ 
      async sendVerificationOTP({ email, otp, type }) { 
        // TODO: Implement the sendVerificationOTP method to send the OTP to the user's email address
        console.log(`Sending ${type} OTP to ${email}: ${otp}`);
      }, 
    }),
    username() 
  ],
});

// Export types
export type { User, Session } from 'better-auth';

// Re-export plugins for convenience
export { admin, emailOTP, username } from 'better-auth/plugins';
