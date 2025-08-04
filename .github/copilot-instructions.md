# Willow Trellis Farms - Next.js 14 Farm Pickup Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js 14 TypeScript application called "Willow Trellis Farms" for farm-fresh produce pickup orders. The application includes:

- Authentication with NextAuth.js (email/password + OAuth)
- PostgreSQL database with Prisma ORM
- Google Sheets API integration for product data
- Shopping cart with context state management
- Pickup order management with email/SMS notifications
- Admin panel for order management
- Farm-inspired UI with earth tones and rustic design

## Key Technologies
- Next.js 14 with App Router
- TypeScript
- Prisma ORM with PostgreSQL
- NextAuth.js for authentication
- Google Sheets API
- Tailwind CSS with custom farm-inspired theme
- React Context for state management
- Nodemailer for emails
- Twilio for SMS

## Architecture Notes
- Use server components where possible
- API routes for backend logic
- Middleware for authentication
- Environment variables for all secrets
- Type-safe database operations with Prisma
- Responsive design with farm aesthetic
- Pickup-only model (no shipping/delivery)

## Design Philosophy
- Earth tones (greens, browns, warm colors)
- Farm-inspired typography and imagery
- Rustic, natural feel
- Emphasis on local, fresh produce
- Community-focused messaging
