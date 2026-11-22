# Pet Manager review

A small static page that reports on a code review of a Spring Boot pets API: what was wrong, what changed and why, the decisions taken, what was left out, open product questions, and how the API behaves (endpoints and error codes).

Live page: https://romulofer.github.io/pet-manager-report/

The API itself is not hosted here and its source is not part of this repository. This is only the write-up.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
```

The text lives in `src/review.ts`, the page in `src/Review.tsx`. `npm run check` type-checks and `npm run format` formats.

## Publishing

`.github/workflows/pages.yml` builds the site and publishes it to GitHub Pages on every push to `main`.
