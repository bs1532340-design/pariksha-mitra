# ClientForge Deployment Guide

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] Linting passes: `pnpm lint`
- [ ] Build completes successfully: `pnpm build`

### 2. Environment Variables
Required environment variables for production:

```env
# Database (use production PostgreSQL)
DATABASE_URL=postgresql://prod_user:prod_password@prod_host:5432/clientforge

# NextAuth
NEXTAUTH_URL=https://getclientforge.xyz
NEXTAUTH_SECRET=<strong-random-secret-from-openssl>

# Google OAuth
GOOGLE_CLIENT_ID=<your-production-client-id>
GOOGLE_CLIENT_SECRET=<your-production-secret>

# AI/Gemini
GOOGLE_GENERATIVE_AI_API_KEY=<your-api-key>

# Razorpay (Production Keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=<production-key>
RAZORPAY_KEY_SECRET=<production-secret>

# App Config
NEXT_PUBLIC_APP_URL=https://getclientforge.xyz
```

### 3. Database Setup
- [ ] Production PostgreSQL database created
- [ ] Database connection tested
- [ ] Prisma migrations run: `pnpm prisma migrate deploy`
- [ ] Database backup configured

### 4. Third-Party Services
- [ ] Google OAuth credentials created for production domain
- [ ] Google Gemini API key generated and tested
- [ ] Razorpay account set up with production keys
- [ ] Email service configured (for transactional emails)

### 5. Security
- [ ] NEXTAUTH_SECRET is strong (generate with: `openssl rand -base64 32`)
- [ ] All API keys secured in environment variables
- [ ] SSL/TLS certificate configured
- [ ] CORS policies reviewed
- [ ] Rate limiting configured if needed

### 6. Domain & DNS
- [ ] Domain registered (getclientforge.xyz)
- [ ] DNS records configured
- [ ] SSL certificate provisioned
- [ ] Domain linked to Vercel project

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Connect GitHub Repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Add Environment Variables to Vercel**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

   Or push to main branch and Vercel will auto-deploy

4. **Verify Deployment**
   - Check deployment status in Vercel dashboard
   - Test application at production URL
   - Review build logs for errors

### Option 2: Deploy to Other Platforms

#### AWS (using EC2 + RDS)
1. Create EC2 instance (Node.js runtime)
2. Set up RDS PostgreSQL database
3. Configure environment variables
4. Build and run: `pnpm build && pnpm start`
5. Set up reverse proxy with Nginx/Apache

#### DigitalOcean (using App Platform)
1. Connect GitHub repository
2. Configure build and runtime settings
3. Add environment variables
4. Deploy app

## Post-Deployment Testing

### 1. Functional Testing
- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] Responsive design on mobile
- [ ] Dark theme displays properly

### 2. Authentication Testing
- [ ] Signup flow works end-to-end
- [ ] Email/password login works
- [ ] Google OAuth works
- [ ] Password reset flow works
- [ ] Session persists on refresh
- [ ] Logout clears session

### 3. Dashboard Testing
- [ ] Login redirects to dashboard
- [ ] User info displays correctly
- [ ] Stats API returns correct data
- [ ] Sidebar navigation works
- [ ] Profile/Settings pages load

### 4. Proposal Generation
- [ ] Proposal form validates inputs
- [ ] Generate button works
- [ ] API call completes successfully
- [ ] Proposal displays correctly
- [ ] Copy to clipboard works
- [ ] Download works

### 5. Billing Testing
- [ ] Pricing page displays correctly
- [ ] Upgrade button visible for free users
- [ ] Razorpay integration loads
- [ ] Payment flow completes
- [ ] Subscription updates in database

### 6. Performance Testing
- [ ] Page load time < 3 seconds
- [ ] First Contentful Paint < 1.5 seconds
- [ ] Time to Interactive < 2.5 seconds
- [ ] No layout shifts (CLS < 0.1)

### 7. SEO Verification
- [ ] Metadata displays in browser title
- [ ] Open Graph tags present
- [ ] Robots.txt accessible
- [ ] Sitemap.xml accessible
- [ ] Schema.org markup present

### 8. Security Testing
- [ ] HTTPS enforced
- [ ] Sensitive data not exposed in client code
- [ ] API routes require authentication where needed
- [ ] CSRF protection enabled
- [ ] XSS protection headers set

## Monitoring & Maintenance

### Set Up Monitoring
1. **Error Tracking**: Configure Sentry for error monitoring
2. **Analytics**: Set up Google Analytics
3. **Performance**: Enable Vercel Analytics
4. **Uptime**: Configure uptime monitoring

### Regular Maintenance
- [ ] Weekly: Check error logs
- [ ] Monthly: Review analytics and usage
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance optimization review

## Scaling Considerations

As users grow:
1. **Database**: Consider read replicas or connection pooling
2. **Cache**: Implement Redis for session caching
3. **CDN**: Enable Vercel's Edge caching
4. **Storage**: Use Vercel Blob for file storage
5. **Email**: Set up email service for transactional emails

## Troubleshooting Common Issues

### Build Fails
- Check Node.js version: `node --version` (needs 18+)
- Clear cache: `pnpm install --force`
- Check for TypeScript errors: `pnpm type-check`

### Database Connection Error
- Verify DATABASE_URL is correct
- Check database is running and accessible
- Ensure firewall allows connection
- Run `pnpm prisma db push` to initialize schema

### Authentication Not Working
- Verify NEXTAUTH_SECRET is set
- Check Google OAuth credentials are correct
- Verify callback URLs match in Google Console
- Check NEXTAUTH_URL matches deployment domain

### Payments Not Working
- Verify Razorpay keys are correct
- Check callback URLs in Razorpay dashboard
- Test with Razorpay test keys first
- Verify webhook URLs are accessible

## Rollback Procedure

If deployment has issues:

1. **Quick Rollback on Vercel**
   ```bash
   vercel rollback
   ```

2. **Manual Rollback**
   - Go to Vercel deployments
   - Click on previous working deployment
   - Promote to production

3. **Database Rollback**
   ```bash
   pnpm prisma migrate resolve --rolled-back <migration_name>
   ```

## Getting Help

- **Documentation**: See README.md
- **Issues**: Check GitHub issues
- **Support**: Email support@getclientforge.xyz
- **Community**: Discussions on GitHub
