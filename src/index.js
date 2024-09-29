const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});