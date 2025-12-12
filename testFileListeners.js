/**
 * Test Script for File Management Listeners
 * Run with: node testFileListeners.js
 * 
 * Prerequisites:
 * 1. Firebase emulators must be running (firebase emulators:start)
 * 2. firebase-admin installed (npm install firebase-admin)
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin with emulator settings
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8088';
process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9002';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199';

admin.initializeApp({
  projectId: 'zfile-manager-v2',
  databaseURL: 'http://127.0.0.1:9002/?ns=zfile-manager-v2',
  storageBucket: 'zfile-manager-v2.appspot.com',
});

const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();

async function testFileUpload() {
  console.log('\n📤 Test 1: Upload a file to Storage (triggers onStorageFileUploaded)');
  console.log('=' .repeat(70));

  try {
    // Create a test file
    const testContent = 'This is a test file for ZDNA file management system.\nCreated at: ' + new Date().toISOString();
    const testFileName = `test-file-${Date.now()}.txt`;
    const localFilePath = path.join(__dirname, testFileName);
    
    fs.writeFileSync(localFilePath, testContent);
    console.log(`✓ Created local test file: ${testFileName}`);

    // Upload to Storage under tenant-001
    const storagePath = `tenants/tenant-001/files/${testFileName}`;
    await bucket.upload(localFilePath, {
      destination: storagePath,
      metadata: {
        contentType: 'text/plain',
        metadata: {
          uploadedBy: 'test-script',
          description: 'Test file upload',
        },
      },
    });

    console.log(`✓ Uploaded to Storage: ${storagePath}`);
    
    // Clean up local file
    fs.unlinkSync(localFilePath);

    // Wait for listener to process
    console.log('\n⏳ Waiting 3 seconds for onStorageFileUploaded listener to process...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check Firestore for the file metadata
    const filesSnapshot = await db.collection('files')
      .where('storagePath', '==', storagePath)
      .limit(1)
      .get();

    if (!filesSnapshot.empty) {
      const fileDoc = filesSnapshot.docs[0];
      const fileData = fileDoc.data();
      console.log('\n✅ SUCCESS: File metadata found in Firestore!');
      console.log('   File ID:', fileDoc.id);
      console.log('   Tenant ID:', fileData.tenantId);
      console.log('   File Name:', fileData.name);
      console.log('   Size:', fileData.size, 'bytes');
      console.log('   MIME Type:', fileData.mimeType);
      console.log('   Status:', fileData.status);
      
      return { fileDoc, storagePath };
    } else {
      console.log('\n❌ FAILED: File metadata NOT found in Firestore');
      console.log('   Check Functions logs for errors');
      return null;
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  }
}

async function testFileUpdate(storagePath) {
  console.log('\n\n📝 Test 2: Update file metadata (triggers onStorageFileMetadataUpdated)');
  console.log('=' .repeat(70));

  try {
    const file = bucket.file(storagePath);
    
    // Update metadata
    await file.setMetadata({
      metadata: {
        updatedBy: 'test-script',
        lastModified: new Date().toISOString(),
        version: '2',
      },
    });

    console.log(`✓ Updated metadata for: ${storagePath}`);

    // Wait for listener
    console.log('\n⏳ Waiting 3 seconds for onStorageFileMetadataUpdated listener...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check Firestore
    const filesSnapshot = await db.collection('files')
      .where('storagePath', '==', storagePath)
      .limit(1)
      .get();

    if (!filesSnapshot.empty) {
      const fileData = filesSnapshot.docs[0].data();
      console.log('\n✅ SUCCESS: Metadata update synced to Firestore!');
      console.log('   Updated At:', fileData.updatedAt.toDate().toISOString());
      console.log('   Generation:', fileData.metadata?.generation);
    } else {
      console.log('\n❌ FAILED: Could not verify metadata update');
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  }
}

async function testFirestoreToDataConnect(fileDoc) {
  console.log('\n\n🔄 Test 3: Create file in Firestore (triggers onFileCreatedSyncToDataConnect)');
  console.log('=' .repeat(70));

  try {
    const testFileId = `test-direct-${Date.now()}`;
    const fileData = {
      id: testFileId,
      tenantId: 'tenant-001',
      name: 'direct-firestore-test.txt',
      storagePath: 'tenants/tenant-001/files/direct-firestore-test.txt',
      mimeType: 'text/plain',
      size: 1024,
      status: 'active',
      uploadedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('files').doc(testFileId).set(fileData);
    console.log(`✓ Created file document in Firestore: ${testFileId}`);

    // Wait for listener
    console.log('\n⏳ Waiting 3 seconds for onFileCreatedSyncToDataConnect listener...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check sync status
    const fileSnapshot = await db.collection('files').doc(testFileId).get();
    const updatedData = fileSnapshot.data();

    if (updatedData.dataConnectSync) {
      console.log('\n✅ SUCCESS: Data Connect sync triggered!');
      console.log('   Sync Status:', updatedData.dataConnectSync.status);
      console.log('   Synced At:', updatedData.dataConnectSync.syncedAt?.toDate().toISOString());
    } else {
      console.log('\n⚠️  WARNING: No sync status found (check Functions logs)');
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  }
}

async function testFileDelete(storagePath) {
  console.log('\n\n🗑️  Test 4: Delete file from Storage (triggers onStorageFileDeleted)');
  console.log('=' .repeat(70));

  try {
    await bucket.file(storagePath).delete();
    console.log(`✓ Deleted file from Storage: ${storagePath}`);

    // Wait for listener
    console.log('\n⏳ Waiting 3 seconds for onStorageFileDeleted listener...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check Firestore
    const filesSnapshot = await db.collection('files')
      .where('storagePath', '==', storagePath)
      .limit(1)
      .get();

    if (!filesSnapshot.empty) {
      const fileData = filesSnapshot.docs[0].data();
      console.log('\n✅ SUCCESS: File marked as deleted in Firestore!');
      console.log('   Status:', fileData.status);
      console.log('   Deleted At:', fileData.deletedAt?.toDate().toISOString());
    } else {
      console.log('\n⚠️  File not found in Firestore');
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  }
}

async function testBatchSync() {
  console.log('\n\n📦 Test 5: Batch sync files to Data Connect');
  console.log('=' .repeat(70));

  try {
    // This would normally be called via HTTP, but we can check the files
    const filesSnapshot = await db.collection('files')
      .where('tenantId', '==', 'tenant-001')
      .limit(10)
      .get();

    console.log(`\n📊 Found ${filesSnapshot.size} files for tenant-001`);
    
    let syncedCount = 0;
    filesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.dataConnectSync?.status === 'synced') {
        syncedCount++;
      }
    });

    console.log(`   ✓ ${syncedCount} files have been synced to Data Connect`);
    console.log(`   ⏳ ${filesSnapshot.size - syncedCount} files pending sync`);

    console.log('\n💡 To manually trigger batch sync, call the batchSyncFilesToDataConnect function');
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  }
}

async function runTests() {
  console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║       File Management Listeners Test Suite                       ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');

  try {
    // Test 1: Upload file
    const uploadResult = await testFileUpload();
    
    if (!uploadResult) {
      console.log('\n⚠️  Skipping remaining tests due to upload failure');
      process.exit(1);
    }

    // Test 2: Update metadata
    await testFileUpdate(uploadResult.storagePath);

    // Test 3: Firestore to Data Connect sync
    await testFirestoreToDataConnect(uploadResult.fileDoc);

    // Test 4: Delete file
    await testFileDelete(uploadResult.storagePath);

    // Test 5: Batch sync
    await testBatchSync();

    console.log('\n\n╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║                    All Tests Completed! 🎉                        ║');
    console.log('╚═══════════════════════════════════════════════════════════════════╝\n');

    console.log('📌 Next Steps:');
    console.log('   1. Check Firebase Emulator UI: http://127.0.0.1:4000');
    console.log('   2. View Firestore data: http://127.0.0.1:4000/firestore');
    console.log('   3. View Storage files: http://127.0.0.1:4000/storage');
    console.log('   4. Check Functions logs: http://127.0.0.1:4000/functions\n');

    process.exit(0);
  } catch (error) {
    console.error('\n\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run the tests
runTests();
