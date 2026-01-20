# 🚀 Deployment Guide - School Database Auth Portal

## Overview

This guide covers deploying your authentication portal to production on various platforms.

---

## ⚡ Quick Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Built by Next.js creators
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier available
- ✅ Perfect for Next.js apps

### Step-by-Step Deployment

#### 1. Create Vercel Account
```bash
# Visit https://vercel.com/signup
# Sign up with GitHub (recommended)
```

#### 2. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

#### 3. Deploy from CLI
```bash
# Navigate to project
cd /home/engine/project

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? school-database
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

#### 4. Deploy from GitHub (Easier)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: School database auth portal"
   git remote add origin https://github.com/yourusername/school-database.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click "Deploy"
   - Done! ✨

### Environment Variables (if needed)
```bash
# Add in Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_API_URL=https://api.yourschool.com
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
```

---

## 🌐 Deploy to Netlify

### Step-by-Step

1. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy:**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

---

## 🐳 Deploy with Docker

### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t school-database .

# Run container
docker run -p 3000:3000 school-database

# Or use docker-compose
docker-compose up -d
```

---

## ☁️ Deploy to Railway

### Step-by-Step

1. **Create Account:**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway auto-detects Next.js
   - Click "Deploy"

3. **Custom Domain (Optional):**
   - Go to Settings
   - Add custom domain
   - Update DNS records

---

## 🔧 Deploy to Custom VPS (Ubuntu)

### Prerequisites
- Ubuntu 20.04+ server
- Domain name pointed to server
- SSH access

### Step-by-Step

#### 1. Server Setup
```bash
# SSH into server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### 2. Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/school-database.git
cd school-database

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "school-database" -- start
pm2 save
pm2 startup
```

#### 3. Configure Nginx
```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/school-database
```

Add configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/school-database /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (runs automatically)
sudo certbot renew --dry-run
```

---

## 🌍 Deploy to AWS (EC2 + S3)

### Option 1: EC2 Instance

1. **Launch EC2 Instance:**
   - Choose Ubuntu 20.04 AMI
   - t2.micro for free tier
   - Configure security group (ports 22, 80, 443)

2. **Follow VPS instructions above**

### Option 2: AWS Amplify

1. **Install Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize:**
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

---

## 📊 Pre-Deployment Checklist

### Code Optimization
- [ ] Remove console.logs
- [ ] Optimize images
- [ ] Minify CSS/JS (automatic with Next.js)
- [ ] Enable compression
- [ ] Add error boundaries

### Security
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Add security headers
- [ ] Implement rate limiting
- [ ] Set up CORS properly

### Performance
- [ ] Test with Lighthouse
- [ ] Optimize bundle size
- [ ] Enable caching
- [ ] Use CDN for static assets
- [ ] Implement lazy loading

### SEO
- [ ] Add meta tags
- [ ] Create sitemap
- [ ] Add robots.txt
- [ ] Optimize for mobile
- [ ] Add analytics

---

## 🔒 Environment Variables Setup

### Create `.env.local`
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourschool.com

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication (NextAuth.js)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://yourdomain.com

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password

# Other
NODE_ENV=production
```

### Security Best Practices
- ✅ Never commit `.env` files
- ✅ Use different values for dev/prod
- ✅ Rotate secrets regularly
- ✅ Use secret management services

---

## 📈 Performance Optimization

### Next.js Config Updates

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Compress pages
  compress: true,
  
  // Optimize images
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 🧪 Testing Before Deployment

### Build Test
```bash
# Test production build locally
npm run build
npm start

# Test on different devices
# - Desktop browsers
# - Mobile browsers
# - Different screen sizes
```

### Performance Test
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:3000
```

### Load Test
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Run load test
ab -n 1000 -c 10 http://localhost:3000/
```

---

## 📊 Monitoring & Analytics

### Add Google Analytics

1. **Get tracking ID** from Google Analytics

2. **Create `lib/gtag.ts`:**
```typescript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

3. **Add to `app/layout.tsx`:**
```typescript
import Script from 'next/script';

// In return statement
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `}
</Script>
```

### Error Monitoring with Sentry

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs

# Follow prompts to configure
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Run tests (if any)
        run: npm test || true
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📱 Domain Configuration

### Custom Domain Setup

1. **Purchase domain** (Namecheap, GoDaddy, etc.)

2. **Add DNS records:**

For Vercel:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

For other platforms:
```
Type    Name    Value
A       @       your-server-ip
CNAME   www     yourdomain.com
```

3. **Configure SSL:**
- Most platforms auto-provision SSL
- Or use Let's Encrypt (free)

---

## 🎯 Post-Deployment Tasks

### Immediate
- [ ] Test all features
- [ ] Verify SSL certificate
- [ ] Check mobile responsiveness
- [ ] Test form submissions
- [ ] Verify animations work
- [ ] Check console for errors

### Within 24 Hours
- [ ] Set up monitoring
- [ ] Configure analytics
- [ ] Test load performance
- [ ] Check SEO basics
- [ ] Set up error tracking

### Ongoing
- [ ] Monitor performance
- [ ] Review analytics
- [ ] Check error logs
- [ ] Update dependencies
- [ ] Optimize based on data

---

## 🚨 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Runtime Errors
```bash
# Check environment variables
# Verify all required vars are set
# Check server logs
```

### Performance Issues
```bash
# Enable Next.js analytics
# Check bundle size
npx @next/bundle-analyzer
```

---

## 📚 Resources

### Official Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Site loads without errors
- ✅ All animations work smoothly
- ✅ Forms validate correctly
- ✅ Mobile version works perfectly
- ✅ HTTPS is enabled
- ✅ Performance score > 90
- ✅ No console errors
- ✅ Analytics tracking works

---

**Ready to deploy? Choose your platform and follow the steps above!** 🚀

For questions or issues, refer to the platform-specific documentation or create an issue in the GitHub repository.
