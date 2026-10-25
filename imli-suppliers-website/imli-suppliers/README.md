# Imli Suppliers — Website

Plain HTML, CSS and JavaScript. No build step, no npm install. Vercel serves it as it is.

## Folder

```
index.html, about.html, products.html, product.html, wholesale.html,
quality.html, gallery.html, blog.html, faq.html, contact.html, 404.html
assets/css/style.css   all styling
assets/js/main.js      menu, filters, calculator, form, gallery
assets/img/            photos, logo, social share image
vercel.json            clean URLs (/about instead of /about.html), caching
robots.txt, sitemap.xml
```

## Deploy on Vercel (GitHub method)

1. Create a new repository on GitHub, e.g. `imli-suppliers`.
2. Upload everything inside this folder (not the folder itself) and commit.
3. On vercel.com: Add New → Project → import the repository.
4. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
5. Click Deploy. The site goes live at `https://<project-name>.vercel.app`.

Every change pushed to GitHub redeploys the site automatically.

## Deploy with Vercel CLI (no GitHub)

```
npm i -g vercel
cd imli-site
vercel          # first time: log in and answer the setup questions
vercel --prod   # publish to the live address
```

## After going live — change these

Search and replace across all files:

| Find | Replace with |
| --- | --- |
| `https://imli-suppliers.vercel.app` | the real live address (domain) |
| `+91 90000 00000` and `919000000000` | client's phone / WhatsApp |
| `sales@imlisuppliers.com` | client's email |
| `Naya Bazar, Khari Baoli, Delhi 110006` | client's address |

Also update "since 2009", "2,400+ tonnes" and the FSSAI / GSTIN rows on quality.html with real details.

## Make the quote form send email

The form currently shows a thank-you message only. To receive enquiries:

1. Create a free form at web3forms.com (or formspree.io) with the client's email.
2. Send the access key to your developer, or add a `fetch()` call in the form submit handler in `assets/js/main.js`.

## Connect the client's domain

Vercel → Project → Settings → Domains → add `imlisuppliers.com` → copy the DNS records Vercel shows into the domain provider (GoDaddy / Hostinger) DNS settings.
