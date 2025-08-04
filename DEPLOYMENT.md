# 🚀 Willow Trellis Farms - Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables Configuration

Copy `.env.example` to `.env.local` and configure the following:

#### Required Variables:
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Your domain (production) or `http://localhost:3000` (development)
- [ ] `GOOGLE_SHEETS_PRIVATE_KEY` - Service account private key
- [ ] `GOOGLE_SHEETS_CLIENT_EMAIL` - Service account email
- [ ] `GOOGLE_SHEETS_SPREADSHEET_ID` - Your products spreadsheet ID
- [ ] `EMAIL_SERVER_HOST` - SMTP host (e.g., smtp.gmail.com)
- [ ] `EMAIL_SERVER_PORT` - SMTP port (e.g., 587)
- [ ] `EMAIL_SERVER_USER` - Email username
- [ ] `EMAIL_SERVER_PASSWORD` - Email password/app password
- [ ] `EMAIL_FROM` - From email address

#### Optional Variables:
- [ ] `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - For Google OAuth
- [ ] `FACEBOOK_CLIENT_ID` & `FACEBOOK_CLIENT_SECRET` - For Facebook OAuth
- [ ] `INSTAGRAM_CLIENT_ID` & `INSTAGRAM_CLIENT_SECRET` - For Instagram OAuth
- [ ] `TWILIO_ACCOUNT_SID` - For SMS notifications
- [ ] `TWILIO_AUTH_TOKEN` - For SMS notifications
- [ ] `TWILIO_PHONE_NUMBER` - Your Twilio phone number

### 2. Database Setup

- [ ] Create PostgreSQL database (local or cloud)
- [ ] Run `npx prisma db push` to create tables
- [ ] Verify database connection

### 3. Google Sheets Setup

- [ ] Create Google Cloud Project
- [ ] Enable Google Sheets API
- [ ] Create Service Account
- [ ] Download service account JSON
- [ ] Create products spreadsheet with columns:
  - Column A: Product Name
  - Column B: Image URL
  - Column C: Price
  - Column D: Quantity
  - Column E: Category
  - Column F: Description
- [ ] Share spreadsheet with service account email

### 4. Email Configuration

- [ ] Set up SMTP service (Gmail recommended)
- [ ] Generate app password if using Gmail
- [ ] Test email sending

### 5. SMS Configuration (Optional)

- [ ] Create Twilio account
- [ ] Get phone number
- [ ] Configure SMS settings

## Deployment Steps

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build and Test Locally**
   ```bash
   npm install
   npm run build
   npm run start
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Configure Environment Variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add all required variables from your `.env.local`

5. **Set Up Database for Production**
   ```bash
   # Pull environment variables
   vercel env pull .env.local
   
   # Push database schema
   npx prisma db push
   ```

6. **Redeploy**
   ```bash
   vercel --prod
   ```

## Post-Deployment Testing

- [ ] User registration works
- [ ] User login works
- [ ] Google Sheets product sync works
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Order placement
- [ ] Email notifications
- [ ] Admin panel access
- [ ] Admin notifications
- [ ] Profile management
- [ ] SMS notifications (if configured)

## Production URLs

- **Application**: https://your-app.vercel.app
- **Admin Panel**: https://your-app.vercel.app/admin
- **Notifications**: https://your-app.vercel.app/admin/notifications

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Test database connectivity
4. Check Google Sheets API permissions

## Security Notes

- [ ] NEXTAUTH_SECRET is properly generated and unique
- [ ] Database credentials are secure
- [ ] OAuth redirects are configured for production domain
- [ ] Google Sheets service account has minimal permissions
- [ ] Email credentials are secure (use app passwords)
