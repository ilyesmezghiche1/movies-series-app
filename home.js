let dropBtn = document.querySelector("#dropBtn");
let dropMenu = document.querySelector("#dropMenu");

// toggle on button click
dropBtn.addEventListener("click", function(e) {
  e.stopPropagation(); // prevent click from reaching document
  dropMenu.classList.toggle("hidden");
});

// close when clicking anywhere else on the page
document.addEventListener("click", function() {
  dropMenu.classList.add("hidden");
});
window.addEventListener("scroll",function(){
   dropMenu.classList.add("hidden");
})
