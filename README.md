# Rushit Shah - Artist Portfolio

A dynamic, modern portfolio website for abstract artist Rushit Shah, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Gallery Integration** - Embedded ArtworkArchive gallery for seamless artwork display
- 🎨 **Modern Design** - Clean, sophisticated design inspired by contemporary art portfolio platforms
- 🎬 **Rich Animations** - Smooth interactions with Framer Motion
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🔍 **SEO Optimized** - Metadata, Open Graph tags, and proper heading hierarchy
- ⚡ **High Performance** - Next.js server-side rendering and optimization
- 📧 **Contact Forms** - Email integration for inquiries and commissions
- 🌙 **Dark Theme** - Professional dark aesthetic with custom color palette

## Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **API:** ArtworkArchive integration
- **Email:** Nodemailer
- **Deployment:** Vercel

## Project Structure

```
rushit-shah-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts           # Contact form API
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── gallery/
│   │   ├── page.tsx               # Gallery grid
│   │   └── [id]/
│   │       └── page.tsx           # Artwork detail page
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   ├── Navigation.tsx             # Top navigation
│   ├── Footer.tsx                 # Footer
│   ├── Hero.tsx                   # Hero section
│   └── Gallery.tsx                # Gallery grid component
├── lib/
│   ├── api/
│   │   └── artworkArchive.ts      # API integration
│   └── types.ts                   # TypeScript types
├── public/                        # Static assets
├── .env.example                   # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager
- ArtworkArchive account with API access
- Email service credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional)**
   ```bash
   cp .env.example .env.local
   ```
   Only needed if you want email notifications from the contact form. Gallery works without any configuration!

   ```env
   # Email Configuration (for contact form)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   CONTACT_EMAIL=rs@rushitshah.com
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

## Configuration

### Gallery

The gallery automatically loads your ArtworkArchive collection via embedded script. No configuration needed! The embed is served from: `https://www.artworkarchive.com/profile/rushitshah/embed_js.js`

### Email Configuration

#### Option 1: Gmail (Recommended)
1. Enable 2-factor authentication in Gmail
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in `EMAIL_PASSWORD`

#### Option 2: SendGrid
1. Create a SendGrid account
2. Generate an API key
3. Use these settings:
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your_sendgrid_api_key
   ```

#### Option 3: Custom SMTP
Use your email provider's SMTP settings

### Social Media Links

Update social media URLs in:
- `components/Navigation.tsx` (desktop nav)
- `components/Footer.tsx` (footer)
- `app/contact/page.tsx` (contact page)

## Usage

### Adding an Artist Photo

1. Place your photo in `public/images/`
2. Update `app/about/page.tsx` to use your image:
   ```tsx
   <Image
     src="/images/your-photo.jpg"
     alt="Rushit Shah"
     fill
     className="object-cover"
   />
   ```

### Customizing Colors

Edit the color palette in `tailwind.config.js`:

```js
colors: {
  primary: '#1a1a1a',
  secondary: '#f5f5f5',
  accent: '#d4a574',  // Change this
  'dark-bg': '#0f0f0f',
}
```

### Customizing Typography

Fonts are loaded from Google Fonts in `app/globals.css`:
- Serif: Playfair Display
- Sans-serif: Outfit

Change these in `@import` statements.

## Building & Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-repo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Click "Deploy"

3. **Configure Custom Domain**
   - Go to project settings in Vercel
   - Add custom domain: `www.rushitshah.com`
   - Follow DNS configuration instructions

## Performance Optimization

- **Image Optimization:** Using Next.js Image component with lazy loading
- **Code Splitting:** Automatic chunk splitting for faster page loads
- **SSR/SSG:** Server-side rendering for better SEO
- **Caching:** ISR (Incremental Static Regeneration) for gallery

## SEO

- Proper meta tags for all pages
- Open Graph tags for social sharing
- Sitemap auto-generation
- Schema markup for creative works
- Mobile-friendly design

## Testing

Run Lighthouse audit:
```bash
npm run build
npm start
# Open DevTools → Lighthouse
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Troubleshooting

### Gallery not loading
- Check that JavaScript is enabled in your browser
- Gallery loads from: `https://www.artworkarchive.com/profile/rushitshah/embed_js.js`
- If embed doesn't appear, verify ArtworkArchive account is public
- Check browser console (F12) for any errors

### Emails not sending
- Verify SMTP credentials
- Check email service limits
- Test connection with mail provider

### Styling issues
- Clear `.next` folder and rebuild
- Check Tailwind config
- Verify CSS imports

## Support & Documentation

- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion
- **ArtworkArchive API:** https://www.artworkarchive.com/api-docs

## License

© 2024 Rushit Shah. All rights reserved.

## Maintenance

### Regular Updates
```bash
npm update
npm audit
```

### Backup ArtworkArchive
Regularly export your inventory from ArtworkArchive as backup.

---

**Made with ❤️ for Rushit Shah's artistic vision.**
