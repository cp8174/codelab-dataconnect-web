/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { connectorConfig as movieConnectorConfig } from '@movie/dataconnect';
import { connectorConfig as fileConnectorConfig } from '@file/dataconnect';
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebaseApp);
const movieDataConnect = getDataConnect(firebaseApp, movieConnectorConfig);
const fileDataConnect = getDataConnect(firebaseApp, fileConnectorConfig);
const storage = getStorage(firebaseApp);

if (process.env.NODE_ENV === "development") {
  connectDataConnectEmulator(movieDataConnect, "127.0.0.1", 9390, false);
  connectDataConnectEmulator(fileDataConnect, "127.0.0.1", 9390, false);
  connectAuthEmulator(auth, "http://localhost:9089");
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

const AuthContext = createContext(auth);

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { auth, storage, movieDataConnect, fileDataConnect, firebaseApp, AuthContext, AuthProvider };
// Backward compatibility
export const dataconnect = movieDataConnect;
