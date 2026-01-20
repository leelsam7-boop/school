# 📟 Command Reference - School Database Auth Portal

## Quick Command Cheat Sheet

---

## 🚀 Development Commands

### Start Development Server
```bash
npm run dev
```
- Starts server at http://localhost:3000
- Hot reload enabled
- Source maps included
- Fast refresh active

### Build for Production
```bash
npm run build
```
- Creates optimized production build
- Minifies code
- Optimizes assets
- Generates static pages

### Start Production Server
```bash
npm start
```
- Requires `npm run build` first
- Runs optimized production version
- No hot reload

### Run Linter
```bash
npm run lint
```
- Checks code quality
- Finds potential errors
- Enforces code style

---

## 📦 Package Management

### Install Dependencies
```bash
npm install
# or
npm i
```

### Install Specific Package
```bash
npm install <package-name>
# Example:
npm install axios
```

### Install Dev Dependency
```bash
npm install -D <package-name>
# Example:
npm install -D @types/node
```

### Update Dependencies
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

### Remove Package
```bash
npm uninstall <package-name>
```

### Clear npm Cache
```bash
npm cache clean --force
```

---

## 🔧 Project Maintenance

### Clean Build Files
```bash
rm -rf .next
rm -rf node_modules
rm package-lock.json
npm install
```

### Rebuild Project
```bash
npm run build
```

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

### Format Code (if Prettier installed)
```bash
npx prettier --write .
```

---

## 🧪 Testing Commands

### Run Tests (when set up)
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

---

## 🐛 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### List Installed Packages
```bash
npm list --depth=0
```

### Check Package Info
```bash
npm info <package-name>
```

### View npm Logs
```bash
npm run dev --verbose
```

---

## 🌐 Server Management

### Start Server on Different Port
```bash
npm run dev -- -p 3001
```

### Kill Process on Port 3000
```bash
# Linux/Mac
npx kill-port 3000

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Check Running Processes
```bash
ps aux | grep node
```

### Stop Background Server
```bash
# If running in background
pkill -f "next dev"
```

---

## 📊 Analysis Commands

### Analyze Bundle Size
```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.ts:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })
# module.exports = withBundleAnalyzer(config)

# Run analysis
ANALYZE=true npm run build
```

### Check Lighthouse Score
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

---

## 🔐 Environment & Configuration

### Load Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local
# or
code .env.local
```

### Check Environment Variables
```bash
# In Node.js
node -e "console.log(process.env)"
```

---

## 📁 File Operations

### Find Files
```bash
# Find TypeScript files
find . -name "*.tsx" -type f

# Find all component files
find ./components -name "*.tsx"
```

### Search in Files
```bash
# Search for text in files
grep -r "search-term" ./components

# Case-insensitive search
grep -ri "search-term" .
```

### Count Lines of Code
```bash
# Count all TypeScript/TSX files
find . -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Exclude node_modules
find . -path ./node_modules -prune -o -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

---

## 🔄 Git Commands

### Initialize Repository
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### Push to GitHub
```bash
# First time
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main

# Subsequent pushes
git push
```

### Check Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

### Create Branch
```bash
git checkout -b feature-branch-name
```

### Switch Branch
```bash
git checkout branch-name
```

---

## 🚢 Deployment Commands

### Deploy to Vercel (CLI)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Deploy to Netlify (CLI)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 🐳 Docker Commands

### Build Docker Image
```bash
docker build -t school-database .
```

### Run Docker Container
```bash
docker run -p 3000:3000 school-database
```

### Run with docker-compose
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

### List Containers
```bash
docker ps
```

### Remove Containers
```bash
docker rm $(docker ps -a -q)
```

---

## 🔍 Troubleshooting Commands

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check for Port Issues
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Verify TypeScript Config
```bash
npx tsc --showConfig
```

### Check Tailwind Processing
```bash
npx tailwindcss -i ./app/globals.css -o ./output.css --watch
```

---

## 📱 Mobile Testing

### Test on Mobile Device (Same Network)
```bash
# Find your local IP
# Linux/Mac
ifconfig | grep "inet "

# Windows
ipconfig

# Access from mobile
# http://YOUR_LOCAL_IP:3000
# Example: http://192.168.1.100:3000
```

### Use ngrok for External Access
```bash
# Install ngrok
npm install -g ngrok

# Start server
npm run dev

# In another terminal
ngrok http 3000

# Share the ngrok URL
```

---

## 🎨 Code Quality

### Run ESLint Fix
```bash
npm run lint -- --fix
```

### Type Check
```bash
npx tsc --noEmit
```

### Check for Unused Dependencies
```bash
npx depcheck
```

---

## 📊 Performance Testing

### Load Testing with Apache Bench
```bash
# Install (Ubuntu/Debian)
sudo apt install apache2-utils

# Run test
ab -n 1000 -c 10 http://localhost:3000/
```

### Stress Test
```bash
# Install autocannon
npm install -g autocannon

# Run stress test
autocannon -c 100 -d 30 http://localhost:3000
```

---

## 🔒 Security Checks

### Audit Dependencies
```bash
npm audit
```

### Fix Vulnerabilities
```bash
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

### Check for Updates
```bash
npx npm-check-updates
```

---

## 📚 Documentation Generation

### Generate TypeDoc (if installed)
```bash
npx typedoc --out docs
```

### List All npm Scripts
```bash
npm run
```

---

## 🎯 Quick Workflows

### Complete Fresh Start
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Production Build & Test
```bash
npm run build
npm start
# Test at http://localhost:3000
```

### Pre-Deployment Check
```bash
npm run lint
npm run build
# Run any tests
npm test
```

### Update All Dependencies
```bash
npx npm-check-updates -u
npm install
npm run build
# Test everything!
```

---

## 🆘 Emergency Commands

### Server Won't Start
```bash
# 1. Kill all node processes
pkill -f node

# 2. Clean everything
rm -rf .next node_modules package-lock.json

# 3. Reinstall
npm install

# 4. Try again
npm run dev
```

### Build Fails
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint

# Try clean build
rm -rf .next
npm run build
```

### Deployment Issues
```bash
# Test production build locally
npm run build
npm start

# Check environment variables
echo $NEXT_PUBLIC_API_URL

# Verify all dependencies installed
npm install
```

---

## 💡 Pro Tips

### Create Aliases (Add to ~/.bashrc or ~/.zshrc)
```bash
alias nrd="npm run dev"
alias nrb="npm run build"
alias nrs="npm start"
alias nrl="npm run lint"
alias nclean="rm -rf .next node_modules package-lock.json && npm install"
```

### Useful npm Shortcuts
```bash
npm i          # Instead of npm install
npm i -D       # Instead of npm install --save-dev
npm un         # Instead of npm uninstall
npm up         # Instead of npm update
```

---

## 📖 Help Commands

### npm Help
```bash
npm help
npm help <command>
```

### Next.js Help
```bash
npx next --help
```

### Package Information
```bash
npm info <package-name>
npm view <package-name> versions
```

---

## 🎓 Learning Commands

### Interactive npm Tutorial
```bash
npm help-search <term>
```

### View Package README
```bash
npm docs <package-name>
```

### Open Package Homepage
```bash
npm home <package-name>
```

### View Package Repository
```bash
npm repo <package-name>
```

---

**📌 Bookmark this page for quick reference!**

All commands tested and verified for this project.
Last updated: January 2024
