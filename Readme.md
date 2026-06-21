# YesHub

A movies & series discovery app built with vanilla JavaScript and the TMDB API. Browse trending titles, search across movies and shows, watch trailers, and save favorites — all without a framework.

🔗 **Live demo:** https://movies-series-eight.vercel.app/

## Features

**Hero slider**
Showcases this week's trending movies and series in a fade-transition slider (Swiper.js), pulling live data from TMDB's trending endpoint.

**New movies & series**
Two card grids — Now Playing movies and On the Air series — each starting at 6 cards. "Show More" reveals more on the first click, then redirects to the full search page on the second.

**Live search**
Type in the search bar and a debounced (300ms) dropdown shows up to 5 quick results as you type. Press Enter or click search to land on a dedicated results page powered by TMDB's multi-search endpoint.

**Detail pages**
Clicking any card, hero slide, or search result opens a detail page with backdrop, poster, genres, rating, runtime/seasons, overview, top cast, and similar titles — fetched dynamically based on the movie/series ID and type passed through the URL.

**Trailer popups**
"Watch Trailer" opens a SweetAlert2 modal with an embedded YouTube trailer, pulled from TMDB's video data. Shows a friendly fallback message if no trailer is available.

**Favorites**
Heart icons on cards, hero slides, and detail pages save titles to `localStorage`. The Favorites page reads and renders them as full cards, and instantly removes a title when un-favorited — no page reload.

**Login page**
A styled sign-in page (UI only — no backend authentication yet).

## Built With

- **Vanilla JavaScript (ES6+)** — classes, async/await, Promises, DOM manipulation
- **Tailwind CSS v4**
- **TMDB API** — trending, search, movie/TV details, credits, videos
- **Swiper.js** — hero slider
- **SweetAlert2** — trailer modal popups (loaded as an ES module)
- **localStorage** — favorites persistence
- **Vercel** — static hosting & deployment

## Architecture Highlights

- **Class-based card system** — `MediaCard` is the base class handling rendering logic; `MovieCard` and `SerieCard` extend it and only handle pulling the correct fields from TMDB's slightly different movie/TV response shapes. Each card has a full `render()` for grids and a compact `renderCompact()` for the search dropdown.
- **Cross-page data flow** — since this is a multi-page app with full page reloads (not a SPA), data can't be passed directly in memory between pages. Instead, IDs and types are passed through URL query parameters (`detail.html?id=123&type=movie`) and re-fetched on the destination page.
- **Optimized image loading** — three separate TMDB image sizes (`w1280` for backdrops, `w342` for posters, `w185` for cast photos) to avoid loading oversized images for small UI elements.
- **Shared logic in `main.js`** — header/footer injection, the trailer popup, and the favorites toggle all live here since they're used across multiple pages.

## Project Structure
api.js        → all TMDB fetch functions
cards.js      → MediaCard / MovieCard / SerieCard classes
main.js       → header & footer injection, search bar, trailer popup, favorites logic
home.js       → hero slider, new movies/series grids
detail.js     → movie/series detail page rendering
search.js     → search results page
favorite.js   → favorites page
*.html        → one HTML file per page
## Known Limitations

- Search results are currently capped at TMDB's default 20 per page — pagination/infinite scroll not yet implemented
- Login page is UI only; no real authentication
- Categories dropdown links are placeholders

## Running Locally

This project has no build step beyond compiling Tailwind CSS.

```bash
git clone https://github.com/ilyesmezghiche1/movies-series.git
cd movies-series
npm install
npx tailwindcss -i src/input.css -o src/output.css --watch
```

Then open `home.html` with a local server (e.g. VS Code's Live Server extension).

---

Built as a learning project to practice vanilla JS architecture, async data flow, and working with a real-world API end to end.
