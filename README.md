# Espress CMS

A modern, full-featured CMS that brews content as smoothly as your morning espresso. Built with Turborepo, featuring a lightning-fast Astro website and a rich, robust Nuxt 3 admin panel.

## Features

- **Monorepo Structure**: Managed with Turborepo and pnpm workspaces
- **Frontend**: Astro-powered public website with blog and e-commerce features
- **Admin Panel**: Nuxt 3 admin interface with Vue 3 and shadcn-vue components
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: TailwindCSS 4 for consistent design across all applications
- **Authentication**: Secure user management with better-auth
- **Testing**: Vitest for unit and integration testing
- **Containerization**: Docker support for easy deployment

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `web`: An [Astro](https://astro.build) app for the public-facing website
- `admin`: A [Nuxt 3](https://nuxt.com) app for the admin panel

### Packages

- `@espress/ui`: Shared UI components for both Astro and Vue applications
- `@espress/database`: Prisma client and database utilities
- `@espress/eslint-config`: ESLint configurations with antfu config
- `@espress/typescript-config`: TypeScript configurations for different frameworks

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 9.0.0 or later
- Docker and Docker Compose (for PostgreSQL)

### Installation

1. Clone the repository

```sh
git clone https://github.com/yourusername/espress-cms.git
cd espress-cms
```

2. Install dependencies

```sh
pnpm install
```

3. Start the PostgreSQL database

```sh
docker-compose up -d
```

4. Set up the environment variables

```sh
cp packages/database/.env.example packages/database/.env
# Edit the .env file if needed
```

5. Generate Prisma client and push the schema to the database

```sh
pnpm db:generate
pnpm db:push
```

### Development

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

This will start the development servers for both the Astro frontend and Nuxt admin panel:

- Astro frontend: [http://localhost:4321](http://localhost:4321)
- Nuxt admin panel: [http://localhost:3000](http://localhost:3000)

### Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

## Main Features

### Content Management

- **Blog Posts**: Create, edit, and publish blog posts with categories and tags
- **Media Library**: Upload and manage images and other media files

### E-commerce

- **Products**: Manage products with categories, inventory, and pricing
- **Orders**: Process and track customer orders
- **Customers**: Manage customer information and purchase history
- **Promotions**: Create and manage promotional campaigns and discounts

### User Management

- **Authentication**: Secure login and registration
- **Role-based Access Control**: Admin, editor, and customer roles

## Docker Deployment

The project includes Dockerfiles for both the Astro frontend and Nuxt admin panel. To build and run the Docker containers:

```sh
# Build the Docker images
docker build -t turborepo-cms-web -f apps/web/Dockerfile .
docker build -t turborepo-cms-admin -f apps/admin/Dockerfile .

# Run the containers
docker run -p 4321:4321 turborepo-cms-web
docker run -p 3000:3000 turborepo-cms-admin
```

## Project Structure

```
├── apps
│   ├── admin             # Nuxt 3 admin panel
│   │   ├── components    # Vue components
│   │   ├── pages         # Admin pages
│   │   └── public        # Static assets
│   └── web               # Astro frontend
│       ├── public        # Static assets
│       └── src           # Source code
│           ├── components # Astro components
│           ├── layouts    # Page layouts
│           └── pages      # Website pages
├── packages
│   ├── database          # Prisma schema and database utilities
│   ├── eslint-config     # Shared ESLint configurations
│   ├── typescript-config # Shared TypeScript configurations
│   └── ui                # Shared UI components
└── docker-compose.yml    # Docker Compose configuration
```

## Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Astro Documentation](https://docs.astro.build)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn-vue Documentation](https://www.shadcn-vue.com/docs)
