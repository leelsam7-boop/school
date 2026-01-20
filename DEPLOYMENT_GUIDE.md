# 🚀 Deployment Guide - School Database

Complete guide to deploy your School Database application to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] Supabase project created and configured
- [x] Email authentication tested locally
- [x] All features working in development
- [x] Environment variables documented
- [ ] Production domain name ready
- [ ] Database schema finalized (if using)
- [ ] RLS policies configured (if storing data)

## 🌐 Deploy to Vercel (Recommended)

Vercel provides the best experience for Next.js applications.

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit with Supabase integration"
```

2. **Push to GitHub**:
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/your-username/school-database.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `school-database` repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `next build` (default)
   - **Output Directory**: .next (default)

6. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add the following:
   
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://your-project.supabase.co
   
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: your-anon-key-here
   ```

7. Click "Deploy"
8. Wait for deployment to complete (~2-3 minutes)
9. Your app will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Add environment variables**:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

5. **Deploy to production**:
```bash
vercel --prod
```

### Step 3: Update Supabase Configuration

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Update the following:

**Site URL**:
```
https://your-project.vercel.app
```

**Redirect URLs** (add all of these):
```
https://your-project.vercel.app/auth/callback
https://your-project.vercel.app/auth/reset-password
http://localhost:3000/auth/callback
http://localhost:3000/auth/reset-password
```

4. Save changes

### Step 4: Test Production Deployment

1. Visit your Vercel URL
2. Test sign up flow
3. Check email delivery
4. Test login
5. Test password reset
6. Test dashboard access
7. Test logout

## 🎯 Custom Domain Setup

### Add Custom Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `schooldb.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (~24 hours max)

### Update Supabase for Custom Domain

1. In Supabase dashboard
2. **Authentication** → **URL Configuration**
3. Update Site URL to your custom domain:
   ```
   https://schooldb.com
   ```
4. Add redirect URLs:
   ```
   https://schooldb.com/auth/callback
   https://schooldb.com/auth/reset-password
   ```

## 🔧 Alternative Deployment Options

### Deploy to Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build the project**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod
```

4. **Add environment variables** in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Update Supabase URLs** with your Netlify domain

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in Railway dashboard
6. Deploy!
7. Update Supabase URLs with your Railway domain

### Self-Hosted (Docker)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t school-database .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  school-database
```

## 📧 Production Email Configuration

### Option 1: Use Supabase Default SMTP

- **Pros**: No configuration needed
- **Cons**: Limited send rate, Supabase branding
- **Good for**: Testing, small projects

### Option 2: Custom SMTP (Recommended for Production)

1. **Choose an email provider**:
   - SendGrid (free tier: 100 emails/day)
   - AWS SES (cheap, reliable)
   - Mailgun (good free tier)
   - Resend (developer-friendly)

2. **Configure in Supabase**:
   - Go to **Project Settings** → **Auth**
   - Scroll to **SMTP Settings**
   - Enable custom SMTP
   - Enter your SMTP credentials:
     ```
     Host: smtp.sendgrid.net
     Port: 587
     User: apikey
     Password: your-sendgrid-api-key
     From: noreply@yourdomain.com
     ```

3. **Test email delivery**

### Option 3: Email Templates

Customize email templates in Supabase:
1. **Authentication** → **Email Templates**
2. Edit templates for:
   - Confirm Signup
   - Reset Password
   - Magic Link
   - Change Email

Example custom template:
```html
<h2>Welcome to School Database!</h2>
<p>Click the link below to confirm your email:</p>
<a href="{{ .ConfirmationURL }}">Confirm Email</a>
```

## 🔒 Production Security Hardening

### 1. Enable Email Confirmations

```
Supabase Dashboard → Authentication → Settings
→ Enable "Confirm email"
```

### 2. Set Rate Limits

```
Supabase Dashboard → Authentication → Rate Limits
→ Set appropriate limits for:
  - Sign up: 10 per hour per IP
  - Sign in: 30 per hour per IP
  - Password reset: 5 per hour per IP
```

### 3. Enable RLS on Tables

For any user data tables:
```sql
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their data"
ON students FOR SELECT
USING (auth.uid() = user_id);
```

### 4. Secure API Keys

- ✅ Never commit `.env.local` to git
- ✅ Use Vercel environment variables
- ✅ Rotate keys if exposed
- ✅ Use `NEXT_PUBLIC_` prefix only for public keys

### 5. Add Security Headers

Create `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

Enable in Vercel dashboard:
- Go to your project
- Click **Analytics** tab
- Enable Web Analytics

### 2. Supabase Monitoring

Monitor in Supabase dashboard:
- **Database** → Performance tab
- **Auth** → Users tab (view signups)
- **Logs** → Check for errors

### 3. Error Tracking (Optional)

Add Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js`:
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "your-sentry-dsn",
  tracesSampleRate: 1.0,
});
```

## 🧪 Testing Production

### Automated Tests

Create `cypress.config.ts` for E2E testing:
```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://your-project.vercel.app",
  },
});
```

Test auth flow:
```typescript
// cypress/e2e/auth.cy.ts
describe("Authentication", () => {
  it("should sign up successfully", () => {
    cy.visit("/");
    cy.get('[data-testid="signup-tab"]').click();
    cy.get('[data-testid="name-input"]').type("Test User");
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("Test1234");
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

### Manual Testing Checklist

- [ ] Sign up new account
- [ ] Receive confirmation email
- [ ] Click confirmation link
- [ ] Login with credentials
- [ ] View dashboard
- [ ] Navigate between tabs
- [ ] Update profile (if implemented)
- [ ] Request password reset
- [ ] Reset password via email
- [ ] Login with new password
- [ ] Logout successfully
- [ ] Test on mobile device
- [ ] Test on different browsers

## 🚨 Rollback Plan

If something goes wrong:

### Vercel Rollback

1. Go to Vercel dashboard
2. Click **Deployments** tab
3. Find previous working deployment
4. Click **...** → **Promote to Production**

### Database Rollback

If you made database changes:
1. Supabase doesn't have automatic rollback
2. Use SQL migrations to reverse changes
3. Or restore from backup (if configured)

## 📈 Scaling Considerations

### Database Scaling

- **Free Tier**: Up to 500MB database, 2GB bandwidth
- **Pro Tier**: Up to 8GB database, 50GB bandwidth
- **Team/Enterprise**: Custom limits

Monitor usage:
```
Supabase Dashboard → Settings → Usage
```

### Vercel Scaling

- **Hobby**: 100GB bandwidth, unlimited deployments
- **Pro**: 1TB bandwidth, better performance
- **Enterprise**: Custom limits

### Performance Optimization

1. **Enable caching**:
```typescript
// In components
export const revalidate = 3600; // Revalidate every hour
```

2. **Optimize images**:
```tsx
import Image from "next/image";

<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

3. **Lazy load components**:
```typescript
const DashboardContent = dynamic(() => import("@/components/DashboardContent"), {
  loading: () => <LoadingSpinner />,
});
```

## 🎉 Post-Deployment

### 1. Announce Launch

- Share with users
- Create documentation
- Set up support channels

### 2. Monitor Performance

- Check Vercel Analytics
- Monitor Supabase usage
- Watch for errors in logs

### 3. Gather Feedback

- Create feedback form
- Monitor user issues
- Plan improvements

### 4. Regular Maintenance

- Update dependencies monthly
- Review security advisories
- Backup database regularly
- Monitor uptime

## 📞 Support Resources

- **Vercel Support**: support.vercel.com
- **Supabase Discord**: discord.supabase.com
- **GitHub Issues**: For your repository
- **Stack Overflow**: Tag with nextjs, supabase

## 🎯 Success Metrics

Track these KPIs:
- User signups per day
- Login success rate
- Email delivery rate
- Page load time
- Error rate
- User retention

---

**Congratulations! Your School Database is now live! 🚀**

Need help? Check the troubleshooting section or consult the official documentation.
