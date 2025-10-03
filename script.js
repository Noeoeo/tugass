document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    const menuData = {
        makanan: [
            { id: 1, name: "Mie Ayam Spesial", price: 12000, img: "https://placehold.co/300x200/E8D5C4/313131?text=Mie+Ayam", isBestSeller: true },
            { id: 2, name: "Nasi Goreng Gila", price: 15000, img: "https://placehold.co/300x200/F9E0BB/313131?text=Nasi+Goreng", isBestSeller: true },
            { id: 3, name: "Bakso Urat Jumbo", price: 18000, img: "https://placehold.co/300x200/81A263/313131?text=Bakso", isBestSeller: false },
            { id: 4, name: "Sate Ayam Madura", price: 20000, img:"https://placehold.co/300x200/81A263/313131?text=Bakso", isBestSeller: false },
            { id: 13, name: "Ayam Geprek Pedas", price: 16000, img: "https://placehold.co/300x200/E74C3C/FFFFFF?text=Ayam+Geprek", isBestSeller: true },
            { id: 14, name: "Gado-gado Komplit", price: 14000, img: "https://placehold.co/300x200/2ECC71/FFFFFF?text=Gado-gado", isBestSeller: false },
        ],
        minuman: [
            { id: 5, name: "Es Teh Manis", price: 5000, img: "https://placehold.co/300x200/F1C27B/313131?text=Es+Teh", isBestSeller: true },
            { id: 6, name: "Jus Alpukat", price: 10000, img: "https://placehold.co/300x200/A8D8B9/313131?text=Jus+Alpukat", isBestSeller: true },
            { id: 7, name: "Kopi Hitam", price: 6000, img: "https://placehold.co/300x200/5C3D2E/FFFFFF?text=Kopi", isBestSeller: false },
            { id: 8, name: "Es Jeruk", price: 7000, img: "https://placehold.co/300x200/FFC107/313131?text=Es+Jeruk", isBestSeller: false },
            { id: 15, name: "Es Campur", price: 12000, img: "https://placehold.co/300x200/E9A8F2/313131?text=Es+Campur", isBestSeller: false },
            { id: 16, name: "Cendol Elizabeth", price: 11000, img: "https://placehold.co/300x200/77D977/313131?text=Cendol", isBestSeller: false },
        ],
        snack: [
            { id: 9, name: "Pisang Goreng Crispy", price: 8000, img: "https://placehold.co/300x200/FFD56F/313131?text=Pisang+Goreng", isBestSeller: true },
            { id: 10, name: "Kentang Goreng", price: 10000, img: "https://placehold.co/300x200/F7B42C/313131?text=Kentang", isBestSeller: true },
            { id: 11, name: "Roti Bakar Coklat", price: 9000, img: "https://placehold.co/300x200/A37E36/FFFFFF?text=Roti+Bakar", isBestSeller: false },
            { id: 12, name: "Tahu Walik", price: 7000, img: "https://placehold.co/300x200/D8AE7E/313131?text=Tahu+Walik", isBestSeller: false },
            { id: 17, name: "Cireng Bumbu Rujak", price: 8000, img: "https://placehold.co/300x200/FDF5E6/313131?text=Cireng", isBestSeller: false },
            { id: 18, name: "Seblak Ceker", price: 13000, img: "https://placehold.co/300x200/FF6347/FFFFFF?text=Seblak", isBestSeller: false },
        ]
    };

    let cart = []; // Format: { id, name, price, quantity, note }

    // --- DOM ELEMENTS ---
    const pageContent = document.getElementById('page-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // --- FUNCTIONS ---

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };
    
    // Generic function to render items, used by Beranda and Menu pages
    const renderItemsGrid = (items) => {
        return items.map(item => {
            const cartItem = cart.find(ci => ci.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            const bestSellerBadge = item.isBestSeller ? '<div class="best-seller-badge">Best Seller</div>' : '';

            return `
                <div class="product-card">
                    ${bestSellerBadge}
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="price">${formatRupiah(item.price)}</p>
                    <div class="controls">
                        <button class="minus-btn" data-id="${item.id}">-</button>
                        <span id="quantity-${item.id}">${quantity}</span>
                        <button class="plus-btn" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    // --- UPDATED --- Render Beranda Page
    const renderBeranda = () => {
        // Combine all menu items into one array
        const allItems = [
            ...menuData.makanan,
            ...menuData.minuman,
            ...menuData.snack
        ];

        // Sort items to show best sellers first
        allItems.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));

        pageContent.innerHTML = `
            <h2>Selamat Datang di KENIC!</h2>
            <div class="menu-grid">${renderItemsGrid(allItems)}</div>
        `;
    };

    // Render a specific menu page (Makanan, Minuman, Snack)
    const renderMenuPage = (category, title) => {
        const items = menuData[category];
        pageContent.innerHTML = `
            <h2>Menu ${title}</h2>
            <div class="menu-grid">${renderItemsGrid(items)}</div>
        `;
    };
    
    // Render Payment Page
    const renderPayment = () => {
        if (cart.length === 0) {
            pageContent.innerHTML = `
                <h2>Payment</h2>
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Keranjang Anda masih kosong!</p>
                </div>
            `;
            return;
        }

        let total = 0;
        const cartItemsHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h4>${item.name} (x${item.quantity})</h4>
                        <p class="price">${formatRupiah(item.price * item.quantity)}</p>
                        <input type="text" class="note-input" data-id="${item.id}" placeholder="Tambahkan catatan..." value="${item.note || ''}">
                    </div>
                    <div class="controls">
                         <button class="minus-btn" data-id="${item.id}">-</button>
                        <span id="quantity-${item.id}">${item.quantity}</span>
                        <button class="plus-btn" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
        }).join('');

        pageContent.innerHTML = `
            <h2>Payment</h2>
            <div class="payment-page">
                ${cartItemsHTML}
                <div class="cart-summary">
                    Total: ${formatRupiah(total)}
                </div>
                <div class="order-button-wrapper">
                    <button class="order-button">Pesan</button>
                </div>
            </div>
        `;
    };
    
    const navigate = (hash) => {
        const page = hash.replace('#', '');
        switch (page) {
            case 'makanan': renderMenuPage('makanan', 'Makanan'); break;
            case 'minuman': renderMenuPage('minuman', 'Minuman'); break;
            case 'snack': renderMenuPage('snack', 'Snack'); break;
            case 'payment': renderPayment(); break;
            default: renderBeranda();
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.hash === hash || (hash === '' && link.hash === '#beranda'));
        });

        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    };
    
    const findItemById = (id) => {
        for (const category in menuData) {
            const item = menuData[category].find(item => item.id === id);
            if (item) return item;
        }
        return null;
    };

    const addToCart = (id) => {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            const newItem = findItemById(id);
            if (newItem) cart.push({ ...newItem, quantity: 1, note: '' });
        }
        updateQuantities();
        if (window.location.hash === '#payment') renderPayment();
    };

    const removeFromCart = (id) => {
        const cartItemIndex = cart.findIndex(item => item.id === id);
        if (cartItemIndex > -1) {
            cart[cartItemIndex].quantity--;
            if (cart[cartItemIndex].quantity === 0) {
                cart.splice(cartItemIndex, 1);
            }
        }
        updateQuantities();
        if (window.location.hash === '#payment') renderPayment();
    };

    const updateQuantities = () => {
        const allItems = [ ...menuData.makanan, ...menuData.minuman, ...menuData.snack ];
        allItems.forEach(item => {
             const quantitySpan = document.getElementById(`quantity-${item.id}`);
             if(quantitySpan) {
                const cartItem = cart.find(ci => ci.id === item.id);
                quantitySpan.textContent = cartItem ? cartItem.quantity : 0;
             }
        });
    };


    // --- EVENT LISTENERS ---

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = link.hash;
        });
    });

    window.addEventListener('hashchange', () => navigate(window.location.hash));

    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    
    pageContent.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('plus-btn')) {
            const id = parseInt(target.dataset.id);
            addToCart(id);
        } else if (target.classList.contains('minus-btn')) {
            const id = parseInt(target.dataset.id);
            removeFromCart(id);
        } else if (target.classList.contains('order-button')) {
            alert('Pesanan Anda telah diterima!\n' + JSON.stringify(cart, null, 2));
            cart = [];
            navigate('#beranda');
        }
    });

    pageContent.addEventListener('input', (e) => {
        if (e.target.classList.contains('note-input')) {
            const id = parseInt(e.target.dataset.id);
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.note = e.target.value;
            }
        }
    });

    // --- INITIAL LOAD ---
    navigate(window.location.hash || '#beranda');
});