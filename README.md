# ClientForge - Forge Winning Proposals with AI

A modern, professional proposal generator web app that uses Google's Gemini 3 Flash model to generate customized business proposals in seconds.

## Features

### Form Controls
- **Service Type** dropdown (Web Development, Mobile App, UI/UX Design, Consulting, Digital Marketing, AI Development)
- **Client Type** selector (Startup, SMB, Enterprise, Non-Profit, Individual/Freelancer)
- **Budget Range** input field
- **Language selector** (English, Hindi, Hinglish)
- **Additional Details** textarea for custom requirements
- **Generate Proposal** button with loading state

### Output
- Professional proposal card with formatted sections
- Copy to clipboard button with success feedback
- Download as text file option
- Smooth fade-in animations

### Language Support
- **English**: Professional formal business language
- **Hindi**: Hindi with professional business terminology
- **Hinglish**: Natural code-switching between Hindi and English

## Design Features
- **Dark Modern Theme**: Deep navy background with vibrant blue accents
- **Smooth Animations**: Fade-in and scale effects
- **Mobile Responsive**: Optimized for all screen sizes
- **Professional UI**: Clean startup aesthetic with modern styling
- **Gradient Accents**: Subtle background effects

## Tech Stack
- **Next.js 16** with App Router
- **Tailwind CSS v4** with custom design tokens
- **Google Generative AI** (Gemini 1.5 Flash)
- **TypeScript** for type safety
- **Lucide React** icons
- **Fetch API** for HTTP requests

## Setup & Configuration

### 1. Get a Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API key in new project" or use an existing project
3. Copy your API key

### 2. Add API Key to Project

In the v0 project settings:
1. Click the settings icon (top right)
2. Go to **Vars** section
3. Add a new variable:
   - **Key**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: Paste your API key
4. Save changes

The app will automatically use this environment variable for all API calls.

## How It Works

1. **Form Submission**: User fills in the form with service type, client type, budget, language, and additional details
2. **Prompt Generation**: The app creates a detailed prompt with all form inputs and language-specific instructions
3. **Gemini API Call**: Sends request to Google's Gemini 1.5 Flash model using the Generative Language API
4. **Proposal Generation**: Gemini generates a professional, tailored proposal in the selected language
5. **Display & Export**: Shows the proposal in a beautiful card with copy and download options

## API Integration

### Endpoint
- **Route**: `/api/generate-proposal`
- **Method**: `POST`
- **Request Body**:
```json
{
  "serviceType": "web-development",
  "clientType": "startup",
  "priceRange": "10000-25000",
  "language": "English",
  "extraDetails": "Custom requirements"
}
```

### Response
```json
{
  "proposal": "EXECUTIVE SUMMARY\n\nWe are pleased to present..."
}
```

## Gemini 3 Flash Model

**Model ID**: `gemini-3-flash-preview`

### Key Features
- Fast, latest-generation inference for real-time applications
- Supports advanced text generation
- Optimized for cost and speed
- Perfect for business proposal generation

### Configuration
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Output Tokens**: 1024 (keeps proposals concise but complete)
- **Top P**: 0.9 (diverse yet focused responses)

## Prompt Engineering

The app uses carefully crafted prompts that include:
- Service type and client context
- Budget information
- Language-specific instructions
- Proposal structure requirements (Executive Summary, Service Overview, Deliverables, Timeline, Pricing, Why Partner)
- Tone guidelines (human-like, professional, concise, impactful)

## Error Handling

If you see "Gemini API key is not configured":
1. Make sure your API key is added to the project Vars
2. Restart the development server
3. Try generating a proposal again

## Customization

### Modify Service Types
Edit the dropdown options in `/components/proposal-form.tsx`:
```tsx
<option value="your-service">Your Service</option>
```

### Adjust Proposal Style
Modify the prompt in `/app/api/generate-proposal/route.ts` to change:
- Proposal sections
- Tone and formality
- Length and detail level

### Change Language Support
Add new languages in the `languageInstructions` object:
```ts
const languageInstructions = {
  YourLanguage: 'Custom instructions for your language...'
}
```

## Deployment

The app is ready to deploy to Vercel:
1. Make sure your `GOOGLE_GEMINI_API_KEY` is set in project environment variables
2. Push to your GitHub repository
3. Deploy through Vercel dashboard or CLI

## Performance

- Typical proposal generation: 2-4 seconds
- Lightweight request/response cycle using Fetch API
- Optimized for mobile and desktop

## File Structure

```
app/
├── api/
│   └── generate-proposal/
│       └── route.ts          # API endpoint using Gemini API
├── layout.tsx                # Root layout with dark theme
├── page.tsx                  # Main page component
└── globals.css              # Global styles and design tokens

components/
├── proposal-form.tsx         # Form component for proposal inputs
└── proposal-output.tsx       # Display component for generated proposals
```

## Future Enhancements

Potential features to add:
- Save generated proposals to database
- Email proposals directly to clients
- Template customization
- Multi-proposal comparison
- Client management system
- Analytics and usage tracking

## Support

For issues with:
- **Google Gemini API**: Visit [Google AI Documentation](https://ai.google.dev/docs)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
- **Tailwind CSS**: See [Tailwind Documentation](https://tailwindcss.com/docs)
