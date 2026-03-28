# 🚀 STU-BRAIN — Deploy to Vercel in 2 Minutes

## Option 1: Auto-Deploy from GitHub (RECOMMENDED)

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"  
3. Connect GitHub → Select: `Vaibhavsonava2005/stu-brain`
4. **IMPORTANT**: Set Branch to `nextjs`
5. Set Root Directory to: `/` (leave as default)
6. Add Environment Variables:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_kEWKYqf9xHw0@ep-morning-shadow-an52p0lf-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   JWT_SECRET = stubrain_secret_key_2025_secure
   ```
7. Click Deploy ✅

Your URL: https://stu-brain-platform.vercel.app

## Demo Credentials
- **Student**: student@demo.com / demo123
- **Teacher**: teacher@demo.com / demo123  
- **Admin**: admin@demo.com / demo123

## First Visit - Initialize Database
After deployment, visit: https://your-url.vercel.app/api/init
This creates all tables and demo users automatically.
