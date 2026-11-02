# Colorai · Personal Site

Electrical engineering undergrad at Hunan University (Class of 2027), focused on power electronics and hardware. From simulation to silicon.

- Live site: <https://wuzhangyu.github.io/> (GitHub Pages)
- Design language inspired by [verlintas.dev/noir](https://verlintas.dev/noir/) (dark · terminal aesthetic)
- Pure static — no tracking, no cookies, no build step

## Local preview

```bash
cd personal-site
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to GitHub, then in **Settings → Pages** set the source to the `main` branch root.
The site becomes available at `https://<username>.github.io/`.

## Structure

```
index.html         single-page site
assets/style.css   styles (Space Grotesk / Inter / JetBrains Mono + system CJK)
assets/app.js      scroll reveal / email obfuscation / nav highlight
assets/icon.svg    site icon
```
