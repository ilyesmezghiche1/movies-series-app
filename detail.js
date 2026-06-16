async function loadDetailPage() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  let type = params.get('type');

  let data;
  if (type === 'movie') {
    data = await getMovieMoreDetails(id);
  } else {
    data = await getTvMoreDetails(id);
  }

  if (!data) return;

  let title = type === 'movie' ? data.title : data.name;
  let date = type === 'movie' ? data.release_date : data.first_air_date;
  let year = date?.split('-')[0];
  let genres = data.genres?.map(g => g.name).join(', ');
  let duration = type === 'movie'
    ? `${data.runtime} min`
    : `${data.number_of_seasons} Seasons`;

  renderHero(data, type, title, year, genres, duration);
  renderCast(data);
  renderSimilar(data, type);
}

function renderHero(data, type, title, year, genres, duration) {
  let section1 = document.querySelector("#section-1");

  section1.innerHTML = `
    <div id="backdrop-image" style="background-image:url('${IMG_URL}${data.backdrop_path}'); background-size: cover; background-position: center;" class="h-[550px] w-full absolute top-0 left-0 z-0">
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10"></div>

    <div class="relative z-20 flex gap-10 px-8 pt-72 pb-10">
      <div id="poster" style="background-image:url('${POSTER_IMG_URL}${data.poster_path}'); background-size: cover; background-position: center;" class="w-[260px] h-[380px] rounded-xl flex-shrink-0 border border-white/10 shadow-2xl">
      </div>

      <div class="flex flex-col gap-4 justify-end max-w-3xl">
        <div id="tags-container" class="flex gap-2">
          <span class="${type === 'movie' ? 'bg-rose-500/85' : 'bg-violet-500/85'} text-white text-xs px-3 py-1 rounded-full font-bold">${type === 'movie' ? 'Movie' : 'Series'}</span>
          <span class="bg-yellow-400/85 text-black text-xs px-3 py-1 rounded-full font-bold">⭐ ${data.vote_average?.toFixed(1)}</span>
          <span class="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-bold">${duration}</span>
        </div>

        <div id="genres-overview-container" class="flex flex-col gap-3">
          <span class="text-white text-5xl font-black font-heading">${title}</span>
          <span class="text-gray-400 text-base font-semibold">${genres} | ${year}</span>
          <p class="text-white/80 text-base leading-relaxed max-w-2xl">${data.overview}</p>
        </div>

        <div class="flex gap-3 mt-2">
          <button class="btn-trailer bg-rose-500 text-white px-7 py-3 rounded-full text-sm font-bold">▶ Watch Trailer</button>
          <button class="heart-btn bg-white/10 border border-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center text-lg">♡</button>
        </div>
      </div>
    </div>
  `;
}

function renderCast(data) {
  let section2 = document.querySelector("#section-2");
  let cast = data.credits?.cast?.slice(0, 8) || [];

  if (cast.length === 0) {
    section2.innerHTML = '';
    return;
  }

  let castCards = cast.map(actor => `
    <div class="flex flex-col items-center gap-2 w-24 flex-shrink-0">
      <div style="background-image:url('${actor.profile_path ? PROFILE_IMG_URL + actor.profile_path : ''}'); background-size: cover; background-position: center;" class="w-20 h-20 rounded-full bg-white/10 border border-white/10"></div>
      <span class="text-white text-xs font-bold text-center">${actor.name}</span>
      <span class="text-gray-400 text-[10px] text-center">${actor.character}</span>
    </div>
  `).join('');

  section2.innerHTML = `
    <h2 class="text-white text-xl font-black font-heading px-8 mb-6">Top Cast</h2>
    <div class="flex gap-5 px-8 overflow-x-auto pb-4">
      ${castCards}
    </div>
  `;
}

function renderSimilar(data, type) {
  let section3 = document.querySelector("#section-3");
  let similar = data.similar?.results?.slice(0, 6) || [];

  if (similar.length === 0) {
    section3.innerHTML = '';
    return;
  }

  let grid = document.createElement("div");
  grid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-8";

  similar.forEach(item => {
    let card = type === 'movie' ? new MovieCard(item) : new SerieCard(item);
    grid.appendChild(card.render());
  });

  section3.innerHTML = `<h2 class="text-white text-xl font-black font-heading px-8 mb-6">Similar Titles</h2>`;
  section3.appendChild(grid);
}

loadDetailPage();
