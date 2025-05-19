# ECMI Website Deployment Documentation

## Table of Contents

1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Environment Setup](#environment-setup)
4. [Deployment Methods](#deployment-methods)
   - [GitHub Actions (CI/CD)](#github-actions-cicd)
   - [Manual Deployment](#manual-deployment)
5. [Docker Environment](#docker-environment)
6. [Handling Ghost CMS Images](#handling-ghost-cms-images)
7. [Troubleshooting](#troubleshooting)

## Overview

This documentation provides a comprehensive guide for deploying the ECMI website application, which consists of:

- Next.js frontend with i18n support (English and Amharic locales)
- Ghost CMS for blog content
- MySQL databases for application data and Ghost CMS

## System Requirements

- **Node.js**: v18.x or later
- **MySQL**: v5.7 (required for Ghost CMS)
- **PM2**: For process management in production
- **Docker & Docker Compose**: For running Ghost CMS and database services
- **Nginx**: For production web server and routing

## Environment Setup

The application requires the following environment variables:

```
# Next.js App
DATABASE_URL=mysql://user:password@localhost:3306/database
NEXT_PUBLIC_GHOST_URL=http://your-ghost-url
NEXT_PUBLIC_GHOST_CONTENT_API_KEY=your-ghost-api-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret

# Add other required environment variables as needed
```

## Deployment Methods

### GitHub Actions (CI/CD)

The application uses GitHub Actions for automated deployments to both development and production environments.

#### Development Deployment

Triggered on pushes to the `dev` branch:

1. **Database Migration**: Runs Prisma migrations
2. **Build**: Installs dependencies and builds the Next.js application
3. **Deploy**: SSH into the development server and:
   - Pull latest code
   - Install production dependencies
   - Run Prisma migrations
   - Build the application
   - Restart the PM2 process

#### Production Deployment

Triggered on pushes to the `main` branch:

1. **Build & Migration**: Combined into a single job that:
   - Installs dependencies
   - Runs Prisma migrations
   - Builds the Next.js application
2. **Deploy**: SSH into the production server and:
   - Pull latest code
   - Install production dependencies
   - Run Prisma migrations
   - Build the application
   - Restart the PM2 process

### Manual Deployment

If you need to deploy manually:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/ecmi.git
   cd ecmi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the application:

   ```bash
   npm run build
   ```

4. Start with PM2:

   ```bash
   PORT=3000 pm2 start npm --name "ecmi" -- start
   ```

## Docker Environment

The application uses Docker Compose to run Ghost CMS and database services:

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d ghost ghost-db

# View logs
docker-compose logs -f ghost
```

### Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

- `ghost`: Production Ghost CMS instance (port 8005)
- `ghost-dev`: Development Ghost CMS instance (port 8050)
- `ghost-db`: MySQL database for production Ghost (port 3340)
- `ghost-dev-db`: MySQL database for development Ghost (port 3355)
- `cmi-db`: Main application database (port 3306)
- `cmi-dev-db`: Development application database (port 3350)

## Handling Ghost CMS Images

### Issue with Localized Routes

The application uses i18n with `/en` and `/am` routes, which can cause issues with Ghost CMS image paths.

### Nginx Configuration for Production

To properly handle Ghost CMS images in production, configure Nginx to proxy image requests directly to Ghost:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Handle Ghost image requests directly
    location ~ ^/content/images/ {
        # Proxy to your Ghost container
        proxy_pass http://ghost:2368;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Your existing Next.js configuration
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Next.js Configuration

The Next.js config is already set up to handle Ghost CMS images through the `remotePatterns` configuration in `next.config.mjs`. Make sure this configuration matches your Ghost CMS URL.

## Troubleshooting

### Ghost CMS Image 404 Errors

If images from Ghost CMS return 404 errors:

1. **Check Nginx Configuration**: Ensure the `/content/images/` location block properly proxies to Ghost.
2. **Verify Ghost URL**: Confirm the `NEXT_PUBLIC_GHOST_URL` environment variable is set correctly:

   ```
   # Development
   NEXT_PUBLIC_GHOST_URL=http://localhost:8005

   # Production
   NEXT_PUBLIC_GHOST_URL=https://your-ghost-domain.com
   ```

3. **Image Error Handling**: The application includes error handling for Ghost images in the news pages. Review the implementation in `src/app/[lng]/news/[slug]/page.tsx` if you need to add similar handling elsewhere.

### Database Connectivity Issues

1. **Check Connection String**: Verify the `DATABASE_URL` environment variable.
2. **Docker Network**: Ensure containers can communicate if using Docker for databases.
3. **Prisma Migration Errors**: Run migrations manually:

   ```bash
   npx prisma migrate deploy
   ```

### PM2 Process Management

List running processes:

```bash
pm2 list
```

View logs:

```bash
pm2 logs ecmi_production
```

Restart application:

```bash
pm2 restart ecmi_production
```
