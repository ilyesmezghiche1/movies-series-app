async function loadHero() {
  let movies = await getTrending();
  let heroSlides = document.querySelector("#heroSlides");

  movies.slice(0, 8).forEach((item) => {
    let slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.dataset.id = item.id;
    slide.dataset.type = item.media_type;
    slide.innerHTML = `
      <div class="absolute inset-0" style="background-image: url('${IMG_URL}${item.backdrop_path}'); background-size: cover; background-position: center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      <div class="content">
        <div class="hero-glass">
          <button class="heart-btn">♡</button>
          <div class="flex gap-3 mb-4">
            <span class="hero-badge-type">${item.media_type === "movie" ? "🎬 Movie" : "📺 Series"}</span>
            <span class="hero-badge-rating">⭐ ${item.vote_average?.toFixed(1)}</span>
          </div>
          <h1 class="hero-title">${item.title || item.name}</h1>
          <p class="hero-overview">${item.overview}</p>
          <div class="flex gap-4">
            <button class="btn-trailer">▶ Watch Trailer</button>
          </div>
        </div>
      </div>
    `;

    slide.addEventListener("click", () => {
      window.location.href = `detail.html?id=${item.id}&type=${item.media_type}`;
    });

    slide.querySelector(".heart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("toggle favorite", item.id, item.media_type);
    });

    heroSlides.appendChild(slide);
  });

  new Swiper(".swiper", {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    effect: "fade",
    fadeEffect: { crossFade: true },
  });
}

async function loadNewMovies() {
  let movies = await getNowPlayingMovies();
  let section = document.querySelector("#new-movies");
  let grid = section.querySelector(".cards-grid");
  let shown = 6;
  let clicked = 0;

  function renderCards() {
    grid.innerHTML = "";
    movies.slice(0, shown).forEach((item) => {
      grid.appendChild(new MovieCard(item).render());
    });
  }

  renderCards();

  section.querySelector(".show-more-btn").addEventListener("click", () => {
    clicked++;
    if (clicked === 1) {
      shown += 6;
      renderCards();
    } else {
      window.location.href = `search.html?query=now_playing&type=movie`;
    }
  });
}

async function loadNewSeries() {
  let series = await getOnAirSeries();
  let section = document.querySelector("#new-series");
  let grid = section.querySelector(".cards-grid");
  let shown = 6;
  let clicked = 0;

  function renderCards() {
    grid.innerHTML = "";
    series.slice(0, shown).forEach((item) => {
      grid.appendChild(new SerieCard(item).render());
    });
  }

  renderCards();

  section.querySelector(".show-more-btn").addEventListener("click", () => {
    clicked++;
    if (clicked === 1) {
      shown += 6;
      renderCards();
    } else {
      window.location.href = `search.html?query=on_the_air&type=tv`;
    }
  });
}

loadHero();
loadNewMovies();
loadNewSeries();
