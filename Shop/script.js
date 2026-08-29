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

    if (addBtn) addBtn.style.display = 'none';
    if (counterControl) counterControl.style.display = 'flex';

    showNotification(`${productName} has been added to cart!`);
}

function updateQty(productId, change) {
    const card = document.getElementById(productId);
    const qtySpan = card.querySelector('.qty');
    const addBtn = card.querySelector('.add-btn');
    const counterControl = card.querySelector('.counter-control');

    let currentQty = parseInt(qtySpan.innerText);
    currentQty += change;

    if (currentQty <= 0) {
        currentQty = 1;
        if (counterControl) counterControl.style.display = 'none';
        if (addBtn) addBtn.style.display = 'block';
    }

    qtySpan.innerText = currentQty;
}
document.addEventListener("DOMContentLoaded", () => {
    const priceSlider = document.querySelector("#priceRange"); // Aapke price slider ki id/class
    const priceOutput = document.querySelector("#maxPriceText"); // Jahan max price show ho raha hai
    const categoryCheckboxes = document.querySelectorAll(".category-checkbox"); // Category checkboxes
    const sortSelect = document.querySelector("#sortingSelect"); // Sorting dropdown
    const productContainer = document.querySelector(".products-container"); // Products ka parent container
    const products = Array.from(document.querySelectorAll(".product-card")); // Sabhi products

    // 1. Price Range Filter Function
    if (priceSlider) {
        priceSlider.addEventListener("input", (e) => {
            const maxPrice = e.target.value;
            if (priceOutput) priceOutput.textContent = "Rs. " + maxPrice;
            filterAndSortProducts();
        });
    }

    // 2. Category Filter Function
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterAndSortProducts);
    });

    // 3. Sorting Function
    if (sortSelect) {
        sortSelect.addEventListener("change", filterAndSortProducts);
    }

    // Main Filtering & Sorting Logic
    function filterAndSortProducts() {
        const maxPrice = priceSlider ? Number(priceSlider.value) : Infinity;
        
        // Selected categories nikalna
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Filter karna
        let filteredProducts = products.filter(product => {
            const price = Number(product.getAttribute("data-price"));
            const category = product.getAttribute("data-category");

            // Price check
            const matchesPrice = price <= maxPrice;

            // Category check (Agar koi category select nahi hai ya 'all' hai toh sab show honge)
            const matchesCategory = selectedCategories.length === 0 || 
                                    selectedCategories.includes("all") || 
                                    selectedCategories.includes(category);

            return matchesPrice && matchesCategory;
        });

        // Sorting karna
        const sortValue = sortSelect ? sortSelect.value : "default";
        if (sortValue === "low-high") {
            filteredProducts.sort((a, b) => Number(a.getAttribute("data-price")) - Number(b.getAttribute("data-price")));
        } else if (sortValue === "high-low") {
            filteredProducts.sort((a, b) => Number(b.getAttribute("data-price")) - Number(a.getAttribute("data-price")));
        }

        // DOM ko update karna (Products ko chupana ya dikhana)
        productContainer.innerHTML = "";
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => productContainer.appendChild(product));
        } else {
            productContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 20px;'>Koi product nahi mila!</p>";
        }
    }
});