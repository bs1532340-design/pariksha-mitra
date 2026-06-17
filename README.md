# ClientForge - AI-Powered Proposal Generator

A professional SaaS platform for generating compelling proposals with AI assistance. Support for multiple languages including Hindi, English, and Hinglish.

## Features

- **AI-Powered Generation**: Create professional proposals in seconds using advanced AI
- **Multi-Language Support**: Generate proposals in Hindi, English, and Hinglish
- **Professional Templates**: Pre-designed templates for various project types
- **Export Options**: Download as PDF, copy to clipboard, or share directly
- **User Dashboard**: Track proposal history and usage statistics
- **Subscription Plans**: Free tier with 3 proposals/day, Pro plan with unlimited proposals
- **Secure Authentication**: NextAuth.js with Google OAuth and email/password login
- **Payment Integration**: Razorpay integration for Pro plan subscription

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Prisma adapter
- **AI**: Google Gemini API
- **Payments**: Razorpay
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Google OAuth credentials
- Google Gemini API key
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/clientforge.git
   cd clientforge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and fill in your credentials:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/clientforge
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```

4. **Set up the database**
   ```bash
   pnpm prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
clientforge/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Protected dashboard
│   ├── pricing/          # Pricing page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── terms/            # Terms of service
│   ├── privacy/          # Privacy policy
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── navigation.tsx    # Main navigation
│   ├── footer.tsx        # Footer component
│   ├── proposal-form.tsx # Proposal generation form
│   └── ui/               # UI components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── styles/               # Global styles
```

## API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth routes

### Dashboard
- `GET /api/dashboard/stats` - User statistics

### Billing
- `POST /api/billing/create-order` - Create payment order
- `POST /api/billing/verify-payment` - Verify payment

### Content
- `POST /api/generate-proposal` - Generate proposal with AI

## Database Schema

### User
- id, email, name, password, phone, image
- plan (free/pro), emailVerified, createdAt, updatedAt

### Proposal
- id, userId, title, content, clientName, serviceType
- createdAt, updatedAt

### Subscription
- id, userId, plan, status, currentPeriodStart, currentPeriodEnd
- razorpaySubscriptionId, createdAt, updatedAt

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
vercel deploy
```

### Environment Variables on Vercel

Set all the variables from `.env.example` in your Vercel project settings.

## Pricing Plans

### Free Plan
- 3 proposals per day
- Basic templates
- Copy & download proposals
- Hindi + English support

### Pro Plan ($15/month)
- Unlimited proposals
- Premium templates
- PDF export with branding
- Hindi + English + Hinglish
- Priority support
- Advanced analytics
- Team collaboration

## Development

### Database Migrations

```bash
# Create a new migration
pnpm prisma migrate dev --name <migration_name>

# View database
pnpm prisma studio
```

### Type Generation

```bash
pnpm prisma generate
```

### Linting

```bash
pnpm lint
```

### Building

```bash
pnpm build
pnpm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@getclientforge.xyz or create an issue in the repository.

## Roadmap

- [ ] Mobile app
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Custom branding options
- [ ] API for third-party integrations
- [ ] Webhook support
- [ ] More language support

## Changelog

### v1.0.0 (Initial Release)
- User authentication with NextAuth.js
- Proposal generation with AI
- Multi-language support
- Dashboard with statistics
- Subscription management
- Razorpay payment integration

