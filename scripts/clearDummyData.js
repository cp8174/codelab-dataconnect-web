/**
 * Script to clear dummy data from Firebase Firestore
 * Run with: node scripts/clearDummyData.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin with emulator settings
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8088';
process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9002';

admin.initializeApp({
  projectId: 'zfile-manager-v2',
});

const db = admin.firestore();
const rtdb = admin.database();

async function deleteCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  const batchSize = snapshot.size;
  
  if (batchSize === 0) {
    return 0;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  return batchSize;
}

async function clearDummyData() {
  console.log('🗑️  Starting to clear dummy data...\n');

  try {
    // Clear Firestore collections
    console.log('📦 Clearing Firestore collections...');
    
    const devicesCount = await deleteCollection('devices');
    console.log(`  ✓ Deleted ${devicesCount} devices`);
    
    const usersCount = await deleteCollection('users');
    console.log(`  ✓ Deleted ${usersCount} users`);
    
    const tenantsCount = await deleteCollection('tenants');
    console.log(`  ✓ Deleted ${tenantsCount} tenants`);

    // Clear Realtime Database
    console.log('\n📡 Clearing Realtime Database...');
    await rtdb.ref('devices').remove();
    console.log('  ✓ Cleared devices');
    
    await rtdb.ref('users').remove();
    console.log('  ✓ Cleared users');
    
    await rtdb.ref('tenants').remove();
    console.log('  ✓ Cleared tenants');

    console.log('\n✅ All dummy data cleared successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Devices deleted: ${devicesCount}`);
    console.log(`  - Users deleted: ${usersCount}`);
    console.log(`  - Tenants deleted: ${tenantsCount}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error clearing dummy data:', error);
    process.exit(1);
  }
}

// Run the script
clearDummyData();
