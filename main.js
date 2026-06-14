// HEADER COMPONENT
const header = `
  <header class="flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-white/10">
    <div id="logo" class="font-black text-4xl cursor-pointer text-rose-400 font-heading"> <a href="home.html">YesHub</a></div>
    <ul class="flex gap-10 text-white/80 text-sm font-medium items-center font-body">
      <li class="border-b-2 border-rose-400 text-rose-400 pb-1 cursor-pointer"><a href="home.html">Home</a></li>
      <li>
        <div class="relative">
          <button id="dropBtn" class="text-white/70 hover:text-white text-sm font-medium transition flex items-center gap-1 border-none outline-none">
            Categories <i class="ti ti-chevron-down text-xs"></i>
          </button>
          <div id="dropMenu" class="hidden absolute top-full left-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-lg p-2 w-44">
            <a href="#" class="block px-4 py-2 text-sm text-white/70 hover:text-rose-400 hover:bg-white/5 rounded-md transition">Action</a>
            <a href="#" class="block px-4 py-2 text-sm text-white/70 hover:text-rose-400 hover:bg-white/5 rounded-md transition">Drama</a>
            <a href="#" class="block px-4 py-2 text-sm text-white/70 hover:text-rose-400 hover:bg-white/5 rounded-md transition">Comedy</a>
            <a href="#" class="block px-4 py-2 text-sm text-white/70 hover:text-rose-400 hover:bg-white/5 rounded-md transition">Horror</a>
            <a href="#" class="block px-4 py-2 text-sm text-white/70 hover:text-rose-400 hover:bg-white/5 rounded-md transition">Thriller</a>
            <a href="#" class="block px-4 py-2 text-sm text-white/70 hover:text-rose-400 hover:bg-white/5 rounded-md transition">Sci-Fi</a>
          </div>
        </div>
      </li>
      <li class="hover:text-white cursor-pointer transition"> <a href="favorite.html">Favorites</a></li>
    </ul>
    <div class="flex items-center gap-4">
      <form class="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 w-56">
        <input type="text" placeholder="Search movies..." class="bg-transparent text-white text-sm outline-none placeholder-white/30 w-40 font-body"/>
        <button type="submit" class="text-white/50 hover:text-white transition">
          <i class="ti ti-search"></i>
        </button>
      </form>
      <a href="login.html" class="text-white text-sm font-medium px-5 py-2 rounded-full transition hover:opacity-90 bg-rose-400 font-body">Login</a>
    </div>
  </header>
`;

// FOOTER COMPONENT
const footer = `
  <footer class="bg-black/60 backdrop-blur-md border-t border-white/10 px-8 py-6">
    <div class="flex justify-between items-center">
      <div>
        <div class="font-black text-xl text-rose-400 mb-1 font-heading">Yeshub</div>
        <p class="text-white/30 text-xs">© 2026 Yeshub. All rights reserved.</p>
      </div>
      <ul class="flex gap-8 text-white/40 text-sm font-body">
        <li class="hover:text-white/70 cursor-pointer transition">About</li>
        <li class="hover:text-white/70 cursor-pointer transition">Terms</li>
        <li class="hover:text-white/70 cursor-pointer transition">Privacy</li>
      </ul>
      <div class="flex gap-4 text-white/40 text-xl">
        <a href="https://instagram.com" target="_blank" class="hover:text-white/70 transition"><i class="ti ti-brand-instagram"></i></a>
        <a href="mailto:your@email.com" class="hover:text-white/70 transition"><i class="ti ti-mail"></i></a>
        <a href="https://github.com/yourusername" target="_blank" class="hover:text-white/70 transition"><i class="ti ti-brand-github"></i></a>
      </div>
    </div>
  </footer>
`;

// INJECT
document.querySelector("header").outerHTML = header;
document.querySelector("footer").outerHTML = footer;

// DROPDOWN LOGIC
let dropBtn = document.querySelector("#dropBtn");
let dropMenu = document.querySelector("#dropMenu");

dropBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  dropMenu.classList.toggle("hidden");
});

window.addEventListener("click", function() {
  dropMenu.classList.add("hidden");
});

window.addEventListener("scroll", function() {
  dropMenu.classList.add("hidden");
});
