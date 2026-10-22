# Portfolio (React + Vite): run, customise, deploy

Built with React, Vite, framer-motion and lucide-react. Free to host on Vercel.

## Run it on your PC
```bash
npm install
npm run dev        # opens http://localhost:5176
```
Needs Node 18 or newer. On an E:/USB drive, if Vite crashes with `UNKNOWN: stat`, run `set VITE_POLL=1 && npm run dev` (Windows CMD).

## Where to change things
| What | File |
|---|---|
| All text, links, projects, skills, timeline | `src/data.js` |
| Colours (change `--accent`, `--bg`) | top of `src/styles.css` |
| Photo and screenshots | `public/assets/` (the photo is a transparent cut-out so it blends into the page) |
| Resume download | `public/Vigneswaran-V-Resume.pdf` (keep the same file name) |

Project buttons with an empty `live` or `code` value in `src/data.js` are hidden. Fill them in when CareSlot is deployed and when you have the GitHub links.

## Deploy (about 10 minutes)
**1. GitHub**
- github.com → New repository → `portfolio` → Public → no README → Create.
```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/vigneswaran7373/portfolio.git
git push -u origin main
```
(`node_modules` and `dist` are ignored automatically.)

**2. Vercel**
- vercel.com → Add New → Project → import `portfolio`.
- Framework Preset shows **Vite** automatically. Build command `npm run build`, output `dist`. No environment variables.
- Deploy. You get `https://portfolio-xxxx.vercel.app`.

**3. Nicer address**
- Vercel → project → Settings → Domains → rename the `.vercel.app` address, for example `vigneswaran.vercel.app` if it is free.

**4. Use the link**
Put it on your resume header, LinkedIn (Contact info and Featured) and your GitHub profile. Every `git push` redeploys the site automatically.

## Updating later
Edit `src/data.js` (or an image), then `git add .`, `git commit -m "Update"`, `git push`.

## Email buttons
The mail icon, the big email address and the "Email me" button open a small menu: Gmail, Outlook, your default mail app, or copy the address. This works even on computers with no mail app set up.
