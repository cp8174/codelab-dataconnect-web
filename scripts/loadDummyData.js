/**
 * Script to load dummy data into Firebase Firestore
 * Run with: node loadDummyData.js
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

async function loadDummyData() {
  console.log('🚀 Starting to load dummy data...\n');

  try {
    // Create dummy tenants
    console.log('📦 Creating tenants...');
    const tenants = [
      {
        id: 'tenant-001',
        name: 'acme-corp',
        displayName: 'ACME Corporation',
        ownerId: 'user-001',
        plan: 'enterprise',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          industry: 'Technology',
          employeeCount: 500,
        },
      },
      {
        id: 'tenant-002',
        name: 'tech-solutions',
        displayName: 'Tech Solutions Inc',
        ownerId: 'user-002',
        plan: 'professional',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          industry: 'Consulting',
          employeeCount: 150,
        },
      },
      {
        id: 'tenant-003',
        name: 'startup-hub',
        displayName: 'Startup Hub',
        ownerId: 'user-003',
        plan: 'free',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          industry: 'Startup',
          employeeCount: 25,
        },
      },
    ];

    for (const tenant of tenants) {
      await db.collection('tenants').doc(tenant.id).set(tenant);
      await rtdb.ref(`tenants/${tenant.id}`).set({
        name: tenant.name,
        displayName: tenant.displayName,
        status: tenant.status,
        plan: tenant.plan,
      });
      console.log(`  ✓ Created tenant: ${tenant.displayName}`);
    }

    // Create dummy users
    console.log('\n👥 Creating users...');
    const users = [
      {
        id: 'user-001',
        email: 'admin@acme.com',
        displayName: 'John Admin',
        tenantId: 'tenant-001',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          department: 'IT',
          title: 'System Administrator',
        },
      },
      {
        id: 'user-002',
        email: 'manager@techsolutions.com',
        displayName: 'Jane Manager',
        tenantId: 'tenant-002',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          department: 'Operations',
          title: 'Operations Manager',
        },
      },
      {
        id: 'user-003',
        email: 'user@startuphub.com',
        displayName: 'Bob User',
        tenantId: 'tenant-003',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          department: 'Engineering',
          title: 'Developer',
        },
      },
    ];

    for (const user of users) {
      await db.collection('users').doc(user.id).set(user);
      await rtdb.ref(`users/${user.id}`).set({
        email: user.email,
        displayName: user.displayName,
        tenantId: user.tenantId,
        role: user.role,
      });
      console.log(`  ✓ Created user: ${user.displayName} (${user.email})`);
    }

    // Create dummy ZDNA devices
    console.log('\n📱 Creating ZDNA devices...');
    const devices = [
      // ACME Corp devices
      {
        id: 'device-001',
        tenantId: 'tenant-001',
        name: 'Office Desktop 01',
        type: 'desktop',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'Windows 11 Pro',
          version: '22H2',
          ipAddress: '192.168.1.100',
          location: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
          settings: {
            zdnaEnabled: true,
            encryptionLevel: 'high',
          },
        },
        metadata: {
          department: 'IT',
          location: 'San Francisco HQ',
        },
      },
      {
        id: 'device-002',
        tenantId: 'tenant-001',
        name: 'CEO MacBook Pro',
        type: 'desktop',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'macOS Sonoma',
          version: '14.2',
          ipAddress: '192.168.1.101',
          settings: {
            zdnaEnabled: true,
            encryptionLevel: 'maximum',
          },
        },
        metadata: {
          department: 'Executive',
          user: 'CEO',
        },
      },
      {
        id: 'device-003',
        tenantId: 'tenant-001',
        name: 'Sales iPhone 13',
        type: 'mobile',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'iOS',
          version: '17.2',
          settings: {
            zdnaEnabled: true,
            mdmEnabled: true,
          },
        },
        metadata: {
          department: 'Sales',
          carrier: 'Verizon',
        },
      },
      {
        id: 'device-004',
        tenantId: 'tenant-001',
        name: 'IoT Sensor Array',
        type: 'iot',
        status: 'offline',
        lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'Linux',
          version: '5.15',
          ipAddress: '192.168.1.200',
          settings: {
            zdnaEnabled: true,
            sensorType: 'temperature',
          },
        },
        metadata: {
          location: 'Data Center',
        },
      },
      // Tech Solutions devices
      {
        id: 'device-005',
        tenantId: 'tenant-002',
        name: 'Ubuntu Server 01',
        type: 'server',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'Ubuntu Server',
          version: '22.04 LTS',
          ipAddress: '10.0.1.50',
          settings: {
            zdnaEnabled: true,
            role: 'application-server',
          },
        },
        metadata: {
          environment: 'production',
        },
      },
      {
        id: 'device-006',
        tenantId: 'tenant-002',
        name: 'Developer Laptop',
        type: 'desktop',
        status: 'maintenance',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'Ubuntu Desktop',
          version: '23.10',
          ipAddress: '10.0.1.101',
          settings: {
            zdnaEnabled: true,
            devEnvironment: true,
          },
        },
        metadata: {
          department: 'Engineering',
        },
      },
      // Startup Hub devices
      {
        id: 'device-007',
        tenantId: 'tenant-003',
        name: 'Startup iPad Pro',
        type: 'tablet',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'iPadOS',
          version: '17.1',
          settings: {
            zdnaEnabled: true,
            appRestrictions: true,
          },
        },
        metadata: {
          usage: 'presentation',
        },
      },
      {
        id: 'device-008',
        tenantId: 'tenant-003',
        name: 'Office Router',
        type: 'iot',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        config: {
          os: 'RouterOS',
          version: '7.12',
          ipAddress: '192.168.0.1',
          settings: {
            zdnaEnabled: true,
            deviceType: 'network-gateway',
          },
        },
        metadata: {
          location: 'Office Entrance',
        },
      },
    ];

    for (const device of devices) {
      await db.collection('devices').doc(device.id).set(device);
      await rtdb.ref(`devices/${device.id}`).set({
        name: device.name,
        type: device.type,
        status: device.status,
        tenantId: device.tenantId,
        lastSeen: device.lastSeen.toISOString(),
      });
      console.log(`  ✓ Created device: ${device.name} (${device.type}, ${device.status})`);
    }

    console.log('\n✅ Dummy data loaded successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Tenants: ${tenants.length}`);
    console.log(`  - Users: ${users.length}`);
    console.log(`  - ZDNA Devices: ${devices.length}`);
    console.log('\n🎉 You can now view the data in:');
    console.log('  - Emulator UI: http://127.0.0.1:4000');
    console.log('  - Firestore: http://127.0.0.1:4000/firestore');
    console.log('  - Realtime DB: http://127.0.0.1:4000/database');
    console.log('  - ZDNA Devices Page: http://localhost:5173/devices\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error loading dummy data:', error);
    process.exit(1);
  }
}

// Run the script
loadDummyData();
