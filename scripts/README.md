# Data Loading Scripts

## Load Data Connect Data (Files & Movies)

To load dummy data into Data Connect using the GraphQL mutation files:

```bash
cd scripts
npm run load-data
```

This will execute the mutations in:
- `dataconnect/filedata_insert.gql` - Sample file and folder data
- `dataconnect/moviedata_insert.gql` - Sample movie data

## Load Firestore Data (Users, Tenants, Devices)

To load dummy data into Firestore, you can call the Cloud Function:

### Using Firebase CLI

```bash
# Make sure emulators are running
firebase emulators:start

# In another terminal, call the function
curl -X POST \
  http://127.0.0.1:5001/PROJECT_ID/us-central1/loadDummyData \
  -H "Content-Type: application/json" \
  -d '{"data": {}}'
```

### Using the React App

Once the React service layer is integrated, you can call:

```javascript
import { loadDummyData } from './services/FirebaseService';

// Load data
await loadDummyData();
```

## Prerequisites

1. **Start Firebase Emulators**:
   ```bash
   firebase emulators:start
   ```

2. **Ensure Data Connect is running** on port 9399

3. **Functions emulator is running** on port 5001

4. **Firestore emulator is running** on port 8080

5. **Realtime Database emulator is running** on port 9000

## Data Loaded

### Firestore/RTDB:
- **1 Tenant**: demo-company (Premium plan)
- **3 Users**: Admin, Regular User, Viewer
- **4 Devices**: Server, Desktop, Mobile, IoT Sensor

### Data Connect:
- **5 Folders**: Documents, Images, Videos, Music, Projects
- **Multiple Files**: PDF, images, videos, documents
- **Movies**: As defined in moviedata_insert.gql

## Clear Data

To clear the dummy Firestore data:

```bash
curl -X POST \
  http://127.0.0.1:5001/PROJECT_ID/us-central1/clearDummyData \
  -H "Content-Type: application/json" \
  -d '{"data": {}}'
```

Or from the React app:

```javascript
import { clearDummyData } from './services/FirebaseService';

await clearDummyData();
```
