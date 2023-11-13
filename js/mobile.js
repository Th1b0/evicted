const mbbtn = document.querySelector("#mb-btn");
const menu = document.querySelector(".mobile-menu");
const cbtn = document.querySelector("#cbtn");

mbbtn.addEventListener("click", () => {
  menu.classList.remove("nv");
});

cbtn.addEventListener("click", ()=> {
    menu.classList.add("nv")
})

function closeMenu() {
  menu.classList.add("nv");
}