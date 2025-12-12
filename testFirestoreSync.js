/**
 * Simple Test for Firestore Listeners
 * Tests the Firestore → Data Connect sync
 * Run with: node testFirestoreSync.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin with emulator settings
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8088';
process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9002';

admin.initializeApp({
  projectId: 'zfile-manager-v2',
  databaseURL: 'http://127.0.0.1:9002/?ns=zfile-manager-v2',
});

const db = admin.firestore();

async function testFirestoreFileCreation() {
  console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║       Testing Firestore → Data Connect Sync Listener             ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝\n');

  try {
    // Test 1: Create a file document in Firestore
    console.log('📝 Test 1: Creating file document in Firestore...');
    console.log('=' .repeat(70));

    const fileId = `test-file-${Date.now()}`;
    const fileData = {
      id: fileId,
      tenantId: 'tenant-001',
      name: 'test-document.pdf',
      storagePath: 'tenants/tenant-001/files/test-document.pdf',
      mimeType: 'application/pdf',
      size: 2048,
      status: 'active',
      uploadedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('files').doc(fileId).set(fileData);
    console.log(`✓ Created file document: ${fileId}`);
    console.log('  Tenant:', fileData.tenantId);
    console.log('  Name:', fileData.name);
    console.log('  Size:', fileData.size, 'bytes');

    // Wait for the listener to process
    console.log('\n⏳ Waiting 5 seconds for onFileCreatedSyncToDataConnect listener...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check if the listener updated the document with sync status
    const updatedDoc = await db.collection('files').doc(fileId).get();
    const updatedData = updatedDoc.data();

    console.log('\n🔍 Checking sync status...');
    if (updatedData.dataConnectSync) {
      console.log('\n✅ SUCCESS! Listener triggered and updated document!');
      console.log('   Sync Status:', updatedData.dataConnectSync.status);
      console.log('   Synced At:', updatedData.dataConnectSync.syncedAt?.toDate().toISOString());
      console.log('   Last Sync Attempt:', updatedData.dataConnectSync.lastSyncAttempt?.toDate().toISOString());
      
      if (updatedData.dataConnectSync.status === 'synced') {
        console.log('\n🎉 File successfully synced to Data Connect!');
      } else if (updatedData.dataConnectSync.status === 'failed') {
        console.log('\n⚠️  Sync failed with error:', updatedData.dataConnectSync.error);
      }
    } else {
      console.log('\n❌ FAILED: No sync status found!');
      console.log('   This means the listener did not trigger.');
      console.log('   Possible causes:');
      console.log('   1. Functions emulator not running');
      console.log('   2. Listener not properly exported');
      console.log('   3. Functions need to be rebuilt');
      console.log('\n💡 Try:');
      console.log('   - Restart emulators: firebase emulators:start');
      console.log('   - Rebuild functions: cd functions && npm run build');
    }

    // Test 2: Update the file document
    console.log('\n\n📝 Test 2: Updating file document...');
    console.log('=' .repeat(70));

    await db.collection('files').doc(fileId).update({
      size: 4096,
      name: 'test-document-updated.pdf',
      updatedAt: new Date(),
    });

    console.log('✓ Updated file document');
    console.log('  New size: 4096 bytes');
    console.log('  New name: test-document-updated.pdf');

    console.log('\n⏳ Waiting 5 seconds for onFileUpdatedSyncToDataConnect listener...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    const updatedDoc2 = await db.collection('files').doc(fileId).get();
    const updatedData2 = updatedDoc2.data();

    console.log('\n🔍 Checking updated sync status...');
    if (updatedData2.dataConnectSync && 
        updatedData2.dataConnectSync.lastSyncAttempt > updatedData.dataConnectSync.lastSyncAttempt) {
      console.log('\n✅ SUCCESS! Update listener triggered!');
      console.log('   Sync Status:', updatedData2.dataConnectSync.status);
      console.log('   Last Sync:', updatedData2.dataConnectSync.lastSyncAttempt?.toDate().toISOString());
    } else {
      console.log('\n❌ Update listener did not trigger or sync time unchanged');
    }

    // Test 3: List all files with sync status
    console.log('\n\n📊 Test 3: Checking all files for tenant-001...');
    console.log('=' .repeat(70));

    const filesSnapshot = await db.collection('files')
      .where('tenantId', '==', 'tenant-001')
      .get();

    console.log(`\nFound ${filesSnapshot.size} files:`);
    
    let syncedCount = 0;
    let failedCount = 0;
    let pendingCount = 0;

    filesSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      const syncStatus = data.dataConnectSync?.status || 'pending';
      
      if (syncStatus === 'synced') syncedCount++;
      else if (syncStatus === 'failed') failedCount++;
      else pendingCount++;

      console.log(`\n${index + 1}. ${data.name}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   Size: ${data.size} bytes`);
      console.log(`   Status: ${data.status}`);
      console.log(`   Sync: ${syncStatus}`);
    });

    console.log('\n📈 Summary:');
    console.log(`   ✅ Synced: ${syncedCount}`);
    console.log(`   ❌ Failed: ${failedCount}`);
    console.log(`   ⏳ Pending: ${pendingCount}`);

    console.log('\n\n╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║                    Tests Completed!                               ║');
    console.log('╚═══════════════════════════════════════════════════════════════════╝\n');

    console.log('📌 View results:');
    console.log('   • Firestore UI: http://127.0.0.1:4000/firestore');
    console.log('   • Functions Logs: http://127.0.0.1:4000/functions');
    console.log('   • Database UI: http://127.0.0.1:4000/database\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error running tests:', error);
    process.exit(1);
  }
}

// Run the test
testFirestoreFileCreation();
