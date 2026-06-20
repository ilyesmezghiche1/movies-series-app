async function loadSearchPage() {
  let params = new URLSearchParams(window.location.search);
  let query = params.get("query");
  let type = params.get("type");
  console.log("query:", query);


  let results;

  if (query === "now_playing") {
    results = await getNowPlayingMovies();
  } else if (query === "on_the_air") {
    results = await getOnAirSeries();
  } else {
    results = await getSearch(query);
  }
  console.log("results:", results)
  renderSearchResults(results, type);
}

function renderSearchResults(results, type) {
  let grid = document.querySelector("#search-grid");
  grid.innerHTML = '';

  if (!results || results.length === 0) {
    grid.innerHTML = `<p class="text-white/50 text-center py-20">No results found</p>`;
    return;
  }

  results.forEach(item => {
    let itemType = item.media_type || type;
    let card = itemType === "movie" ? new MovieCard(item) : new SerieCard(item);
    grid.appendChild(card.render());
  });
}

loadSearchPage();
