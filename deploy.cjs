// deploy.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const execPromise = util.promisify(exec);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Default configuration
const defaultConfig = {
  remoteUser: 'your-username',
  remoteHost: 'your-server.com',
  remotePath: '/var/www/yourwebsite',
  distPath: 'dist',
  buildCommand: 'pnpm run build',
  restartServer: true,
  restartCommand: 'sudo systemctl restart nginx',
  timeout: 300000, // 5 minutes
  retryAttempts: 3,
  retryDelay: 5000 // 5 seconds
};

async function loadConfig() {
  const configPath = path.join(process.cwd(), 'deploy.config.json');
  try {
    const configFile = await readFile(configPath, 'utf8');
    const userConfig = JSON.parse(configFile);
    return { ...defaultConfig, ...userConfig };
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No config file found, creating one with default settings...');
      await writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
      return defaultConfig;
    }
    throw new Error(`Error loading config: ${error.message}`);
  }
}

async function executeWithRetry(command, description, config, attempt = 1) {
  try {
    console.log(`${description}...`);
    const { stdout, stderr } = await execPromise(command, { timeout: config.timeout });
    if (stderr && !stderr.includes('Warning')) console.warn(`${description} warnings:`, stderr);
    return stdout;
  } catch (error) {
    if (attempt < config.retryAttempts) {
      console.warn(`${description} failed, retrying in ${config.retryDelay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      return executeWithRetry(command, description, config, attempt + 1);
    }
    throw new Error(`${description} failed after ${config.retryAttempts} attempts: ${error.message}`);
  }
}

async function checkPrerequisites() {
  try {
    const isWindows = process.platform == 'win32';
    
    const sshCommand = isWindows ? 'where.exe ssh' : 'which ssh';
    const rsyncCommand = isWindows ? 'where.exe rsync' : 'which rsync';
    const scpCommand = isWindows ? 'where.exe scp' : 'which scp';
    // Check for deployment tools
    const hasSsh = await execPromise(sshCommand).catch(() => false);
    const hasRsync = await execPromise(rsyncCommand).catch(() => false);
    const hasScp = await execPromise(scpCommand).catch(() => false);
    
    if (!hasRsync && !hasScp && !hasSsh) {
      throw new Error('Neither rsync nor scp found. Please install one of them.');
    }

    return { hasRsync };
  } catch (error) {
    throw new Error(`Prerequisite check failed: ${error.message}`);
  }
}

async function validateConnection(config) {
  try {
    await execPromise(`ssh -q ${config.remoteUser}@${config.remoteHost} exit`);
  } catch (error) {
    throw new Error(`Cannot connect to server. Please check your SSH setup and server details: ${error.message}`);
  }
}

async function deploy() {
  try {
    // Load configuration
    const config = await loadConfig();
    
    // Validate paths
    config.distPath = path.resolve(config.distPath);
    
    // Check prerequisites
    console.log('Checking prerequisites...');
    const { hasRsync } = await checkPrerequisites();
    
    // Validate SSH connection
    console.log('Validating server connection...');
    await validateConnection(config);

    // Build project
    await executeWithRetry(config.buildCommand, 'Building project', config);

    // // Verify dist directory exists
    if (!fs.existsSync(config.distPath)) {
      throw new Error(`Build directory ${config.distPath} not found`);
    }

    const distFilesPath = path.join(config.distPath, '*')
    // Prepare deployment command
    const deployCommand = hasRsync
      ? `rsync -avz --delete "${distFilesPath}" "${config.remoteUser}@${config.remoteHost}:${config.remotePath}"`
      : `scp -r "${distFilesPath}" "${config.remoteUser}@${config.remoteHost}:${config.remotePath}"`;

    // Deploy
    await executeWithRetry(deployCommand, 'Deploying to server', config);
    console.log(`executing: ${deployCommand}`);

    // Restart server if configured
    if (config.restartServer) {
      const restartCommand = `ssh ${config.remoteUser}@${config.remoteHost} "${config.restartCommand}"`;
      await executeWithRetry(restartCommand, 'Restarting web server', config);
      console.log(`executing: ${restartCommand}`);
    }

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run deployment
deploy();
