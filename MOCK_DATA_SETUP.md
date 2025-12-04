# How to Insert Mock Data

## Option 1: Using Firebase Emulator UI (Recommended)

1. Make sure the emulators are running:
   ```bash
   firebase emulators:start
   ```

2. Open Firebase Emulator UI in your browser:
   ```
   http://localhost:4000
   ```

3. Navigate to **Data Connect** section in the left sidebar

4. Click on the **"Execute Operations"** or **"GraphQL Playground"** tab

5. Copy the entire contents of `dataconnect/filedata_insert.gql` file

6. Paste it into the operation editor

7. Click **"Run"** or **"Execute"** button

8. You should see success messages for the inserted folders and files

## Option 2: Using Command Line

```bash
# From the project root directory
firebase dataconnect:sql:exec --file dataconnect/filedata_insert.gql
```

## Verify the Data

After inserting the mock data, you can verify it by:

1. **Using the Emulator UI:**
   - Go to http://localhost:4000
   - Navigate to Data Connect
   - Run this query:
   ```graphql
   query {
     files {
       id
       name
       size
     }
     folders {
       id
       name
       color
     }
   }
   ```

2. **Using the File Manager UI:**
   - Navigate to http://localhost:5173/filemanager
   - You should see the folders in the sidebar
   - Click on each folder to see the files

## Mock Data Contents

The mock data includes:

### Folders (5 total):
- 📁 Documents (Blue)
- 📁 Images (Green)
- 📁 Videos (Purple)
- 📁 Music (Orange)
- 📁 Projects (Red)

### Files (15 total):
- **Documents:** Resume, Project Proposal, Budget spreadsheet
- **Images:** Vacation photos, Family portrait, Logo design
- **Videos:** Presentation recording, Tutorial demo
- **Music:** Background music, Podcast episode
- **Projects:** Source code, Design mockups, Meeting notes
- **Root level:** README, Setup instructions

## Note

The mock data creates file metadata entries in the database, but doesn't actually upload files to Storage. This is normal for testing purposes. When you upload real files through the UI, they will be stored in the Storage emulator.
