# Quick Start - Get Your Portfolio Live in 5 Minutes

## ⚡ Super Simple Setup

Your portfolio is **ready to use right now**. No API keys needed!

### Step 1: Install
```bash
cd /Users/rushitshah/rushit-shah-portfolio
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: View
Open: http://localhost:3000

That's it! 🎉

---

## ✅ What's Already Set Up

- ✅ Instagram: `rushitshah08`
- ✅ LinkedIn: `www.linkedin.com/in/rushitshah`
- ✅ Contact Email: `rs@rushitshah.com`
- ✅ Gallery: Connected to your ArtworkArchive embed
- ✅ Dark theme with professional design
- ✅ Mobile responsive

---

## 🚀 Deploy to Vercel (Free!)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "My artist portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio
git push -u origin main
```

### Step 2: Deploy
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy" (takes 1 minute)

### Step 3: Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add `www.rushitshah.com`
3. Follow DNS instructions from your registrar

**Your site is live!** 🌐

---

## 📧 Optional: Email from Contact Form

The contact form works without email setup, but submissions won't send anywhere.

If you want emails:

1. Create `.env.local` with:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
CONTACT_EMAIL=rs@rushitshah.com
```

2. Get Gmail App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Generate one for Mail/Windows
   - Use that as `EMAIL_PASSWORD`

---

## 📸 Add Your Artist Photo (Optional)

1. Save image to: `public/images/artist-photo.jpg`
2. Edit `app/about/page.tsx` (~line 30):
   ```tsx
   <Image
     src="/images/artist-photo.jpg"
     alt="Rushit Shah"
     fill
     className="object-cover"
   />
   ```

---

## 🎨 Customize Colors

Edit `tailwind.config.js` line 13:

```js
colors: {
  accent: '#d4a574',  // Change this to your preferred color
}
```

---

## 📚 Need More Help?

- `README.md` - Full technical documentation
- `SETUP.md` - Detailed setup guide
- Check browser DevTools (F12) for errors

---

## 🎯 What's Inside

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Hero + Featured works preview |
| Gallery | `/gallery` | Full ArtworkArchive collection |
| About | `/about` | Your bio and artist statement |
| Contact | `/contact` | Inquiry form |

---

**That's all you need! Your portfolio is production-ready.** ✨

Let me know if you run into any issues!
