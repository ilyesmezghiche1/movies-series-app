 class MediaCard {
  static instances = [];

  constructor(id, title, poster, rating, year, type) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.rating = rating;
    this.year = year;
    this.type = type;
    MediaCard.instances.push(this);
  }

  render() {
    let card = document.createElement("div");
    card.dataset.id = this.id;
    card.dataset.type = this.type;
    card.className = "group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-transform duration-300 hover:-translate-y-2";

    card.innerHTML = `
      <div class="relative aspect-[2/3] overflow-hidden">
        <img src="${POSTER_IMG_URL}${this.poster}" alt="${this.title}" loading="lazy" class="w-full h-full object-cover block"/>

        <div class="card-overlay absolute inset-0 bg-black/85 flex flex-col justify-center items-center gap-4 p-4">
          <p class="text-white/75 text-xs text-center leading-relaxed line-clamp-4">${this.overview || ''}</p>
        </div>

        <button class="card-heart-btn absolute top-2 right-2 bg-black/50 border border-white/20 text-white w-8 h-8 rounded-full text-sm flex items-center justify-center z-10" data-id="${this.id}" data-type="${this.type}">♡</button>

        <div class="absolute top-2 left-2 flex gap-1">
          <span class="${this.type === 'movie' ? 'bg-rose-500/85' : 'bg-violet-500/85'} text-white text-[10px] px-2 py-0.5 rounded-full font-bold">${this.type === 'movie' ? 'Movie' : 'Series'}</span>
          <span class="bg-yellow-400/85 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">⭐ ${this.rating?.toFixed(1)}</span>
        </div>
      </div>

      <div class="p-3 flex flex-col gap-1">
        <h3 class="text-white text-sm font-bold truncate">${this.title}</h3>
        <span class="text-white/45 text-xs">${this.year}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `detail.html?id=${this.id}&type=${this.type}`;
    });

    card.querySelector(".card-heart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("toggle favorite", this.id, this.type);
    });

    return card;
  }
}

class MovieCard extends MediaCard {
  constructor(item) {
    super(
      item.id,
      item.title,
      item.poster_path,
      item.vote_average,
      item.release_date?.split('-')[0],
      'movie'
    );
    this.overview = item.overview;
  }
}

class SerieCard extends MediaCard {
  constructor(item) {
    super(
      item.id,
      item.name,
      item.poster_path,
      item.vote_average,
      item.first_air_date?.split('-')[0],
      'tv'
    );
    this.overview = item.overview;
  }
}
