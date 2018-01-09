/**
 * Mobile nav for backstore
 */

/* eslint-disable no-undef */
(function init() {
  const sidebarBtn = document.querySelector('#sidebar-btn');
  const sidebar = document.querySelector('#sidebar');
  const closeButton = document.querySelector('#close-btn');

  sidebarBtn.addEventListener('click', (event) => {
    const isOpen = sidebar.classList.contains('bs-sidebar--open');

    if (!isOpen) {
      sidebar.classList.add('bs-sidebar--open');
      closeButton.classList.remove('hidden');
    }
  });

  closeButton.addEventListener('click', (event) => {
    const isOpen = sidebar.classList.contains('bs-sidebar--open');

    if (isOpen) {
      sidebar.classList.remove('bs-sidebar--open');
      closeButton.classList.add('hidden');
    }
  });
}());
