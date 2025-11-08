# How to Run Admin Dashboard

## Quick Start (3 Steps)

### Step 1: Set Up Supabase (if not done yet)

1. Go to https://supabase.com and create a project
2. Run the SQL from `supabase/schema.sql` in Supabase SQL Editor
3. Create a storage bucket named `portfolio` (make it public)
4. Get your credentials from Settings > API:
   - Project URL
   - anon/public key

### Step 2: Create `.env.local` File

Create a file named `.env.local` in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase credentials.

### Step 3: Create Admin User

1. In Supabase Dashboard > Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password
4. Note the user's UUID
5. In SQL Editor, run:

```sql
INSERT INTO admin_profiles (id, email, full_name, role)
VALUES (
  'USER_UUID_HERE',
  'your-email@example.com',
  'Admin User',
  'admin'
);
```

### Step 4: Run the Development Server

```bash
npm run dev
```

### Step 5: Access Admin Dashboard

Open your browser and go to:
```
http://localhost:3000/admin/login
```

Login with the email and password you created in Step 3.

## Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure `.env.local` exists in the root directory
- Check that variable names start with `NEXT_PUBLIC_`
- Restart the dev server after creating `.env.local`

**Can't login:**
- Verify admin_profiles table has your user
- Check the role is set to 'admin'
- Make sure you're using the correct email/password

**File upload fails:**
- Verify `portfolio` bucket exists in Supabase Storage
- Check bucket is set to public
- Check browser console for errors

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server




