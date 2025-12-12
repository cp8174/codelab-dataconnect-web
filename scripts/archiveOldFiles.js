#!/usr/bin/env node

/**
 * File Archiver Script
 * Archives files older than configured minutes using Firebase Data Connect
 * Can be run manually or via cron job
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Configuration
const ARCHIVE_AFTER_MINUTES = process.env.ARCHIVE_AFTER_MINUTES || 60;
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'emc-zdtrk-development1-d';
const SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_KEY || './service-account-key.json';

console.log('🗂️  File Archiver Script');
console.log('========================');
console.log(`Project: ${PROJECT_ID}`);
console.log(`Archive threshold: ${ARCHIVE_AFTER_MINUTES} minutes\n`);

// Initialize Firebase Admin
let app;
try {
  if (process.env.FIREBASE_CONFIG) {
    // Running in Firebase environment
    app = initializeApp();
  } else {
    // Running locally with service account
    const serviceAccount = require(SERVICE_ACCOUNT_PATH);
    app = initializeApp({
      credential: cert(serviceAccount),
      projectId: PROJECT_ID
    });
  }
  console.log('✓ Firebase Admin initialized');
} catch (error) {
  console.error('✗ Failed to initialize Firebase Admin:', error.message);
  process.exit(1);
}

/**
 * Archive files older than the threshold
 */
async function archiveOldFiles() {
  const startTime = Date.now();
  
  // Calculate threshold timestamp
  const thresholdDate = new Date();
  thresholdDate.setMinutes(thresholdDate.getMinutes() - ARCHIVE_AFTER_MINUTES);
  const thresholdISO = thresholdDate.toISOString();
  
  console.log(`\n📅 Archiving files uploaded before: ${thresholdISO}`);

  try {
    // Get access token for API calls
    const { GoogleAuth } = require('google-auth-library');
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    // Data Connect API endpoint
    const location = 'us-central1';
    const serviceName = 'file-manager-fdc';
    const connectorName = 'movie-connector';
    
    const url = `https://firebasedataconnect.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/${location}/services/${serviceName}/connectors/${connectorName}:executeMutation`;
    
    // GraphQL mutation
    const mutation = `
      mutation ArchiveOldFiles($olderThan: Timestamp!) {
        file_updateMany(
          where: {
            _and: [
              { uploadedAt: { lt: $olderThan } }
              { isArchived: { eq: false } }
            ]
          }
          data: {
            isArchived: true
            archivedAt_timestamp: { now: true }
          }
        )
      }
    `;
    
    // Execute mutation
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'ArchiveOldFiles',
        operationName: 'ArchiveOldFiles',
        query: mutation,
        variables: {
          olderThan: thresholdISO
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();
    
    const duration = Date.now() - startTime;
    
    console.log('\n✓ Archive operation completed successfully');
    console.log(`⏱️  Duration: ${duration}ms`);
    console.log(`📊 Result:`, JSON.stringify(result, null, 2));
    
    return result;

  } catch (error) {
    console.error('\n✗ Error archiving files:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run the archiver
archiveOldFiles()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
