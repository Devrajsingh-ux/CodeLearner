# Database Setup Guide

This guide explains how to set up the Appwrite database for the CodeLearner application.

## Prerequisites

1. **Appwrite Instance**: You need an Appwrite server (cloud or self-hosted)
2. **API Key**: Admin API key with database permissions
3. **Project ID**: Your Appwrite project ID

## Environment Configuration

Create or update your `.env.local` file with the required variables:

```bash
# Appwrite Configuration
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here
```

### Getting Your Credentials

1. **Appwrite Project ID**:
   - Go to your Appwrite console
   - Select your project
   - Copy the Project ID from the settings

2. **API Key**:
   - Go to "API Keys" section in your Appwrite console
   - Create a new API key with these permissions:
     - databases.read
     - databases.write
     - collections.read
     - collections.write
     - attributes.read
     - attributes.write
     - indexes.read
     - indexes.write

## Automatic Setup (Recommended)

Run the automated database setup script:

```bash
npm run setup:db
```

This will:
- Create the `zentax_db` database
- Set up all required collections with proper schemas
- Configure indexes for optimal performance
- Set appropriate permissions

## Manual Setup (Alternative)

If you prefer to set up the database manually, create these collections:

### 1. Enrollments Collection
- **Collection ID**: `enrollments`
- **Attributes**:
  - userId (String, 100, Required)
  - courseId (String, 100, Required)
  - courseSlug (String, 100, Required)
  - courseTitle (String, 500, Required)
  - enrolledAt (DateTime, Required)
  - lastAccessedAt (DateTime, Required)
  - status (String, 50, Required, Default: "active")
  - completedLessons (Integer, Required, Default: 0)
  - totalLessons (Integer, Required, Default: 0)
  - percentComplete (Float, Required, Default: 0.0)
  - timeSpent (Integer, Optional, Default: 0)
  - lastLessonId (String, 100, Optional)

### 2. Daily Activity Collection
- **Collection ID**: `daily_activity`
- **Attributes**:
  - userId (String, 100, Required)
  - date (String, 20, Required)
  - lessonsCompleted (Integer, Required, Default: 0)
  - problemsSolved (Integer, Required, Default: 0)
  - xpEarned (Integer, Required, Default: 0)
  - minutesStudied (Integer, Required, Default: 0)
  - questsCompleted (String Array, 1000, Optional)
  - createdAt (DateTime, Required)

### 3. User Streaks Collection
- **Collection ID**: `user_streaks`
- **Attributes**:
  - userId (String, 100, Required)
  - currentStreak (Integer, Required, Default: 0)
  - longestStreak (Integer, Required, Default: 0)
  - lastActivityDate (String, 20, Required)
  - streakStartDate (String, 20, Required)
  - updatedAt (DateTime, Required)

### 4. Lesson Progress Collection
- **Collection ID**: `lesson_progress`
- **Attributes**:
  - userId (String, 100, Required)
  - courseId (String, 100, Required)
  - courseSlug (String, 100, Required)
  - lessonId (String, 100, Required)
  - lessonSlug (String, 100, Required)
  - status (String, 20, Required, Default: "completed")
  - xpEarned (Integer, Required, Default: 0)
  - timeSpent (Integer, Optional, Default: 0)
  - completedAt (DateTime, Required)

### 5. Problems Solved Collection
- **Collection ID**: `problems_solved`
- **Attributes**:
  - userId (String, 100, Required)
  - problemId (String, 100, Required)
  - language (String, 50, Required)
  - difficulty (String, 20, Required)
  - timeSpent (Integer, Optional, Default: 0)
  - attempts (Integer, Required, Default: 1)
  - solvedAt (DateTime, Required)

## Permissions

Each collection should have these permissions:
- **Read**: Users (allow users to read their own data)
- **Create**: Users (allow users to create their own data)
- **Update**: Users (allow users to update their own data)
- **Delete**: Users (allow users to delete their own data)

## Verification

After setup, verify your database:

1. **Check Collections**: Ensure all 5 collections are created
2. **Test API**: Run `npm run dev` and check that the dashboard loads without database errors
3. **Create Test Data**: Try enrolling in a course to test data creation

## Troubleshooting

### Error: Database not found
- Ensure your `APPWRITE_PROJECT_ID` is correct
- Check that your API key has database permissions

### Error: Collection creation failed
- Verify your API key has collection and attribute permissions
- Check Appwrite server logs for detailed error messages

### Error: Permission denied
- Ensure collections have proper user permissions set
- Check that your session authentication is working

## Development vs Production

### Development
- The application will work without a database (shows empty/default data)
- Use the automated setup script for convenience

### Production
- Database setup is required for full functionality
- Consider using Appwrite's backup features
- Monitor collection performance and add indexes as needed

## Migration

If you need to update the database schema:

1. **Backup your data** using Appwrite's export feature
2. Update the schema in `scripts/setup-database.js`
3. Run the setup script again (it will skip existing collections)
4. For breaking changes, create a migration script

## Performance Tips

1. **Indexes**: The setup script creates optimal indexes for queries
2. **Pagination**: Use proper pagination for large datasets
3. **Cleanup**: Regularly clean up old activity data if needed
4. **Monitoring**: Monitor query performance in Appwrite console

## Support

If you encounter issues:
1. Check the Appwrite console for detailed error messages
2. Verify environment variables are set correctly
3. Ensure network connectivity to your Appwrite instance
4. Check API key permissions and expiration