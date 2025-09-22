// Comprehensive deployment script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting TravelAI deployment preparation...');

// Directory setup
const distPath = path.resolve('./dist');
const publicPath = path.join(distPath, 'public');
const clientPath = path.join(distPath, 'client');
const serverPath = path.join(distPath, 'server');
const serverSrcPath = path.resolve('./server');
const sharedSrcPath = path.resolve('./shared');

// Create necessary directories
async function setupDirectories() {
  console.log('Setting up directory structure...');
  const dirs = [distPath, publicPath, clientPath, serverPath];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }
}

// Create fallback HTML pages
function createFallbackPages() {
  console.log('Creating fallback HTML pages...');
  
  // Default fallback page
  const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelAI - AI-Powered Travel Platform</title>
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        background: #f0f7ff;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        text-align: center;
      }
      .container {
        max-width: 600px;
        padding: 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      }
      h1 { color: #4361ee; margin-bottom: 0.5rem; }
      p { color: #4f4f4f; line-height: 1.6; }
      .soon { 
        display: inline-block;
        background: #4361ee;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }
      .status { margin-top: 1rem; font-size: 0.85rem; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>TravelAI</h1>
      <p>Your AI-powered travel assistant is currently being updated with new features.</p>
      <p>Our development team is working to bring you an enhanced travel experience.</p>
      <div class="soon">Coming soon</div>
      <div class="status">Last updated: ${new Date().toISOString()}</div>
    </div>
  </body>
</html>`;

  // Define our special pages
  const specialPages = {
    'updating.html': fs.existsSync(path.join(clientPath, 'updating.html')) 
      ? fs.readFileSync(path.join(clientPath, 'updating.html'), 'utf8')
      : fallbackHtml,
    'maintenance.html': fs.existsSync(path.join(clientPath, 'maintenance.html'))
      ? fs.readFileSync(path.join(clientPath, 'maintenance.html'), 'utf8')
      : fallbackHtml,
    'error.html': fs.existsSync(path.join(clientPath, 'error.html'))
      ? fs.readFileSync(path.join(clientPath, 'error.html'), 'utf8')
      : fallbackHtml
  };

  try {
    // Write the main fallback page
    fs.writeFileSync(path.join(publicPath, 'index.html'), fallbackHtml);
    fs.writeFileSync(path.join(clientPath, 'index.html'), fallbackHtml);
    
    // Write special fallback pages
    for (const [filename, content] of Object.entries(specialPages)) {
      fs.writeFileSync(path.join(publicPath, filename), content);
      // Only write to client path if it doesn't already exist
      if (!fs.existsSync(path.join(clientPath, filename))) {
        fs.writeFileSync(path.join(clientPath, filename), content);
      }
    }
    
    console.log('✓ Created fallback HTML files');
  } catch (error) {
    console.error('Error creating fallback files:', error);
    throw error;
  }
}

// Create server starter script for production
function createServerStarter() {
  console.log('Creating server starter script...');
  
  const starterScript = `// Server starter for production
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Set production environment
process.env.NODE_ENV = 'production';

// Get server version
const VERSION = '1.0.0';

async function checkEnvironment() {
  const requiredVars = [
    'DATABASE_URL',
    'AVIATION_API_KEY',
    'RAPID_API_KEY',
    'OPENAI_API_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn(\`WARNING: Missing environment variables: \${missing.join(', ')}\`);
    console.warn('Some features may not work properly without these variables.');
  }
  
  // Update deployment info
  try {
    const deploymentInfo = JSON.parse(await fs.readFile('./deployment-info.json', 'utf8'));
    deploymentInfo.startedAt = new Date().toISOString();
    await fs.writeFile('./deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
  } catch (err) {
    console.warn('Could not update deployment info:', err.message);
  }
}

console.log(\`Starting TravelAI server v\${VERSION} in production mode...\`);

// Check environment before starting
await checkEnvironment();

// Import and run the server
try {
  const module = await import('./server/index.js');
  console.log('Server imported and started successfully');
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
  });
  
  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
  });
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}
`;

  try {
    fs.writeFileSync(path.join(distPath, 'server-starter.mjs'), starterScript);
    console.log('✓ Created server starter script (server-starter.mjs)');
  } catch (error) {
    console.error('Error creating server starter:', error);
    throw error;
  }
}

// Copy server files
async function copyServerFiles() {
  console.log('Copying server files...');
  
  try {
    // Create server/services directory if it doesn't exist
    const servicesPath = path.join(serverPath, 'services');
    if (!fs.existsSync(servicesPath)) {
      fs.mkdirSync(servicesPath, { recursive: true });
    }
    
    // Copy services directory content
    if (fs.existsSync(path.join(serverSrcPath, 'services'))) {
      try {
        await execAsync(`cp -r ${path.join(serverSrcPath, 'services')}/* ${servicesPath}/`);
        console.log('✓ Copied server/services directory');
      } catch (error) {
        console.error('Error copying services directory:', error);
      }
    }
    
    // Copy shared directory
    if (fs.existsSync(sharedSrcPath)) {
      try {
        await execAsync(`cp -r ${sharedSrcPath} ${path.join(distPath, 'server')}/`);
        console.log('✓ Copied shared directory');
      } catch (error) {
        console.error('Error copying shared directory:', error);
      }
    }
    
  } catch (error) {
    console.error('Error in copyServerFiles:', error);
    throw error;
  }
}

// Create a minimal package.json for deployment
function createDeploymentPackageJson() {
  console.log('Creating deployment package.json...');
  
  const packageJson = {
    "name": "travelai-platform",
    "version": "1.0.0",
    "type": "module",
    "description": "TravelAI Platform Deployment",
    "main": "server-starter.mjs",
    "scripts": {
      "start": "NODE_ENV=production node server-starter.mjs"
    },
    "engines": {
      "node": ">=16.0.0"
    },
    "dependencies": {
      "@napi-rs/canvas": "^0.1.41",
      "axios": "^1.3.4",
      "connect-pg-simple": "^8.0.0",
      "drizzle-orm": "^0.26.0",
      "express": "^4.18.2",
      "express-session": "^1.17.3",
      "pg": "^8.10.0",
      "stripe": "^12.0.0",
      "twilio": "^4.11.0",
      "ws": "^8.13.0",
      "zod": "^3.21.4"
    }
  };
  
  try {
    fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('✓ Created deployment package.json');
  } catch (error) {
    console.error('Error creating deployment package.json:', error);
    throw error;
  }
}

// Create metadata file with deployment info
function createMetadataFile() {
  console.log('Creating deployment metadata...');
  
  const metadata = {
    application: "TravelAI Platform",
    deployedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  };
  
  try {
    fs.writeFileSync(path.join(distPath, 'deployment-info.json'), JSON.stringify(metadata, null, 2));
    console.log('✓ Created deployment metadata');
  } catch (error) {
    console.error('Error creating metadata:', error);
  }
}

// Main deployment function
async function deploy() {
  try {
    await setupDirectories();
    createFallbackPages();
    createServerStarter();
    await copyServerFiles();
    createDeploymentPackageJson();
    createMetadataFile();
    
    console.log('\n✅ Deployment preparation complete!');
    console.log('\nApplication is ready for deployment with fallback pages.');
    console.log('\nTo start the application:');
    console.log('1. cd dist');
    console.log('2. NODE_ENV=production node server-starter.mjs');
    console.log('\nSpecial fallback pages available:');
    console.log('- updating.html: For application updates');
    console.log('- maintenance.html: For scheduled maintenance');
    console.log('- error.html: For error states');
    
  } catch (error) {
    console.error('\n❌ Deployment preparation failed:', error);
    process.exit(1);
  }
}

// Run the deployment process
deploy();