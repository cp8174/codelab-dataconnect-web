/**
 * Test File Upload to Storage
 * 
 * Simulates file upload to trigger Cloud Functions
 * Tests: Storage → Firestore → Data Connect sync
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
admin.initializeApp({
  projectId: 'zfile-manager-v2',
  storageBucket: 'zfile-manager-v2.appspot.com'
});

const bucket = admin.storage().bucket();

// Configuration
const tenantId = 'tenant-001';
const testFileName = `test-${Date.now()}.txt`;
const testContent = `This is a test file uploaded at ${new Date().toLocaleString()}
Tenant: ${tenantId}
Purpose: Testing Cloud Function sync pipeline
Expected behavior:
1. File uploaded to Storage
2. onStorageFileUploaded creates Firestore document
3. onFileCreatedSyncToDataConnect syncs to Data Connect
4. dataConnectSync field added with status="synced"
`;

async function uploadTestFile() {
  console.log('\n🚀 Starting File Upload Test\n');
  console.log('Configuration:');
  console.log(`  Tenant ID: ${tenantId}`);
  console.log(`  File Name: ${testFileName}`);
  console.log(`  Storage Path: tenants/${tenantId}/files/${testFileName}\n`);

  try {
    // Create temp file
    const tempFilePath = path.join(__dirname, testFileName);
    fs.writeFileSync(tempFilePath, testContent);
    console.log('✅ Created temporary test file\n');

    // Upload to Storage
    const storagePath = `tenants/${tenantId}/files/${testFileName}`;
    const file = bucket.file(storagePath);

    console.log('⏳ Uploading to Firebase Storage...');
    await bucket.upload(tempFilePath, {
      destination: storagePath,
      metadata: {
        contentType: 'text/plain',
        metadata: {
          uploadedBy: 'test-script',
          tenantId: tenantId
        }
      }
    });

    console.log('✅ File uploaded successfully to Storage\n');

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    console.log('📊 Expected Cloud Function Flow:\n');
    console.log('1. onStorageFileUploaded (immediate)');
    console.log('   → Creates document in Firestore files collection');
    console.log('   → Document ID: auto-generated');
    console.log(`   → Fields: { tenantId: "${tenantId}", name: "${testFileName}", status: "active" }\n`);
    
    console.log('2. onFileCreatedSyncToDataConnect (5-10 seconds)');
    console.log('   → Reads Firestore document');
    console.log('   → Syncs to Data Connect (Cloud SQL)');
    console.log('   → Updates dataConnectSync field: { status: "synced", syncedAt: timestamp }\n');

    console.log('🔍 Verification Steps:\n');
    console.log('Option 1: Run monitor script');
    console.log('   node monitorFileSync.js\n');
    
    console.log('Option 2: Check Emulator UI');
    console.log('   http://localhost:4000');
    console.log('   → Firestore → files collection → Find your document\n');

    console.log('Option 3: Check Cloud Function logs');
    console.log('   Look in your functions terminal for:');
    console.log('   - "File uploaded and synced to Firestore"');
    console.log('   - "File synced to Data Connect successfully"\n');

    console.log('⏰ Wait 10-15 seconds, then check results!\n');
    console.log('✨ Test complete!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure emulators are running: npm run serve');
    console.error('2. Check if Storage emulator is on port 9199');
    console.error('3. Verify firebase.json has storage emulator config');
    process.exit(1);
  }
}

// Run the test
uploadTestFile().then(() => {
  console.log('Test script finished. Check monitor or emulator UI for results.');
  process.exit(0);
});
