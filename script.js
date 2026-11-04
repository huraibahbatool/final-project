let toastTimeout;

function showNotification(message) {
  let toast = document.getElementById('toast-notification');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function addToCart(productId) {
  const card = document.getElementById(productId);
  const addBtn = card.querySelector('.add-btn');
  const counterControl = card.querySelector('.counter-control');
  const productName = card.querySelector('.product-info h3').innerText;

  addBtn.style.display = 'none';
  counterControl.style.display = 'flex';

  showNotification(`"${productName}" added to your cart!`);
}

function updateQty(productId, change) {
  const card = document.getElementById(productId);
  const qtySpan = card.querySelector('.qty');
  const addBtn = card.querySelector('.add-btn');
  const counterControl = card.querySelector('.counter-control');

  let currentQty = parseInt(qtySpan.innerText);
  currentQty += change;

  if (currentQty <= 0) {
    qtySpan.innerText = 1;
    counterControl.style.display = 'none';
    addBtn.style.display = 'block';
  } else {
    qtySpan.innerText = currentQty;
  }
}

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}

// ===== Mobile menu =====
const menuToggleBtn = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const mobileQuery = window.matchMedia('(max-width: 960px)');

function closeMenu() {
  if (!mainNav) return;
  mainNav.classList.remove('open');
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  if (menuToggleBtn) {
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    menuToggleBtn.innerText = '☰';
  }
}

if (menuToggleBtn && mainNav) {
  menuToggleBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
    menuToggleBtn.innerText = isOpen ? '✕' : '☰';
  });

  // Tap on "Categories" opens/closes its sub-menu on small screens
  const dropBtn = document.querySelector('.dropbtn');
  if (dropBtn) {
    dropBtn.addEventListener('click', (e) => {
      if (mobileQuery.matches) {
        e.preventDefault();
        dropBtn.parentElement.classList.toggle('open');
      }
    });
  }

  // Close the menu after choosing a link (except the Categories toggle)
  mainNav.querySelectorAll('a:not(.dropbtn)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Reset when resizing back to desktop
  mobileQuery.addEventListener('change', (e) => {
    if (!e.matches) closeMenu();
  });
}
