# TravelAI Platform Deployment Guide

This guide provides instructions for deploying the TravelAI Platform to production environments.

## Deployment Prerequisites

- Node.js 16+ (with ESM support)
- PostgreSQL database
- Required API keys:
  - AVIATION_API_KEY (for flight data)
  - RAPID_API_KEY (for destination and flight information)
  - OPENAI_API_KEY (for AI assistants and insights)
  - STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY (for payment processing)

## Deployment Process

### 1. Prepare for Deployment

Run the deployment preparation script:

```bash
./prepare-deploy.sh
```

This script:
- Transpiles TypeScript server files to JavaScript
- Creates fallback HTML pages 
- Sets up directory structure for production
- Creates server startup script

### 2. Deploy the Application

The prepared application files are located in the `dist` directory. Deploy these files to your production environment.

### 3. Start the Application

From the deployment directory, start the application using:

```bash
cd dist
NODE_ENV=production node server-starter.mjs
```

For deployment to services like Vercel, Netlify, or similar platforms, make sure to:

1. Set the build command to run `./prepare-deploy.sh`
2. Set the output directory to `dist`
3. Set the start command to `NODE_ENV=production node server-starter.mjs`
4. Configure all necessary environment variables

## Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| AVIATION_API_KEY | API key for aviation data |
| RAPID_API_KEY | API key for RapidAPI services |
| OPENAI_API_KEY | API key for OpenAI services |
| STRIPE_PUBLISHABLE_KEY | Public key for Stripe |
| STRIPE_SECRET_KEY | Secret key for Stripe |

## Production Configuration

The server runs on port 3000 by default. To change the port, set the `PORT` environment variable.

## Database Setup

The application automatically sets up the database tables on first run. No manual migration is required.

## Backup and Recovery

Regularly backup your PostgreSQL database to prevent data loss. Use PostgreSQL's built-in backup tools:

```bash
pg_dump -U username -d databasename > backup.sql
```

## Monitoring

Monitor application logs for error messages and performance issues. In production, consider using a monitoring service like New Relic, Datadog, or PM2.

## Troubleshooting

If the application fails to start, check:
1. Database connection
2. Required environment variables
3. Server logs for error messages

### Known TypeScript Warnings

The production code may have some TypeScript warnings, particularly in:
- `server/services/rapidApiService.js` - TypeScript unknown type warnings for error handling
- `shared/schema.js` - Circular reference warnings

These warnings do not affect functionality and have been addressed in the transpiled JavaScript code.

For assistance, contact the development team.