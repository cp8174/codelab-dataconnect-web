# Quick Production Run (Manual Steps)

# OPTION 1: Run Everything Together
# ================================

# Terminal 1: Start Firebase Emulators
npx firebase emulators:start

# Terminal 2: Build and serve production app
cd app
npm run build
npx vite preview

# Your app will be at: http://localhost:4173


# OPTION 2: Step-by-Step
# ================================

# Step 1: Build the React app for production
cd app
npm run build
# This creates optimized files in app/dist/

# Step 2: Build Cloud Functions
cd ../functions
npm run build
# This compiles TypeScript to JavaScript in functions/lib/

# Step 3: Start Firebase Emulators (in separate terminal)
cd ..
npx firebase emulators:start

# Step 4: Preview production build (in another terminal)
cd app
npx vite preview
# Opens at http://localhost:4173 (production build)


# OPTION 3: One-Liner (Automated)
# ================================
.\run-prod.ps1


# URLs when running:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🎯 Production App:     http://localhost:4173
# 🔥 Emulator UI:        http://localhost:4000
# 🔧 Cloud Functions:    http://localhost:5001
# 💾 Firestore:          http://localhost:8088
# 🔐 Auth:               http://localhost:9089
# 📦 Storage:            http://localhost:9199
# 🔌 Data Connect:       http://localhost:9390
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# Production vs Development:
# Development (npm run dev):     http://localhost:5173 - Hot reload, source maps
# Production (npm run preview):  http://localhost:4173 - Optimized, minified
