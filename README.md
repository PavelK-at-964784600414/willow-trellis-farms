# Willow Trellis Farms - Farm Fresh Produce Pickup Platform

A modern Next.js 14 farm pickup application for fresh produce with comprehensive features including authentication, shopping cart, order management, admin panel, and advanced notification system.

## Features

- **Authentication System**
  - Email/password authentication with NextAuth.js
  - OAuth integration (Google, Facebook, Instagram)
  - User registration and login
  - Session management

- **Product Management**
  - Google Sheets API integration for product data
  - Real-time product synchronization
  - Category-based filtering
  - Stock management

- **Shopping Cart**
  - Context-based state management
  - Local storage persistence
  - Add/remove/update items
  - Real-time price calculations

- **Order System**
  - Secure checkout process for farm pickup
  - Order confirmation with email/SMS notifications
  - Order tracking and history
  - Admin order management
  - Farm pickup location and timing

- **Advanced Notification System**
  - Multi-channel notifications (Email + SMS)
  - Custom notification preferences per user
  - Admin broadcast notifications to selected users
  - Order status update notifications
  - Farm announcements and seasonal updates
  - Bulk notification system for promotions

- **Admin Panel**
  - Role-based access control
  - Order management dashboard
  - Status updates
  - Sales analytics

- **Notifications**
  - Email confirmations via Nodemailer
  - SMS notifications via Twilio
  - Admin order alerts

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Heroicons
- **Email**: Nodemailer
- **SMS**: Twilio
- **External APIs**: Google Sheets API

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Cloud Console account (for Sheets API and OAuth)
- Twilio account (for SMS)
- Email service (Gmail/SMTP)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd willow-trellis-farms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy `.env.example` to `.env.local` and configure:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/willowtrellis?schema=public"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   FACEBOOK_CLIENT_ID="your-facebook-client-id"
   FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
   INSTAGRAM_CLIENT_ID="your-instagram-client-id"
   INSTAGRAM_CLIENT_SECRET="your-instagram-client-secret"
   
   # Google Sheets API
   GOOGLE_SHEETS_PRIVATE_KEY="your-google-sheets-private-key"
   GOOGLE_SHEETS_CLIENT_EMAIL="your-google-sheets-client-email"
   GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id"
   
   # Email (Nodemailer)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-email-password"
   EMAIL_FROM="noreply@willowtrellis.com"
   
   # SMS (Twilio)
   TWILIO_ACCOUNT_SID="your-twilio-account-sid"
   TWILIO_AUTH_TOKEN="your-twilio-auth-token"
   TWILIO_PHONE_NUMBER="your-twilio-phone-number"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Google Sheets Setup**
   
   Create a Google Sheet with the following columns:
   - Column A: Product Name
   - Column B: Image URL
   - Column C: Price
   - Column D: Quantity
   - Column E: Category
   - Column F: Description
   
   Share the sheet with your service account email.

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

- `POST /api/auth/signup` - User registration
- `GET /api/products` - Fetch products from Google Sheets
- `POST /api/revalidate` - Clear product cache
- `GET|POST /api/orders` - Order management
- `PATCH /api/orders/[id]` - Update order status (admin only)
- `GET|PATCH /api/profile` - User profile management
- `GET|POST /api/notifications` - Admin notification system

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── orders/        # Order management
│   │   ├── notifications/ # Admin notification system
│   │   ├── profile/       # User profile management
│   │   └── products/      # Product data from Google Sheets
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   │   └── notifications/ # Broadcast notification panel
│   ├── profile/           # User profile & preferences
│   ├── products/          # Product listing
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   └── orders/            # Order history
├── components/            # Reusable components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── types/                 # TypeScript definitions
└── prisma/                # Database schema
```

## Key Components

- **Navigation**: Main navigation with cart counter and auth status
- **CartProvider**: Shopping cart context with localStorage persistence
- **Providers**: App-wide providers (Auth, Cart)

## Database Schema

- **User**: Authentication and profile data with notification preferences
- **Product**: Product information (synced from Google Sheets)
- **Order**: Farm pickup order information and status
- **OrderItem**: Individual items in pickup orders
- **Notification**: Admin notification history and tracking

## Deployment

### Vercel Deployment (Recommended)

1. **Prepare for Deployment**
   ```bash
   # Ensure all dependencies are installed
   npm install
   
   # Generate Prisma client
   npx prisma generate
   
   # Build the project locally to check for errors
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI (if not already installed)
   npm i -g vercel
   
   # Deploy to Vercel
   vercel
   
   # Follow the prompts to link your project
   ```

3. **Configure Environment Variables in Vercel**
   
   Go to your Vercel dashboard → Project → Settings → Environment Variables and add:
   
   **Database (Required)**
   - `DATABASE_URL` - Your PostgreSQL connection string (use Vercel Postgres or external provider)
   
   **Authentication (Required)**
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
   
   **OAuth Providers (Optional)**
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
   - `FACEBOOK_CLIENT_ID` & `FACEBOOK_CLIENT_SECRET`
   - `INSTAGRAM_CLIENT_ID` & `INSTAGRAM_CLIENT_SECRET`
   
   **Google Sheets API (Required for Products)**
   - `GOOGLE_SHEETS_PRIVATE_KEY`
   - `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   
   **Email Notifications (Required)**
   - `EMAIL_SERVER_HOST`
   - `EMAIL_SERVER_PORT`
   - `EMAIL_SERVER_USER`
   - `EMAIL_SERVER_PASSWORD`
   - `EMAIL_FROM`
   
   **SMS Notifications (Optional)**
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`

4. **Database Setup for Production**
   ```bash
   # After setting DATABASE_URL in Vercel, run:
   npx prisma db push
   
   # Or use Vercel CLI with environment variables:
   vercel env pull .env.local
   npx prisma db push
   ```

5. **Redeploy After Environment Variables**
   ```bash
   vercel --prod
   ```

### Alternative Deployment Options

- **Database**: Vercel Postgres, Railway, PlanetScale, or Supabase
- **Hosting**: Netlify, Railway, or any Node.js hosting platform
- **Email**: Gmail SMTP, SendGrid, or Resend
- **SMS**: Twilio (recommended) or any SMS provider

### Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Verify Google Sheets product sync
- [ ] Test order placement and email notifications
- [ ] Check admin panel functionality
- [ ] Test notification system
- [ ] Verify all environment variables are set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
