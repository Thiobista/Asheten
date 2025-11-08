# Admin System Setup Guide

This guide will help you set up the admin system for managing images, certificates, and achievements.

## Architecture Overview

- **Frontend**: Next.js admin dashboard (`/admin`)
- **Database & API**: Supabase (PostgreSQL + REST API)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth

No backend server needed! Everything works directly with Supabase.

## Setup Instructions

### 1. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL Editor:
   - Go to SQL Editor in your Supabase dashboard
   - Click "New Query"
   - Copy and paste the entire contents of `supabase/schema.sql`
   - Click "Run" to execute
3. Create a storage bucket:
   - Go to Storage in your Supabase dashboard
   - Click "New bucket"
   - Name it `portfolio`
   - Make it **public** (toggle the public option)
   - Click "Create bucket"
4. Get your Supabase credentials:
   - Go to Settings > API
   - Copy your **Project URL**
   - Copy your **anon/public** key (this is safe to use in frontend)

### 2. Frontend Setup (Next.js)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the admin dashboard at `http://localhost:3000/admin/login`

### 3. Create Admin User

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add user" > "Create new user"
4. Enter email and password (you'll use this to login to admin)
5. After creating the user, note the user's UUID (you'll see it in the users list)
6. Go to SQL Editor and run this query (replace the values):

```sql
INSERT INTO admin_profiles (id, email, full_name, role)
VALUES (
  'USER_UUID_FROM_STEP_5',  -- Replace with the actual UUID from auth.users
  'your-email@example.com',  -- Replace with the email you used
  'Admin User',
  'admin'
);
```

To find the UUID easily, you can run this query first:
```sql
SELECT id, email FROM auth.users;
```

Then copy the UUID and use it in the INSERT statement above.

## How It Works

### Database Schema

The system uses four main tables:
- **images**: Store portfolio images
- **certificates**: Store certificates
- **achievements**: Store achievements
- **admin_profiles**: Link Supabase auth users to admin roles

### Row Level Security (RLS)

- **Public access**: Anyone can READ active items (is_active = true)
- **Admin access**: Only users with admin role can CREATE, UPDATE, DELETE

RLS policies are automatically enforced by Supabase - no backend code needed!

### File Upload

Files are uploaded directly to Supabase Storage:
- Images go to `portfolio/images/`
- Certificates go to `portfolio/certificates/`
- Achievement images go to `portfolio/achievements/`

The Supabase client handles authentication automatically.

## Admin Dashboard Features

1. **Login**: Secure authentication using Supabase Auth
2. **Dashboard**: Overview with statistics
3. **Images Management**: CRUD operations for images
4. **Certificates Management**: CRUD operations for certificates
5. **Achievements Management**: CRUD operations for achievements
6. **File Upload**: Direct upload to Supabase Storage

## Using the Admin Dashboard

1. Login at `/admin/login`
2. Navigate to the section you want to manage (Images, Certificates, or Achievements)
3. Click "Add New" to create new items
4. Use the Edit/Delete buttons to manage existing items
5. Upload files directly through the form - they'll be stored in Supabase Storage

## API Access (For Frontend)

You can also use the Supabase client directly in your frontend pages to fetch data:

```typescript
import { supabase } from '@/lib/supabase'

// Get all active images
const { data: images } = await supabase
  .from('images')
  .select('*')
  .eq('is_active', true)
  .order('display_order', { ascending: false })

// Get all certificates
const { data: certificates } = await supabase
  .from('certificates')
  .select('*')
  .eq('is_active', true)

// Get all achievements
const { data: achievements } = await supabase
  .from('achievements')
  .select('*')
  .eq('is_active', true)
```

The RLS policies ensure only active items are visible to the public.

## Security Notes

- Row Level Security (RLS) policies are set up in Supabase
- Only users with admin role can modify data
- Public endpoints only return active items
- Supabase handles authentication tokens automatically
- Storage bucket should be public for file access, but RLS controls who can upload

## Troubleshooting

### Can't login
- Verify admin profile exists in `admin_profiles` table
- Check that user role is set to 'admin'
- Ensure Supabase auth is properly configured
- Check browser console for errors

### File uploads fail
- Verify Supabase Storage bucket `portfolio` exists
- Check bucket is set to public
- Verify storage policies allow uploads
- Check browser console for errors

### Database queries fail
- Verify RLS policies are enabled
- Check that the schema was created correctly
- Verify your Supabase credentials in `.env.local`

### Permission errors
- Make sure you're logged in as an admin user
- Verify the user exists in `admin_profiles` table with role 'admin'
- Check RLS policies are correctly configured

## Production Deployment

For production:
1. Update Supabase project settings if needed
2. Deploy frontend to Vercel or Netlify
3. Make sure `.env.local` variables are set in your deployment platform
4. The admin dashboard will work the same way - no backend deployment needed!

## Benefits of Supabase-Only Architecture

✅ **Simpler**: No backend server to maintain  
✅ **Scalable**: Supabase handles scaling automatically  
✅ **Secure**: RLS policies enforced at database level  
✅ **Real-time**: Can add real-time subscriptions easily  
✅ **Cost-effective**: Free tier is generous for most use cases  
