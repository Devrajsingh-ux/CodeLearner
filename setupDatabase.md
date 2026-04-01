# 🗄️ Database Setup Guide

## Problem
The import is failing because Appwrite collections don't exist:
```
Collection with the requested ID 'courses' could not be found
```

## Solution
You need to set up the database collections first before importing courses.

---

## Method 1: Automatic Setup (Recommended)

### 1. Check Environment Variables
Make sure these are set in your `.env` file:
```env
APPWRITE_ENDPOINT=http://localhost:8080/v1
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key
APPWRITE_DATABASE_ID=main
```

### 2. Install node-appwrite (if not already installed)
```bash
npm install node-appwrite
```

### 3. Run Setup Script
```bash
node setupAppwriteCollections.js
```

This will:
- ✅ Create `courses` collection with all required attributes
- ✅ Create `lessons` collection with all required attributes  
- ✅ Set up indexes for performance
- ✅ Configure proper permissions

---

## Method 2: Manual Setup via Appwrite Console

If the script doesn't work, you can set up manually:

### 1. Login to Appwrite Console
- Open your Appwrite console (usually http://localhost:8080)
- Go to your project
- Navigate to Databases → Your Database

### 2. Create Collections

#### Create "courses" collection:
```
Collection ID: courses
Collection Name: courses
```

**Add these attributes:**
```
slug          | String  | Size: 100  | Required: Yes
title         | String  | Size: 255  | Required: Yes
description   | String  | Size: 1000 | Required: No
category      | String  | Size: 100  | Required: No
difficulty    | String  | Size: 50   | Required: No
lessonsCount  | Integer |            | Required: No
duration      | String  | Size: 50   | Required: No
enrolledCount | Integer |            | Required: No
rating        | Float   |            | Required: No
tags          | String  | Size: 500  | Required: No
status        | String  | Size: 20   | Required: No
isFeatured    | Boolean |            | Required: No
isNew         | Boolean |            | Required: No
instructor    | String  | Size: 255  | Required: No
completionRate| Integer |            | Required: No
```

#### Create "lessons" collection:
```
Collection ID: lessons
Collection Name: lessons
```

**Add these attributes:**
```
track         | String  | Size: 100  | Required: Yes
slug          | String  | Size: 100  | Required: Yes
title         | String  | Size: 255  | Required: Yes
type          | String  | Size: 50   | Required: No
duration      | String  | Size: 20   | Required: No
xp            | Integer |            | Required: No
isLocked      | Boolean |            | Required: No
content       | String  | Size: 16384| Required: No
code          | String  | Size: 4096 | Required: No
language      | String  | Size: 50   | Required: No
filename      | String  | Size: 100  | Required: No
objectives    | String  | Size: 2048 | Required: No
```

### 3. Set Permissions
For both collections, set these permissions:
```
Read: Any
Create: Users
Update: Users  
Delete: Users
```

### 4. Create Indexes
Create these indexes for better performance:

**courses collection:**
- Index name: `slug_unique`
- Type: Unique
- Attributes: `slug`

**lessons collection:**
- Index name: `track_index`
- Type: Key
- Attributes: `track`

- Index name: `slug_index`  
- Type: Key
- Attributes: `slug`

---

## Verify Setup

After setup, verify it worked:

### 1. Check Collections Exist
In Appwrite console, you should see:
- ✅ `courses` collection with 15 attributes
- ✅ `lessons` collection with 12 attributes

### 2. Test Import
- Go to `/admin/courses`  
- Click "Import 49 Curricula"
- Should start processing instead of showing collection errors

---

## Troubleshooting

### "Project not found" error:
- Check `APPWRITE_PROJECT_ID` is correct
- Verify you're connecting to the right Appwrite instance

### "Database not found" error:  
- Check `APPWRITE_DATABASE_ID` exists
- Create database in Appwrite console if needed

### "Permission denied" error:
- Check `APPWRITE_API_KEY` has database permissions
- Generate new API key with Database scope

### Setup script fails:
- Try manual setup via Appwrite console
- Check server logs for detailed errors

---

## Next Steps

After successful setup:

1. ✅ Database collections created
2. ✅ Go to `/admin/courses` 
3. ✅ Click "Import 49 Curricula"
4. ✅ Wait for import to complete (~1-2 minutes)
5. ✅ Visit `/learn` to see all courses!

**Your courses will be ready for users to learn! 🎉**
