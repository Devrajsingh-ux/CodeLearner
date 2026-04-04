# 🔧 Troubleshooting Course Import

## Common Issues and Solutions

### Issue 1: Import Button Doesn't Work

**Symptoms:**
- Button click does nothing
- No error messages appear

**Solutions:**
1. Check browser console (F12) for JavaScript errors
2. Verify you're logged in as admin
3. Clear browser cache and reload
4. Check network tab to see if API call is made

### Issue 2: "Unauthorized" Error

**Symptoms:**
- Error: "Unauthorized. Admin login required."

**Solutions:**
1. Make sure you're logged in at `/admin/login`
2. Check that admin session cookie is set
3. Verify `requireAdminCookie` function works
4. Try logging out and logging in again

### Issue 3: "Export Not Found" Error

**Symptoms:**
```
Export getAllCourseSlugs doesn't exist in target module
```

**Solutions:**
1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Verify file exists: `ls src/data/courses/index.ts`
4. Check exports: `grep "export.*getCurriculum" src/data/courses/index.ts`

### Issue 4: Import Fails with Appwrite Error

**Symptoms:**
- "Failed to create document" errors
- 4xx/5xx errors from Appwrite

**Solutions:**
1. **Check Appwrite Connection:**
   ```bash
   # Verify environment variables
   echo $NEXT_PUBLIC_APPWRITE_ENDPOINT
   echo $NEXT_PUBLIC_APPWRITE_PROJECT_ID
   ```

2. **Verify Database Collections Exist:**
   - Login to Appwrite console
   - Check that `courses` and `lessons` collections exist
   - Verify collection attributes match the data structure

3. **Check Appwrite Permissions:**
   - Admin should have create permissions
   - Collections should allow document creation

4. **Review Server Logs:**
   ```bash
   # Check Next.js logs for detailed errors
   # Look for console.log messages from the API route
   ```

### Issue 5: Some Courses Fail to Import

**Symptoms:**
- Import completes but shows failures
- Console shows specific course errors

**Solutions:**
1. **Check Failed Courses:**
   - Open browser console
   - Look for `Failed imports:` log
   - Note which courses failed

2. **Test Individual Curriculum:**
   ```javascript
   // In browser console or Node:
   import { getCurriculum } from '@/data/courses/index';
   const curr = await getCurriculum('python');
   console.log(curr);
   ```

3. **Verify Curriculum Files:**
   ```bash
   # Check file exists
   ls src/data/courses/Python/curriculum.ts
   
   # Check file size (should be > 0)
   du -h src/data/courses/*/curriculum.ts
   ```

4. **Check for TypeScript Errors:**
   ```bash
   npx tsc --noEmit src/data/courses/Python/curriculum.ts
   ```

### Issue 6: Courses Don't Show on /learn Page

**Symptoms:**
- Import succeeds but courses not visible
- /learn page is empty

**Solutions:**
1. **Verify Course Status:**
   - Check admin courses page
   - Ensure status is "published" not "draft"

2. **Check Course Data:**
   ```bash
   # Test API endpoint
   curl http://localhost:3000/api/courses
   ```

3. **Verify Database:**
   - Login to Appwrite console
   - Check `courses` collection has documents
   - Verify slug, title, status fields

4. **Clear Frontend Cache:**
   - Hard reload browser (Ctrl+Shift+R)
   - Clear site data in browser dev tools

### Issue 7: Lessons Not Loading

**Symptoms:**
- Course page loads but shows 0 lessons
- Can't start first lesson

**Solutions:**
1. **Check Lesson Count:**
   - Go to `/admin/lessons`
   - Filter by track slug
   - Verify lessons exist

2. **Verify Track Field:**
   - Lessons must have `track` field matching course slug
   - Check in Appwrite console

3. **Check Lesson Status:**
   - First lesson should have `isLocked: false`
   - Verify in database

### Issue 8: Slow Import or Timeout

**Symptoms:**
- Import takes > 5 minutes
- Browser shows timeout error

**Solutions:**
1. **Import in Batches:**
   - Modify code to import 10 courses at a time
   - Add delay between creates

2. **Increase Timeout:**
   - Check Appwrite server timeout settings
   - Increase Next.js timeout if needed

3. **Use CLI Script:**
   - Run `node seedCurriculaToDatabase.js`
   - Has better error reporting

## Debugging Commands

```bash
# 1. Check all curriculum files exist
ls src/data/courses/*/curriculum.ts | wc -l
# Should output: 49

# 2. Test curriculum loading
node testCurriculumLoad.js

# 3. Check TypeScript compilation
npx tsc --noEmit

# 4. View server logs in real-time
npm run dev
# Then import and watch console

# 5. Test API endpoint directly
curl -X POST http://localhost:3000/api/admin/courses/seed-curricula \
  -H "Content-Type: application/json" \
  -b "your-cookie-here"

# 6. Check database
# Login to Appwrite console and inspect collections
```

## Getting Help

If issues persist:

1. Check browser console for errors
2. Check server logs for error messages
3. Review `CONNECT_COURSES_GUIDE.md`
4. Check Appwrite documentation
5. Verify environment variables

## Quick Fixes

```bash
# Reset everything
rm -rf .next
npm run dev

# Re-import after fixing
# Go to /admin/courses
# Click "Import 49 Curricula"
```

## Success Indicators

You'll know it works when:

✅ Import completes with "49 courses imported"
✅ `/admin/courses` shows 49 courses
✅ `/learn` displays all courses
✅ Can click a course and see lessons
✅ Can enroll and start Lesson 1
✅ Code editor loads and works

---

**Still having issues?** Check the detailed logs in browser console and server terminal.
