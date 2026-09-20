/* ============================================================
   js/boot.js — entry point
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Store.load();
  Nav.mount();
  Home.render();
  Streak.render();
});
