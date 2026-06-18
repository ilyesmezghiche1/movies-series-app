function loadFavorites() {
  let section = document.querySelector("#favorites-grid");
  let favorites = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let item = JSON.parse(localStorage.getItem(key));
    favorites.push(item);
  }

  if (favorites.length === 0) {
    section.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <span class="text-6xl mb-4">💔</span>
        <h2 class="text-white text-2xl font-black font-heading mb-2">No favorites yet</h2>
        <p class="text-white/50 text-sm">Click the heart on any movie or series to save it here</p>
      </div>
    `;
    return;
  }

  let grid = document.createElement("div");
  grid.className =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-8";

  favorites.forEach((item) => {
    let card =
      item.type === "movie" ? new MovieCard(item) : new SerieCard(item);
    grid.appendChild(card.render());
  });

  section.appendChild(grid);

  grid.querySelectorAll(".card-heart-btn").forEach((btn) => {
    let id = btn.dataset.id;
    btn.classList.add("active");
    btn.textContent = "♥";
    btn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      localStorage.removeItem(id);
      section.innerHTML = "";
      loadFavorites();
    });
  });
}

loadFavorites();
