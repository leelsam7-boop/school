# 🚀 Supabase Authentication Setup Guide

This guide will walk you through setting up Supabase authentication for your School Database application.

## 📋 Prerequisites

- A Supabase account (sign up at https://supabase.com)
- The project already has all necessary dependencies installed

## 🔧 Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in the project details:
   - **Name**: School Database (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (~2 minutes)

## 🔑 Step 2: Get Your API Keys

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Click on **API** under the Project Settings section
3. You'll see two important values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

## ⚙️ Step 3: Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzIzMjMyMywiZXhwIjoxOTM4ODA4MzIzfQ.1234567890abcdefghijklmnopqrstuvwxyz
```

3. **Important**: Never commit `.env.local` to version control (it's already in `.gitignore`)

## 📧 Step 4: Configure Email Authentication

### Enable Email Provider

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** in the list
3. Make sure "Enable Email provider" is **ON**
4. Configure the following settings:

#### Email Confirmation Settings:

**Option A: Disable Email Confirmation (for development)**
- Go to **Authentication** → **Settings**
- Under "Email Auth", toggle **OFF** "Enable email confirmations"
- ✅ Users can sign up and log in immediately without email verification
- ⚠️ Only use this for development/testing

**Option B: Enable Email Confirmation (recommended for production)**
- Go to **Authentication** → **Settings**  
- Under "Email Auth", toggle **ON** "Enable email confirmations"
- Users will receive a confirmation email before they can log in
- The email will contain a link that redirects to `/auth/callback`

### Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the following templates:
   - **Confirm signup**: Sent when a new user signs up
   - **Reset password**: Sent when a user requests a password reset
   - **Change email address**: Sent when a user changes their email

### URL Configuration

1. Go to **Authentication** → **URL Configuration**
2. Add your site URL:
   - **Site URL**: `http://localhost:3000` (for development)
   - For production, add your actual domain (e.g., `https://yourdomain.com`)

3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/reset-password`
   - For production, add the same paths with your domain

## 🎨 Step 5: Start the Development Server

```bash
npm run dev
```

Your app should now be running at http://localhost:3000

## ✅ Step 6: Test the Authentication Flow

### Test Sign Up:

1. Click "Sign Up" tab
2. Fill in:
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test1234 (must have uppercase, lowercase, and number)
   - Confirm Password: Test1234
3. Accept terms and click "Create Account"
4. If email confirmation is enabled:
   - Check your email inbox
   - Click the confirmation link
5. If email confirmation is disabled:
   - You'll be redirected to login automatically

### Test Login:

1. Click "Login" tab
2. Enter your credentials:
   - Email: test@example.com
   - Password: Test1234
3. Click "Sign In"
4. You should be redirected to the dashboard

### Test Password Reset:

1. Click "Forgot password?"
2. Enter your email address
3. Click "Send Reset Link"
4. Check your email for the reset link
5. Click the link and set a new password
6. You'll be redirected to the dashboard

### Test Logout:

1. In the dashboard, click the "Logout" button
2. Confirm the logout
3. You'll be redirected to the login page

## 🔒 Security Best Practices

### Row Level Security (RLS)

If you plan to store user-specific data in Supabase:

1. Go to **Table Editor** in your Supabase dashboard
2. Create your tables
3. Enable RLS by clicking **Enable RLS** for each table
4. Add policies to control who can read/write data

Example policy for a `students` table:
```sql
-- Allow users to read only their own data
CREATE POLICY "Users can view their own students"
ON students FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to insert their own data
CREATE POLICY "Users can insert their own students"
ON students FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### Additional Security Measures:

1. **Rate Limiting**: Supabase automatically rate limits authentication requests
2. **Email Verification**: Enable in production to prevent fake signups
3. **Strong Password Policy**: Already enforced in the signup form
4. **HTTPS Only**: Always use HTTPS in production
5. **Environment Variables**: Never expose API keys in client code

## 🎯 Features Implemented

✅ **Email/Password Authentication**
- Sign up with email verification
- Login with session management
- Remember me functionality
- Password visibility toggles

✅ **Password Reset Flow**
- Forgot password functionality
- Email-based password reset
- Secure password update

✅ **Protected Routes**
- Middleware-based route protection
- Auto-redirect for authenticated users
- Session persistence across page refreshes

✅ **Beautiful UI/UX**
- Animated backgrounds and particles
- Glass morphism effects
- Smooth transitions and hover effects
- Responsive design for all devices
- Loading states and error handling

✅ **Admin Dashboard**
- User profile display
- Statistics cards
- Tab-based navigation
- Logout confirmation modal
- Consistent visual design

## 🐛 Troubleshooting

### "Invalid API key" error:
- Double-check your `.env.local` file
- Make sure there are no extra spaces
- Restart the dev server after changing env variables

### Email not sending:
- Check your Supabase email settings
- For development, check the Supabase dashboard logs
- Make sure email confirmations are enabled/disabled as intended

### Redirect not working:
- Verify your redirect URLs in Supabase settings
- Make sure the URLs match exactly (including http/https)
- Check the browser console for errors

### Session not persisting:
- Clear browser cookies and local storage
- Check that middleware.ts is properly configured
- Verify Supabase client initialization

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## 🎉 Next Steps

Now that authentication is set up, you can:

1. **Add Database Tables**: Create tables for students, courses, etc.
2. **Build Features**: Add CRUD operations for your school data
3. **Enhance Dashboard**: Add real charts, graphs, and data visualization
4. **Deploy**: Deploy to Vercel or your preferred hosting platform

## 💡 Production Deployment

When deploying to production:

1. Update `.env.local` values in your hosting platform (Vercel, Netlify, etc.)
2. Add production URLs to Supabase redirect URLs
3. Enable email confirmations
4. Set up custom SMTP for better email deliverability
5. Enable RLS on all database tables
6. Set up monitoring and error tracking

---

**Need Help?** Check the troubleshooting section above or consult the Supabase documentation.
