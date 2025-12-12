#!/usr/bin/env node

/**
 * Script to load Data Connect data from GQL files
 * Usage: node scripts/loadDataConnectData.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '..');
const DATACONNECT_DIR = path.join(PROJECT_ROOT, 'dataconnect');

console.log('🚀 Loading Data Connect data...\n');

// Check if Data Connect emulator is running
try {
  execSync('curl -s http://localhost:9390', { stdio: 'ignore' });
  console.log('✅ Data Connect emulator is running\n');
} catch (error) {
  console.error('❌ Data Connect emulator is not running!');
  console.error('Please start the emulator with: firebase emulators:start');
  process.exit(1);
}

// Load file data
const fileDataInsertPath = path.join(DATACONNECT_DIR, 'filedata_insert.gql');
if (fs.existsSync(fileDataInsertPath)) {
  console.log('📁 Loading file data from filedata_insert.gql...');
  try {
    const command = `firebase dataconnect:sql:execute --instance-id=file-manager-fdc --database=zfile-manager-v2 --file=${fileDataInsertPath}`;
    execSync(command, { cwd: PROJECT_ROOT, stdio: 'inherit' });
    console.log('✅ File data loaded successfully\n');
  } catch (error) {
    console.error('❌ Failed to load file data');
    console.error(error.message);
  }
} else {
  console.log('⚠️  filedata_insert.gql not found, skipping...\n');
}

// Load movie data
const movieDataInsertPath = path.join(DATACONNECT_DIR, 'moviedata_insert.gql');
if (fs.existsSync(movieDataInsertPath)) {
  console.log('🎬 Loading movie data from moviedata_insert.gql...');
  try {
    const command = `firebase dataconnect:sql:execute --instance-id=file-manager-fdc --database=zfile-manager-v2 --file=${movieDataInsertPath}`;
    execSync(command, { cwd: PROJECT_ROOT, stdio: 'inherit' });
    console.log('✅ Movie data loaded successfully\n');
  } catch (error) {
    console.error('❌ Failed to load movie data');
    console.error(error.message);
  }
} else {
  console.log('⚠️  moviedata_insert.gql not found, skipping...\n');
}

console.log('✨ Data loading complete!\n');
