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

  showNotification(`"${productName}" Your cart has been added!`);
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
        
        // Icon change karne ke liye (Moon se Sun ya vice versa)
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.innerText = '☀️';
        } else {
            themeToggleBtn.innerText = '🌙';
        }
    });
}