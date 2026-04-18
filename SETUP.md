# Quick Setup Guide - Rushit Shah Portfolio

## 3-Minute Setup

### Step 1: Install & Start
```bash
npm install
npm run dev
```
Open http://localhost:3000 - you'll see the site!

### Step 2: Configure Email (Optional but Recommended)

Create `.env.local` in the root directory:

```env
# Email (for contact form - uses Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@rushitshah.com
CONTACT_EMAIL=rs@rushitshah.com
SEND_CONFIRMATION_EMAIL=true
```

### Step 3: Get Gmail App Password (If Using Email)

**Gmail Setup:**
1. Enable 2FA at https://myaccount.google.com/security
2. Generate App Password at https://myaccount.google.com/apppasswords
3. Use the generated password in `EMAIL_PASSWORD`

### Step 4: Update Your Information (Already Done!)

✅ **Social media links are already updated:**
- Instagram: rushitshah08
- LinkedIn: www.linkedin.com/in/rushitshah
- Twitter: Removed (not in use)

✅ **Contact email already set to:**
- rs@rushitshah.com

Edit these files if you need to make changes:

1. **`components/Navigation.tsx`** - Social links in header
2. **`components/Footer.tsx`** - Social links in footer
3. **`app/about/page.tsx`** - Artist bio and info
4. **`app/contact/page.tsx`** - Contact email

### Step 5: Add Your Artist Photo (Optional)

1. Save your headshot to: `public/images/artist-photo.jpg`
2. Update `app/about/page.tsx` to replace the placeholder:
   ```tsx
   <Image
     src="/images/artist-photo.jpg"  // ← Update this
     alt="Rushit Shah"
     fill
     className="object-cover"
   />
   ```

## Verify Everything Works

1. **Gallery loads artworks:**
   - Go to http://localhost:3000/gallery
   - You should see your ArtworkArchive collection

2. **Contact form works (if email configured):**
   - Go to http://localhost:3000/contact
   - Send a test email
   - Check your inbox

3. **Navigation works:**
   - Click all navigation links
   - Social media icons link to Instagram & LinkedIn
   - Test mobile menu (shrink browser window)

## Deploy to Vercel (Free!)

```bash
# 1. Create GitHub repo
git init
git add .
git commit -m "Initial portfolio site"
git remote add origin https://github.com/YOUR_USERNAME/rushit-shah-portfolio
git push -u origin main

# 2. Go to https://vercel.com
# 3. Click "New Project" and import your GitHub repo
# 4. Add environment variables from .env.local
# 5. Deploy!

# 6. Custom Domain
# In Vercel dashboard:
# - Settings → Domains
# - Add "rushitshah.com"
# - Update DNS settings with your registrar
```

## Customization

### Change Colors

Edit `tailwind.config.js` lines 10-14:

```js
colors: {
  accent: '#d4a574',  // ← Gold/tan color
  primary: '#1a1a1a', // ← Near black
  // ... others
}
```

### Change Fonts

Edit `app/globals.css` line 1:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_SERIF:wght@400;600&family=YOUR_SANS:wght@300;600&display=swap');
```

### Adjust Layout

All pages are in `app/` directory:
- `app/page.tsx` - Home (Hero + Gallery preview)
- `app/gallery/page.tsx` - Full gallery
- `app/about/page.tsx` - About section
- `app/contact/page.tsx` - Contact form

## Common Issues

**"Gallery shows 'No artworks available'"**
- Check API key in `.env.local`
- Verify ArtworkArchive account has published works
- Check browser console for errors

**"Contact form won't send emails"**
- Verify Gmail App Password (not regular password!)
- Check EMAIL_PORT is 587 (not 465)
- Test with simple text message first

**"Images not loading"**
- Make sure `unoptimized` is in Image components for external URLs
- Check ArtworkArchive image URLs are correct

## Need Help?

- Check `README.md` for detailed docs
- See `.env.example` for all available options
- Check browser DevTools Console for errors (F12)

## Next Steps

1. ✅ Verify everything works locally
2. ✅ Deploy to Vercel
3. ✅ Point domain to Vercel (if using custom domain)
4. ✅ Monitor analytics
5. ✅ Update artwork regularly in ArtworkArchive

## Performance Tips

- Images load lazily - first visit might be slow
- Gallery caches artworks - refresh browser if you add new works
- Lighthouse score should be 90+ (check with DevTools)

---

**You're all set! Your portfolio is ready to show the world your art.** 🎨
