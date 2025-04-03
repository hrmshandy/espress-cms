import { signUp } from "@espress/auth/client";

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    const result = await signUp.email({
      name: "Admin",
      email: "admin@baninaqiqah.com",
      password: "P@ssword!",
      role: "admin"
    });

    console.log("🚀 ~ run ~ result:", result)
    return { status: 'success', result }
  },
})
