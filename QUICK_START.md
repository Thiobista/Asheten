# Quick Start Guide - Admin System

This guide will get you up and running quickly with the admin system.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

## Step 1: Supabase Setup (5 minutes)

1. Go to https://supabase.com and create a new project
2. In your Supabase dashboard:
   - Go to SQL Editor
   - Copy and run the SQL from `supabase/schema.sql`
   - Go to Storage and create a bucket named `portfolio` (make it public)
   - Go to Settings > API and copy:
     - Project URL
     - `anon` key (public)

## Step 2: Frontend Setup (2 minutes)

```bash
npm install
```

Create `.env.local` in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Start the frontend:
```bash
npm run dev
```

## Step 3: Create Admin User (2 minutes)

1. Go to your Supabase Dashboard > Authentication
2. Click "Add User" > "Create new user"
3. Enter email and password (you'll use this to login)
4. After creating, note the user's UUID from the users list
5. Go to SQL Editor and run:

```sql
INSERT INTO admin_profiles (id, email, full_name, role)
VALUES (
  'USER_UUID_FROM_STEP_4',  -- Replace with actual UUID
  'your-email@example.com',  -- Replace with your email
  'Admin User',
  'admin'
);
```

To find the UUID, you can run:
```sql
SELECT id, email FROM auth.users;
```

## Step 4: Access Admin Dashboard

1. Open http://localhost:3000/admin/login
2. Login with the email and password you created
3. You're now in the admin dashboard!

## What You Can Do

- **Dashboard** (`/admin`): View statistics
- **Images** (`/admin/images`): Upload and manage images
- **Certificates** (`/admin/certificates`): Upload and manage certificates
- **Achievements** (`/admin/achievements`): Add and manage achievements

## Testing the System

1. Go to Images > Add New Image
2. Upload an image (it will be stored in Supabase Storage)
3. Fill in the form and submit
4. You should see your image in the list!

## Troubleshooting

**Can't login:**
- Make sure admin_profiles table has your user
- Check that role is set to 'admin'
- Verify you're using the correct email/password

**File uploads fail:**
- Verify `portfolio` bucket exists in Supabase Storage
- Check bucket is set to public
- Verify storage policies allow uploads

**Database errors:**
- Check that schema.sql was run successfully
- Verify RLS policies are enabled
- Check browser console for specific errors

## Next Steps

1. Customize the admin dashboard styling if needed
2. Add more fields to the database tables if required
3. Integrate the Supabase queries into your frontend portfolio pages
4. Set up production deployment

## Production Deployment

For production:
1. Deploy frontend to Vercel or Netlify
2. Add environment variables in your deployment platform
3. That's it! No backend to deploy 🎉
