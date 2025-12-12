/**
 * Firebase Cloud Functions
 * Scheduled file archiver for Firebase Data Connect
 */

const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onRequest } = require("firebase-functions/v2/https");
const { onMutationExecuted } = require("firebase-functions/v2/dataconnect");
const { logger } = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Configuration
const ARCHIVE_AFTER_MINUTES = process.env.ARCHIVE_AFTER_MINUTES || 60;
const DATACONNECT_LOCATION = "us-central1";
const DATACONNECT_SERVICE = "file-manager-fdc";
const DATACONNECT_CONNECTOR = "file-connector";

/**
 * Scheduled function: Archives files older than configured minutes
 * Runs every hour on the hour
 */
exports.archiveOldFiles = onSchedule({
  schedule: "0 * * * *", // Every hour at minute 0
  timeZone: "America/Los_Angeles",
  memory: "256MiB",
  timeoutSeconds: 300,
  retryConfig: {
    retryCount: 3,
    maxRetrySeconds: 600,
  },
}, async (event) => {
  const startTime = Date.now();
  logger.info(`Starting file archival. Threshold: ${ARCHIVE_AFTER_MINUTES} minutes`);

  try {
    // Calculate threshold timestamp
    const thresholdDate = new Date();
    thresholdDate.setMinutes(thresholdDate.getMinutes() - ARCHIVE_AFTER_MINUTES);
    const thresholdISO = thresholdDate.toISOString();

    logger.info(`Archiving files uploaded before: ${thresholdISO}`);

    // Execute the archival mutation
    const result = await executeArchiveMutation(thresholdISO);

    const duration = Date.now() - startTime;
    logger.info(`Archive completed successfully in ${duration}ms`, { result });

    return {
      success: true,
      threshold: thresholdISO,
      duration,
      result,
    };
  } catch (error) {
    logger.error("Error during file archival:", error);
    throw error; // This will trigger retry
  }
});

/**
 * HTTP function: Manually trigger file archival
 * Useful for testing and manual execution
 */
exports.manualArchiveFiles = onRequest({
  cors: true,
  memory: "256MiB",
  timeoutSeconds: 300,
}, async (req, res) => {
  logger.info("Manual archive triggered", { query: req.query });

  try {
    // Get minutes from query parameter or use default
    const minutes = parseInt(req.query.minutes) || ARCHIVE_AFTER_MINUTES;
    
    const thresholdDate = new Date();
    thresholdDate.setMinutes(thresholdDate.getMinutes() - minutes);
    const thresholdISO = thresholdDate.toISOString();

    logger.info(`Manual archival for files older than ${minutes} minutes (before ${thresholdISO})`);

    const result = await executeArchiveMutation(thresholdISO);

    res.json({
      success: true,
      message: "Files archived successfully",
      threshold: thresholdISO,
      minutes,
      result,
    });
  } catch (error) {
    logger.error("Error in manual archival:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Execute the Data Connect mutation to archive files
 */
async function executeArchiveMutation(thresholdISO) {
  const { GoogleAuth } = require("google-auth-library");
  
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });

  const client = await auth.getClient();
  const projectId = process.env.GCLOUD_PROJECT;

  // Data Connect API endpoint
  const url = `https://firebasedataconnect.googleapis.com/v1beta/projects/${projectId}/locations/${DATACONNECT_LOCATION}/services/${DATACONNECT_SERVICE}/connectors/${DATACONNECT_CONNECTOR}:executeMutation`;

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

  // Execute the mutation
  const response = await client.request({
    url,
    method: "POST",
    data: {
      name: "ArchiveOldFiles",
      operationName: "ArchiveOldFiles",
      query: mutation,
      variables: {
        olderThan: thresholdISO,
      },
    },
  });

  return response.data;
}

// ============================================
// Data Connect Mutation Listeners
// ============================================

/**
 * Listen to CreateFile mutation and log file creation
 * This is a server-to-server trigger that automatically fires when CreateFile mutation executes
 */
exports.onFileCreated = onMutationExecuted({
  service: DATACONNECT_SERVICE,
  connector: DATACONNECT_CONNECTOR,
  operation: "CreateFile",
  region: DATACONNECT_LOCATION,
}, async (event) => {
  logger.info("🎯 CreateFile mutation triggered!", {
    operation: event.subject,
    authType: event.authType,
    authId: event.authId,
  });

  try {
    // Extract mutation variables and returned data
    const variables = event.data.payload.variables;
    const returnedData = event.data.payload.data;
    
    logger.info("Mutation payload:", {
      variables,
      returnedData,
    });
    
    // Call logging function
    await logFileActivity({
      action: "created",
      fileId: returnedData?.file_insert?.id || "unknown",
      fileName: variables?.name || "unknown",
      userId: event.authId || "system",
      size: variables?.size || 0,
      mimeType: variables?.mimeType || "unknown",
      timestamp: new Date().toISOString(),
    });

    logger.info("✅ File creation logged successfully via mutation trigger");
  } catch (error) {
    logger.error("❌ Error logging file creation:", error);
  }
});

/**
 * Listen to UpdateFile mutation and log file updates
 * This is a server-to-server trigger that automatically fires when UpdateFile mutation executes
 */
exports.onFileUpdated = onMutationExecuted({
  service: DATACONNECT_SERVICE,
  connector: DATACONNECT_CONNECTOR,
  operation: "UpdateFile",
  region: DATACONNECT_LOCATION,
}, async (event) => {
  logger.info("🎯 UpdateFile mutation triggered!", {
    operation: event.subject,
    authType: event.authType,
    authId: event.authId,
  });

  try {
    // Extract mutation variables
    const variables = event.data.payload.variables;
    
    logger.info("Update mutation payload:", {
      variables,
    });
    
    // Call logging function
    await logFileActivity({
      action: "updated",
      fileId: variables?.id || "unknown",
      fileName: variables?.name || "unknown",
      userId: event.authId || "system",
      updates: {
        name: variables?.name,
        description: variables?.description,
        tags: variables?.tags,
        isPublic: variables?.isPublic,
        folderId: variables?.folderId,
      },
      timestamp: new Date().toISOString(),
    });

    logger.info("✅ File update logged successfully via mutation trigger");
  } catch (error) {
    logger.error("❌ Error logging file update:", error);
  }
});

// ============================================
// File Activity Logging Function
// ============================================

/**
 * Log file activity to Firestore
 * This function is called by the mutation listeners
 */
async function logFileActivity(activity) {
  logger.info("Logging file activity", activity);

  try {
    // Store in Firestore for persistence and querying
    const logRef = await db.collection("fileActivityLogs").add({
      ...activity,
      timestamp: Timestamp.fromDate(new Date(activity.timestamp)),
      logged_at: Timestamp.now(),
    });

    logger.info(`Activity logged with ID: ${logRef.id}`, activity);

    // Also log to Cloud Logging for real-time monitoring
    if (activity.action === "created") {
      logger.info(`📁 NEW FILE: ${activity.fileName} (${formatBytes(activity.size)}) by user ${activity.userId}`);
    } else if (activity.action === "updated") {
      logger.info(`✏️ FILE UPDATED: ${activity.fileName} (ID: ${activity.fileId})`);
    }

    return logRef.id;
  } catch (error) {
    logger.error("Failed to log activity to Firestore:", error);
    throw error;
  }
}

/**
 * HTTP endpoint to query file activity logs
 */
exports.getFileActivityLogs = onRequest({
  cors: true,
  memory: "256MiB",
}, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const action = req.query.action; // 'created' or 'updated'
    const userId = req.query.userId;

    let query = db.collection("fileActivityLogs")
      .orderBy("timestamp", "desc")
      .limit(limit);

    if (action) {
      query = query.where("action", "==", action);
    }
    if (userId) {
      query = query.where("userId", "==", userId);
    }

    const snapshot = await query.get();
    const logs = [];

    snapshot.forEach((doc) => {
      logs.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString(),
      });
    });

    res.json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    logger.error("Error fetching activity logs:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * HTTP endpoint to log file activity from frontend
 * Called after file create/update/delete operations
 */
exports.logFileActivity = onRequest({
  cors: true,
  memory: "128MiB",
}, async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const activity = req.body;
    
    logger.info("📝 Received activity log request:", activity);
    
    // Validate required fields
    if (!activity.action || !activity.userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: action and userId',
      });
    }

    // Log to Firestore
    const logId = await logFileActivity(activity);

    logger.info("✅ Activity logged successfully, ID:", logId);

    res.json({
      success: true,
      logId,
      message: 'Activity logged successfully',
    });
  } catch (error) {
    logger.error("Error in logFileActivity endpoint:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Test endpoint to manually trigger file activity logging
 * Use this to verify Firestore logging works
 * Example: POST http://localhost:5001/PROJECT_ID/us-central1/testLogActivity
 */
exports.testLogActivity = onRequest({
  cors: true,
  memory: "128MiB",
}, async (req, res) => {
  try {
    logger.info("🧪 Test log activity endpoint called");
    
    // Create test activity
    const testActivity = {
      action: "test",
      fileId: "test-file-123",
      fileName: "test-file.txt",
      userId: "test-user",
      size: 1024,
      mimeType: "text/plain",
      timestamp: new Date().toISOString(),
    };

    // Log to Firestore
    const logId = await logFileActivity(testActivity);

    logger.info("✅ Test activity logged, ID:", logId);

    res.json({
      success: true,
      logId,
      message: 'Test activity logged successfully! Check Firestore emulator.',
      testData: testActivity,
    });
  } catch (error) {
    logger.error("❌ Test failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Helper function to format bytes
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
