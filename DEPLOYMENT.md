# Deployment Configuration

## Vercel Frontend Environment Variables

Add these environment variables in your Vercel project settings:

### Production Environment Variables
```
NEXT_PUBLIC_API_URL=https://bible-chatbot-be.onrender.com
AUTH_URL=https://bible-chatbot-fe.vercel.app
AUTH_SECRET=bK3SLvbY57TlBsnflXEa/a09s7fWPfw7vUnT8CX90Uhc=
AUTH_TRUST_HOST=true
```

### How to Add in Vercel:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable above
4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **Save**
6. Redeploy your application for changes to take effect

---

## Render Backend Environment Variables

Add these environment variables in your Render service:

### Required Environment Variables
```
FRONTEND_URL=https://bible-chatbot-fe.vercel.app
DATABASE_URL=<your-postgresql-database-url>
API_KEY=<your-bible-api-key>
PORT=4000
```

### Setting Up PostgreSQL Database

**Option 1: Create PostgreSQL on Render (Recommended)**
1. In Render Dashboard, click **New +** → **PostgreSQL**
2. Name: `bible-chatbot-db`
3. Choose Free or Starter plan
4. After creation, copy the **Internal Database URL**
5. Add it as `DATABASE_URL` in your backend service environment variables

**Option 2: Use External Provider**
- Supabase (https://supabase.com) - 500MB free
- Neon (https://neon.tech) - 3GB free
- Get connection string and add as `DATABASE_URL`

See `bible_chatbot_BE/DATABASE_SETUP.md` for detailed instructions.

### How to Add in Render:
1. Go to your Render service dashboard
2. Navigate to **Environment** tab
3. Add each variable above
4. Click **Save Changes**
5. Your service will automatically redeploy

---

## Testing the Connection

### 1. Test Backend Health
```bash
curl https://bible-chatbot-be.onrender.com/
```
Expected response: `{"status": "ok", "message": "Bible Chatbot API is running"}`

### 2. Test CORS Configuration
```bash
curl -H "Origin: https://bible-chatbot-fe.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://bible-chatbot-be.onrender.com/api/books
```

### 3. Test Frontend Connection
After deploying to Vercel, visit:
- `https://bible-chatbot-fe.vercel.app`
- Check browser console for any CORS or API connection errors

---

## Local Development

For local development, use `.env.local`:
```
AUTH_SECRET=bK3SLvbY57TlBsnflXEa/a09s7fWPfw7vUnT8CX90Uhc=
AUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true
NEXT_PUBLIC_API_URL=https://bible-chatbot-be.onrender.com
```

Or to use local backend:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` is set correctly in Render
- Check that the URL matches exactly (including https://)
- Ensure no trailing slashes in URLs

### API Connection Errors
- Verify Render backend is running
- Check Render logs for errors
- Ensure `NEXT_PUBLIC_API_URL` is set in Vercel

### Authentication Issues
- Verify `AUTH_SECRET` is the same in both environments
- Check `AUTH_URL` matches your Vercel deployment URL
- Ensure `AUTH_TRUST_HOST=true` is set
