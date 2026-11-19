/**
 * PIYOZ MARKET - Core Application Controller
 * Handles routing, trilingual DOM updates, catalog filtering, search autocomplete,
 * product detail views, checkout flow, auth demo, toasts, and UI interactions.
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    lang: localStorage.getItem('piyoz_lang') || 'uz',
    city: localStorage.getItem('piyoz_city') || 'Toshkent',
    user: JSON.parse(localStorage.getItem('piyoz_user') || 'null'),
    currentRoute: 'home',
    searchHistory: JSON.parse(localStorage.getItem('piyoz_search_history') || '["iPhone 15", "AirPods", "Krossovka"]'),
    recentlyViewed: JSON.parse(localStorage.getItem('piyoz_recently_viewed') || '[]'),
    catalogFilters: {
      category: 'all',
      minPrice: null,
      maxPrice: null,
      brands: [],
      onlyDiscounts: false,
      onlyExpress: false,
      search: '',
      sort: 'popular'
    },
    activeDetailProduct: null,
    activeDetailOptions: {
      color: '',
      size: '',
      quantity: 1,
      installmentMonths: 12
    }
  };

  // Helper: Get translation string
  function t(key) {
    const dict = window.PIYOZ_TRANSLATIONS && window.PIYOZ_TRANSLATIONS[AppState.lang];
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to uz
    const fallbackDict = window.PIYOZ_TRANSLATIONS && window.PIYOZ_TRANSLATIONS['uz'];
    return (fallbackDict && fallbackDict[key] !== undefined) ? fallbackDict[key] : key;
  }

  // Helper: Format UZS currency
  function formatPrice(amount) {
    if (amount === undefined || amount === null) return '0';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + t('currency');
  }

  function formatMonthly(amount) {
    if (amount === undefined || amount === null) return '0';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + t('currency_monthly');
  }

  // ---------------- DOM TRANSLATION ENGINE ----------------
  function applyTranslations() {
    document.documentElement.lang = AppState.lang;

    // Translate textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    // Update active language in dropdown and button
    const currentLangCodeEl = document.getElementById('current-lang-code');
    if (currentLangCodeEl) {
      currentLangCodeEl.textContent = AppState.lang.toUpperCase();
    }

    document.querySelectorAll('.lang-item-btn').forEach(btn => {
      const l = btn.getAttribute('data-lang');
      const isMatch = l === AppState.lang;
      btn.classList.toggle('active', isMatch);
      const checkEl = btn.querySelector('.lang-check');
      if (checkEl) checkEl.textContent = isMatch ? '✓' : '';
    });

    // Update city
    const cityEl = document.getElementById('current-city-name');
    if (cityEl) cityEl.textContent = AppState.city;

    // Refresh dynamic sections
    renderCategories();
    renderFlashSales();
    renderPopularProducts();
    renderRecommendedProducts();
    renderRecentlyViewed();
    renderCatalog();
    renderCart();
  }

  function setLanguage(lang) {
    if (!['uz', 'ru', 'en'].includes(lang)) return;
    AppState.lang = lang;
    localStorage.setItem('piyoz_lang', lang);
    applyTranslations();
    showToast(t('toast_lang_changed'), 'info');
  }

  // ---------------- TOAST NOTIFICATIONS ----------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item ${type} toast-slide-in`;
    
    let iconSvg = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
    if (type === 'success') {
      iconSvg = '<svg class="icon" style="color:var(--success)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="icon" style="color:var(--sale-red)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('toast-slide-in');
      toast.classList.add('toast-slide-out');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // ---------------- CATEGORIES DATA ----------------
  const CATEGORIES = [
    { id: 'smartphones', icon: '📱', key: 'cat_smartphones', sub: 'cat_smartphones_sub' },
    { id: 'electronics', icon: '🎧', key: 'cat_electronics', sub: 'cat_electronics_sub' },
    { id: 'computers', icon: '💻', key: 'cat_computers', sub: 'cat_computers_sub' },
    { id: 'appliances', icon: '🏠', key: 'cat_appliances', sub: 'cat_appliances_sub' },
    { id: 'fashion', icon: '👕', key: 'cat_fashion', sub: 'cat_fashion_sub' },
    { id: 'shoes', icon: '👟', key: 'cat_shoes', sub: 'cat_shoes_sub' },
    { id: 'beauty', icon: '✨', key: 'cat_beauty', sub: 'cat_beauty_sub' },
    { id: 'kitchen', icon: '🍳', key: 'cat_kitchen', sub: 'cat_kitchen_sub' },
    { id: 'children', icon: '🧸', key: 'cat_children', sub: 'cat_children_sub' },
    { id: 'sports', icon: '🚴', key: 'cat_sports', sub: 'cat_sports_sub' },
    { id: 'automotive', icon: '🚗', key: 'cat_automotive', sub: 'cat_automotive_sub' },
    { id: 'books', icon: '📚', key: 'cat_books', sub: 'cat_books_sub' }
  ];

  // ---------------- RENDERING COMPONENTS ----------------

  // Render Product Card
  function createProductCardElement(product) {
    const card = document.createElement('div');
    card.className = 'product-card anim-fade-up';
    card.setAttribute('data-product-id', product.id);

    const title = product.name[AppState.lang] || product.name.uz;
    const monthlyPrice = Math.round(product.price / 12);
    const isWishlisted = window.PiyozWishlist && window.PiyozWishlist.has(product.id);
    const primaryImg = (product.images && product.images[0]) || window.PIYOZ_FALLBACK_IMAGE;

    // Badges markup
    let badgeHtml = '';
    if (product.discount > 0) {
      badgeHtml += `<span class="badge-pill badge-discount">-${product.discount}%</span>`;
    }
    if (product.badge === 'express') {
      badgeHtml += `<span class="badge-pill badge-express">⚡ ${t('express_delivery')}</span>`;
    } else if (product.badge === 'bestseller') {
      badgeHtml += `<span class="badge-pill badge-bestseller">🔥 ${t('badge_bestseller')}</span>`;
    } else if (product.badge === 'new') {
      badgeHtml += `<span class="badge-pill badge-new">${t('badge_new')}</span>`;
    }

    card.innerHTML = `
      <div class="product-image-box">
        <img src="${primaryImg}" alt="${title}" loading="lazy" onerror="this.src=window.PIYOZ_FALLBACK_IMAGE">
        <div class="product-card-badges">${badgeHtml}</div>
        <button class="product-card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" type="button" aria-label="Add to Wishlist">
          <svg class="icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>

      <div class="product-card-body">
        <h3 class="product-card-title" title="${title}">${title}</h3>

        <div class="product-card-rating">
          <span class="rating-star">★ ${product.rating.toFixed(1)}</span>
          <span class="rating-count">(${product.reviewsCount} ${t('reviews_count')})</span>
        </div>

        <div class="product-installment-chip">${formatMonthly(monthlyPrice)}</div>

        <div class="product-card-footer">
          <div class="product-prices-wrap">
            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            <span class="product-current-price">${formatPrice(product.price)}</span>
          </div>

          <button class="product-add-cart-btn" data-cart-add="${product.id}" type="button" aria-label="Add to Cart" title="${t('add_to_cart')}">
            <svg class="icon" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    card.addEventListener('click', (e) => {
      // If clicked wishlist or add-to-cart, do not open detail modal
      if (e.target.closest('.product-card-wishlist-btn') || e.target.closest('.product-add-cart-btn')) {
        return;
      }
      openProductDetail(product.id);
    });

    const wishBtn = card.querySelector('.product-card-wishlist-btn');
    wishBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const added = window.PiyozWishlist.toggle(product.id);
      wishBtn.classList.toggle('active', added);
      wishBtn.classList.add('heart-beat');
      setTimeout(() => wishBtn.classList.remove('heart-beat'), 400);

      const prodName = product.name[AppState.lang] || product.name.uz;
      showToast(added ? `${prodName} ${t('toast_added_to_wishlist')}` : t('toast_removed_from_wishlist'), added ? 'success' : 'info');
    });

    const addCartBtn = card.querySelector('.product-add-cart-btn');
    addCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.PiyozCart.addItem(product.id, 1);
      addCartBtn.classList.add('badge-bump');
      setTimeout(() => addCartBtn.classList.remove('badge-bump'), 300);

      const prodName = product.name[AppState.lang] || product.name.uz;
      showToast(`${prodName} ${t('toast_added_to_cart')}`, 'success');
    });

    return card;
  }

  // Render Home Categories Strip
  function renderCategories() {
    const grid = document.getElementById('home-categories-grid');
    if (!grid) return;
    grid.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const tile = document.createElement('a');
      tile.href = `#catalog?category=${cat.id}`;
      tile.className = 'category-tile';
      tile.innerHTML = `
        <div class="category-tile-icon">${cat.icon}</div>
        <span class="category-tile-name">${t(cat.key)}</span>
      `;
      grid.appendChild(tile);
    });

    // Also populate Mega Catalog sidebar
    const megaSidebar = document.getElementById('catalog-categories-sidebar');
    if (megaSidebar) {
      megaSidebar.innerHTML = '';
      CATEGORIES.forEach((cat, index) => {
        const item = document.createElement('div');
        item.className = `catalog-category-tab ${index === 0 ? 'active' : ''}`;
        item.setAttribute('data-mega-cat', cat.id);
        item.innerHTML = `
          <span>${cat.icon}</span>
          <span>${t(cat.key)}</span>
        `;
        item.addEventListener('mouseenter', () => {
          document.querySelectorAll('.catalog-category-tab').forEach(t => t.classList.remove('active'));
          item.classList.add('active');
          renderMegaSubcategories(cat.id);
        });
        item.addEventListener('click', () => {
          toggleMegaCatalog(false);
          window.location.hash = `#catalog?category=${cat.id}`;
        });
        megaSidebar.appendChild(item);
      });
      // Initial render of first category subcategories
      renderMegaSubcategories(CATEGORIES[0].id);
    }
  }

  function renderMegaSubcategories(categoryId) {
    const pane = document.getElementById('catalog-subcategories-pane');
    if (!pane) return;

    const products = (window.PIYOZ_PRODUCTS || []).filter(p => p.category === categoryId);
    const brands = Array.from(new Set(products.map(p => p.brand)));

    pane.innerHTML = `
      <div>
        <h4 class="subcat-group-title" onclick="window.location.hash='#catalog?category=${categoryId}';document.getElementById('mega-catalog-overlay').classList.remove('open');document.getElementById('mega-catalog-menu').classList.remove('open');">
          ${t('cat_' + categoryId)} →
        </h4>
        <div class="subcat-links-list">
          ${brands.map(b => `<a href="#catalog?category=${categoryId}&brand=${encodeURIComponent(b)}" class="subcat-link" onclick="document.getElementById('mega-catalog-overlay').classList.remove('open');document.getElementById('mega-catalog-menu').classList.remove('open');">${b}</a>`).join('')}
        </div>
      </div>
      <div>
        <h4 class="subcat-group-title">${t('popular_products_title')}</h4>
        <div class="subcat-links-list">
          ${products.slice(0, 4).map(p => `
            <a href="#product/${p.id}" class="subcat-link" onclick="document.getElementById('mega-catalog-overlay').classList.remove('open');document.getElementById('mega-catalog-menu').classList.remove('open');">
              ${p.name[AppState.lang] || p.name.uz}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Render Flash Sales Grid
  function renderFlashSales() {
    const grid = document.getElementById('flash-sales-products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const flashProducts = (window.PIYOZ_PRODUCTS || []).filter(p => p.isFlashSale).slice(0, 5);
    flashProducts.forEach(product => {
      grid.appendChild(createProductCardElement(product));
    });
  }

  // Render Popular Products Grid
  function renderPopularProducts() {
    const grid = document.getElementById('popular-products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const popular = (window.PIYOZ_PRODUCTS || []).filter(p => p.isPopular).slice(0, 10);
    popular.forEach(product => {
      grid.appendChild(createProductCardElement(product));
    });
  }

  // Render Recommended Grid
  function renderRecommendedProducts() {
    const grid = document.getElementById('recommended-products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const recommended = (window.PIYOZ_PRODUCTS || []).filter(p => p.isRecommended).slice(0, 10);
    recommended.forEach(product => {
      grid.appendChild(createProductCardElement(product));
    });
  }

  // Render Recently Viewed Products
  function renderRecentlyViewed() {
    const section = document.getElementById('recently-viewed-section');
    const grid = document.getElementById('recently-viewed-products-grid');
    if (!section || !grid) return;

    if (!AppState.recentlyViewed || AppState.recentlyViewed.length === 0) {
      section.classList.add('hidden');
      return;
    }

    section.classList.remove('hidden');
    grid.innerHTML = '';

    const products = (window.PIYOZ_PRODUCTS || []).filter(p => AppState.recentlyViewed.includes(p.id)).slice(0, 5);
    products.forEach(p => {
      grid.appendChild(createProductCardElement(p));
    });
  }

  function addToRecentlyViewed(productId) {
    let list = AppState.recentlyViewed.filter(id => id !== productId);
    list.unshift(productId);
    if (list.length > 10) list.pop();
    AppState.recentlyViewed = list;
    localStorage.setItem('piyoz_recently_viewed', JSON.stringify(list));
    renderRecentlyViewed();
  }

  // ---------------- CATALOG FILTERING & SORTING ----------------
  function initCatalogFilters() {
    // Populate categories filter list
    const catList = document.getElementById('filter-categories-list');
    if (catList) {
      catList.innerHTML = `
        <label class="filter-checkbox-label">
          <input type="radio" name="filter_cat" value="all" ${AppState.catalogFilters.category === 'all' ? 'checked' : ''}>
          <span>${t('cat_all')}</span>
        </label>
        ${CATEGORIES.map(c => `
          <label class="filter-checkbox-label">
            <input type="radio" name="filter_cat" value="${c.id}" ${AppState.catalogFilters.category === c.id ? 'checked' : ''}>
            <span>${t(c.key)}</span>
          </label>
        `).join('')}
      `;

      catList.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          AppState.catalogFilters.category = e.target.value;
          renderCatalog();
        });
      });
    }

    // Populate brands list from all products
    const brandsList = document.getElementById('filter-brands-list');
    if (brandsList) {
      const allBrands = Array.from(new Set((window.PIYOZ_PRODUCTS || []).map(p => p.brand))).sort();
      brandsList.innerHTML = allBrands.map(b => `
        <label class="filter-checkbox-label">
          <input type="checkbox" value="${b}" ${AppState.catalogFilters.brands.includes(b) ? 'checked' : ''}>
          <span>${b}</span>
        </label>
      `).join('');

      brandsList.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', () => {
          const selected = Array.from(brandsList.querySelectorAll('input:checked')).map(el => el.value);
          AppState.catalogFilters.brands = selected;
          renderCatalog();
        });
      });
    }

    // Price inputs
    const minPriceInput = document.getElementById('filter-price-min');
    const maxPriceInput = document.getElementById('filter-price-max');
    if (minPriceInput) {
      minPriceInput.addEventListener('input', (e) => {
        AppState.catalogFilters.minPrice = e.target.value ? Number(e.target.value) : null;
        renderCatalog();
      });
    }
    if (maxPriceInput) {
      maxPriceInput.addEventListener('input', (e) => {
        AppState.catalogFilters.maxPrice = e.target.value ? Number(e.target.value) : null;
        renderCatalog();
      });
    }

    // Toggles
    const discountToggle = document.getElementById('filter-only-discounts');
    if (discountToggle) {
      discountToggle.addEventListener('change', (e) => {
        AppState.catalogFilters.onlyDiscounts = e.target.checked;
        renderCatalog();
      });
    }

    const expressToggle = document.getElementById('filter-only-express');
    if (expressToggle) {
      expressToggle.addEventListener('change', (e) => {
        AppState.catalogFilters.onlyExpress = e.target.checked;
        renderCatalog();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        AppState.catalogFilters.sort = e.target.value;
        renderCatalog();
      });
    }

    // Reset filters buttons
    const resetBtn = document.getElementById('btn-reset-filters');
    const resetEmptyBtn = document.getElementById('btn-reset-filters-empty');
    const handleReset = () => {
      AppState.catalogFilters = {
        category: 'all',
        minPrice: null,
        maxPrice: null,
        brands: [],
        onlyDiscounts: false,
        onlyExpress: false,
        search: '',
        sort: 'popular'
      };
      if (minPriceInput) minPriceInput.value = '';
      if (maxPriceInput) maxPriceInput.value = '';
      if (discountToggle) discountToggle.checked = false;
      if (expressToggle) expressToggle.checked = false;
      if (sortSelect) sortSelect.value = 'popular';
      const allCatRadio = document.querySelector('input[name="filter_cat"][value="all"]');
      if (allCatRadio) allCatRadio.checked = true;
      if (brandsList) {
        brandsList.querySelectorAll('input:checked').forEach(c => c.checked = false);
      }
      renderCatalog();
    };

    if (resetBtn) resetBtn.addEventListener('click', handleReset);
    if (resetEmptyBtn) resetEmptyBtn.addEventListener('click', handleReset);
  }

  function renderCatalog() {
    const grid = document.getElementById('catalog-products-grid');
    const emptyState = document.getElementById('catalog-empty-state');
    const countEl = document.getElementById('catalog-results-count');
    if (!grid) return;

    let products = [...(window.PIYOZ_PRODUCTS || [])];

    // Filter by Category
    if (AppState.catalogFilters.category && AppState.catalogFilters.category !== 'all') {
      products = products.filter(p => p.category === AppState.catalogFilters.category);
    }

    // Filter by Search Query
    if (AppState.catalogFilters.search) {
      const q = AppState.catalogFilters.search.toLowerCase().trim();
      products = products.filter(p => {
        const nameUz = (p.name.uz || '').toLowerCase();
        const nameRu = (p.name.ru || '').toLowerCase();
        const nameEn = (p.name.en || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        return nameUz.includes(q) || nameRu.includes(q) || nameEn.includes(q) || brand.includes(q);
      });
    }

    // Filter by Brand
    if (AppState.catalogFilters.brands && AppState.catalogFilters.brands.length > 0) {
      products = products.filter(p => AppState.catalogFilters.brands.includes(p.brand));
    }

    // Filter by Price Min/Max
    if (AppState.catalogFilters.minPrice !== null && AppState.catalogFilters.minPrice > 0) {
      products = products.filter(p => p.price >= AppState.catalogFilters.minPrice);
    }
    if (AppState.catalogFilters.maxPrice !== null && AppState.catalogFilters.maxPrice > 0) {
      products = products.filter(p => p.price <= AppState.catalogFilters.maxPrice);
    }

    // Filter by Discounts
    if (AppState.catalogFilters.onlyDiscounts) {
      products = products.filter(p => p.discount > 0);
    }

    // Filter by 1-day express
    if (AppState.catalogFilters.onlyExpress) {
      products = products.filter(p => p.badge === 'express');
    }

    // Sorting
    switch (AppState.catalogFilters.sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
        break;
      case 'popular':
      default:
        products.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    // Update count
    if (countEl) countEl.textContent = products.length;

    // Render Grid
    grid.innerHTML = '';
    if (products.length === 0) {
      grid.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      grid.classList.remove('hidden');
      if (emptyState) emptyState.classList.add('hidden');
      products.forEach(p => grid.appendChild(createProductCardElement(p)));
    }
  }

  // ---------------- PRODUCT DETAIL MODAL & VIEW ----------------
  function openProductDetail(productId) {
    const product = (window.PIYOZ_PRODUCTS || []).find(p => p.id === productId);
    if (!product) return;

    AppState.activeDetailProduct = product;
    AppState.activeDetailOptions = {
      color: product.colors && product.colors[0] ? product.colors[0].name : '',
      size: product.sizes && product.sizes[0] ? product.sizes[0] : '',
      quantity: 1,
      installmentMonths: 12
    };

    addToRecentlyViewed(productId);

    const modal = document.getElementById('modal-product-detail');
    const body = document.getElementById('product-detail-modal-body');
    if (!modal || !body) return;

    const title = product.name[AppState.lang] || product.name.uz;
    const desc = product.description[AppState.lang] || product.description.uz;
    const catName = t('cat_' + product.category);

    const isFav = window.PiyozWishlist && window.PiyozWishlist.has(product.id);
    const mainImg = (product.images && product.images[0]) || window.PIYOZ_FALLBACK_IMAGE;

    body.innerHTML = `
      <div class="product-detail-breadcrumbs">
        <a href="#home">${t('home_crumb')}</a>
        <span>/</span>
        <a href="#catalog?category=${product.category}">${catName}</a>
        <span>/</span>
        <span>${product.brand}</span>
      </div>

      <div class="product-detail-grid">
        <!-- Gallery -->
        <div class="detail-gallery-wrap">
          <div class="detail-thumbnails-list">
            ${(product.images || [mainImg]).map((img, idx) => `
              <button class="detail-thumb-btn ${idx === 0 ? 'active' : ''}" data-thumb-idx="${idx}" type="button">
                <img src="${img}" alt="Thumbnail ${idx + 1}" onerror="this.src=window.PIYOZ_FALLBACK_IMAGE">
              </button>
            `).join('')}
          </div>

          <div class="detail-main-photo-box">
            <img id="detail-main-img" src="${mainImg}" alt="${title}" onerror="this.src=window.PIYOZ_FALLBACK_IMAGE">
          </div>
        </div>

        <!-- Info Column -->
        <div class="detail-info-wrap">
          <span class="detail-brand-badge">${product.brand}</span>
          <h1 class="detail-title">${title}</h1>

          <div class="detail-meta-row">
            <span class="rating-star">★ ${product.rating.toFixed(1)}</span>
            <span>${product.reviewsCount} ${t('customer_reviews')}</span>
            <span style="color:var(--success);font-weight:600;">✓ ${t('in_stock')}</span>
          </div>

          <!-- Price & Installment -->
          <div class="detail-price-box">
            <div class="detail-price-row">
              <span class="detail-current-price" id="detail-current-price-val">${formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="detail-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
              ${product.discount > 0 ? `<span class="detail-discount-tag">-${product.discount}%</span>` : ''}
            </div>

            <div class="detail-installment-box">
              <div class="detail-installment-title">${t('installment_calculator_title')}</div>
              <div class="detail-installment-tabs">
                <button class="installment-month-tab" data-months="3">3 ${t('months_3')}</button>
                <button class="installment-month-tab" data-months="6">6 ${t('months_6')}</button>
                <button class="installment-month-tab active" data-months="12">12 ${t('months_12')}</button>
                <button class="installment-month-tab" data-months="24">24 ${t('months_24')}</button>
              </div>
              <div class="installment-monthly-calc" id="detail-monthly-calc-val">
                ${t('monthly_payment_label')} <strong>${formatMonthly(Math.round(product.price / 12))}</strong>
              </div>
            </div>
          </div>

          <!-- Color Variations -->
          ${product.colors && product.colors.length > 0 ? `
            <div class="detail-variation-section">
              <div class="variation-label">${t('select_color')} <strong id="detail-active-color-name">${AppState.activeDetailOptions.color}</strong></div>
              <div class="variation-swatches">
                ${product.colors.map((c, i) => `
                  <button class="color-swatch-btn ${i === 0 ? 'active' : ''}" data-color-val="${c.name}" type="button">
                    <span class="color-dot" style="background:${c.hex}"></span>
                    <span>${c.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Size Variations -->
          ${product.sizes && product.sizes.length > 0 ? `
            <div class="detail-variation-section">
              <div class="variation-label">${t('select_size')} <strong id="detail-active-size-name">${AppState.activeDetailOptions.size}</strong></div>
              <div class="variation-swatches">
                ${product.sizes.map((s, i) => `
                  <button class="size-pill-btn ${i === 0 ? 'active' : ''}" data-size-val="${s}" type="button">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Quantity & Actions -->
          <div class="detail-actions-row">
            <div class="quantity-stepper">
              <button class="qty-btn" id="btn-detail-qty-minus" type="button">-</button>
              <input class="qty-input" id="detail-qty-input" type="text" value="1" readonly>
              <button class="qty-btn" id="btn-detail-qty-plus" type="button">+</button>
            </div>

            <button class="detail-btn-cart" id="btn-detail-add-cart" type="button">
              <svg class="icon" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              <span>${t('add_to_cart')}</span>
            </button>

            <button class="detail-btn-buy-now" id="btn-detail-buy-now" type="button">
              <span>${t('buy_now')}</span>
            </button>

            <button class="detail-btn-wishlist ${isFav ? 'active' : ''}" id="btn-detail-wishlist" type="button">
              <svg class="icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
          </div>

          <!-- Delivery Perks -->
          <div class="detail-delivery-perks">
            <div class="delivery-perk-item">
              <svg class="icon" style="color:var(--success)" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg>
              <span>${t('free_delivery_pickup')}</span>
            </div>
            <div class="delivery-perk-item">
              <svg class="icon" style="color:var(--primary)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span>${t('free_return_warranty')}</span>
            </div>
            <div class="delivery-perk-item">
              <svg class="icon" style="color:#F59E0B" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              <span>${t('original_product_guarantee')}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Description & Specs Section -->
      <div class="detail-tabs-section">
        <div class="detail-tabs-nav">
          <button class="detail-tab-btn active" id="tab-nav-desc" type="button">${t('product_description')}</button>
          <button class="detail-tab-btn" id="tab-nav-specs" type="button">${t('product_specifications')}</button>
        </div>

        <div id="tab-content-desc-body">
          <p style="font-size:15px;line-height:1.7;color:var(--text-secondary);max-width:800px;">${desc}</p>
        </div>

        <div id="tab-content-specs-body" class="hidden">
          <table class="specs-table">
            <tbody>
              ${product.specs ? Object.entries(product.specs).map(([k, v]) => `
                <tr>
                  <td class="specs-label">${k}</td>
                  <td class="specs-val">${v}</td>
                </tr>
              `).join('') : `<tr><td>${t('no_reviews_yet')}</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Modal Interaction Handlers
    // 1. Thumbnails click
    const mainImgEl = document.getElementById('detail-main-img');
    body.querySelectorAll('.detail-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.detail-thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const img = btn.querySelector('img');
        if (img && mainImgEl) mainImgEl.src = img.src;
      });
    });

    // 2. Installment Tabs
    const monthlyCalcEl = document.getElementById('detail-monthly-calc-val');
    body.querySelectorAll('.installment-month-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        body.querySelectorAll('.installment-month-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const months = Number(tab.getAttribute('data-months'));
        AppState.activeDetailOptions.installmentMonths = months;
        const monthly = Math.round(product.price / months);
        if (monthlyCalcEl) {
          monthlyCalcEl.innerHTML = `${t('monthly_payment_label')} <strong>${formatMonthly(monthly)}</strong>`;
        }
      });
    });

    // 3. Color variants
    body.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const colorVal = btn.getAttribute('data-color-val');
        AppState.activeDetailOptions.color = colorVal;
        const colorLabel = document.getElementById('detail-active-color-name');
        if (colorLabel) colorLabel.textContent = colorVal;
      });
    });

    // 4. Size variants
    body.querySelectorAll('.size-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.size-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sizeVal = btn.getAttribute('data-size-val');
        AppState.activeDetailOptions.size = sizeVal;
        const sizeLabel = document.getElementById('detail-active-size-name');
        if (sizeLabel) sizeLabel.textContent = sizeVal;
      });
    });

    // 5. Quantity Stepper
    const qtyInput = document.getElementById('detail-qty-input');
    const minusBtn = document.getElementById('btn-detail-qty-minus');
    const plusBtn = document.getElementById('btn-detail-qty-plus');

    if (minusBtn && qtyInput) {
      minusBtn.addEventListener('click', () => {
        let val = Number(qtyInput.value) || 1;
        if (val > 1) {
          val--;
          qtyInput.value = val;
          AppState.activeDetailOptions.quantity = val;
        }
      });
    }

    if (plusBtn && qtyInput) {
      plusBtn.addEventListener('click', () => {
        let val = Number(qtyInput.value) || 1;
        val++;
        qtyInput.value = val;
        AppState.activeDetailOptions.quantity = val;
      });
    }

    // 6. Add to Cart button
    const addCartBtn = document.getElementById('btn-detail-add-cart');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        window.PiyozCart.addItem(product.id, AppState.activeDetailOptions.quantity, {
          color: AppState.activeDetailOptions.color,
          size: AppState.activeDetailOptions.size
        });
        showToast(`${title} ${t('toast_added_to_cart')}`, 'success');
      });
    }

    // 7. Buy Now button
    const buyNowBtn = document.getElementById('btn-detail-buy-now');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        window.PiyozCart.addItem(product.id, AppState.activeDetailOptions.quantity, {
          color: AppState.activeDetailOptions.color,
          size: AppState.activeDetailOptions.size
        });
        closeProductDetail();
        window.location.hash = '#checkout';
      });
    }

    // 8. Wishlist toggle button
    const wishBtn = document.getElementById('btn-detail-wishlist');
    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        const added = window.PiyozWishlist.toggle(product.id);
        wishBtn.classList.toggle('active', added);
        showToast(added ? `${title} ${t('toast_added_to_wishlist')}` : t('toast_removed_from_wishlist'), added ? 'success' : 'info');
      });
    }

    // 9. Specs & Description tab toggle
    const descTabBtn = document.getElementById('tab-nav-desc');
    const specsTabBtn = document.getElementById('tab-nav-specs');
    const descContent = document.getElementById('tab-content-desc-body');
    const specsContent = document.getElementById('tab-content-specs-body');

    if (descTabBtn && specsTabBtn && descContent && specsContent) {
      descTabBtn.addEventListener('click', () => {
        descTabBtn.classList.add('active');
        specsTabBtn.classList.remove('active');
        descContent.classList.remove('hidden');
        specsContent.classList.add('hidden');
      });
      specsTabBtn.addEventListener('click', () => {
        specsTabBtn.classList.add('active');
        descTabBtn.classList.remove('active');
        specsContent.classList.remove('hidden');
        descContent.classList.add('hidden');
      });
    }

    modal.classList.add('open');
  }

  function closeProductDetail() {
    const modal = document.getElementById('modal-product-detail');
    if (modal) modal.classList.remove('open');
  }

  // ---------------- CART SYSTEM RENDERING ----------------
  function renderCart() {
    const items = window.PiyozCart.getItems();
    const totals = window.PiyozCart.getTotals();
    const products = window.PIYOZ_PRODUCTS || [];

    // 1. Update Drawer Items List
    const drawerList = document.getElementById('cart-drawer-items-list');
    const drawerEmpty = document.getElementById('cart-drawer-empty');
    const drawerSubtotal = document.getElementById('drawer-sum-subtotal');
    const drawerDiscount = document.getElementById('drawer-sum-discount');
    const drawerTotal = document.getElementById('drawer-sum-total');

    if (drawerList) {
      drawerList.innerHTML = '';
      if (items.length === 0) {
        if (drawerEmpty) drawerEmpty.classList.remove('hidden');
      } else {
        if (drawerEmpty) drawerEmpty.classList.add('hidden');
        items.forEach(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return;
          const title = product.name[AppState.lang] || product.name.uz;
          const img = (product.images && product.images[0]) || window.PIYOZ_FALLBACK_IMAGE;

          const el = document.createElement('div');
          el.className = 'cart-item-card';
          el.innerHTML = `
            <img class="cart-item-thumb" src="${img}" alt="${title}" onerror="this.src=window.PIYOZ_FALLBACK_IMAGE">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${title}</h4>
              <div class="cart-item-variant">${item.color || ''} ${item.size ? '• ' + item.size : ''}</div>
              <div class="cart-item-bottom">
                <div class="quantity-stepper" style="height:32px;">
                  <button class="qty-btn" data-cart-minus="${item.productId}" data-color="${item.color || ''}" data-size="${item.size || ''}">-</button>
                  <input class="qty-input" style="width:30px;font-size:13px;" type="text" value="${item.quantity}" readonly>
                  <button class="qty-btn" data-cart-plus="${item.productId}" data-color="${item.color || ''}" data-size="${item.size || ''}">+</button>
                </div>
                <span class="cart-item-price">${formatPrice(product.price * item.quantity)}</span>
                <button class="cart-item-delete-btn" data-cart-remove="${item.productId}" data-color="${item.color || ''}" data-size="${item.size || ''}" title="O'chirish">
                  <svg class="icon" style="width:18px;height:18px;" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
              </div>
            </div>
          `;
          drawerList.appendChild(el);
        });
      }
    }

    if (drawerSubtotal) drawerSubtotal.textContent = formatPrice(totals.subtotal);
    if (drawerDiscount) drawerDiscount.textContent = `-${formatPrice(totals.discountSavings)}`;
    if (drawerTotal) drawerTotal.textContent = formatPrice(totals.finalTotal);

    // 2. Update Full Cart Page View
    const fullList = document.getElementById('cart-full-items-list');
    const fullEmpty = document.getElementById('cart-empty-state');
    const fullGrid = document.getElementById('cart-content-grid');
    const fullHeading = document.getElementById('cart-count-heading');

    if (fullHeading) fullHeading.textContent = `(${totals.itemsCount})`;

    if (fullList && fullGrid && fullEmpty) {
      if (items.length === 0) {
        fullGrid.classList.add('hidden');
        fullEmpty.classList.remove('hidden');
      } else {
        fullGrid.classList.remove('hidden');
        fullEmpty.classList.add('hidden');
        fullList.innerHTML = drawerList ? drawerList.innerHTML : '';
      }
    }

    const fullSubtotal = document.getElementById('cart-sum-subtotal');
    const fullDiscount = document.getElementById('cart-sum-discount');
    const fullDelivery = document.getElementById('cart-sum-delivery');
    const fullTotal = document.getElementById('cart-sum-total');

    if (fullSubtotal) fullSubtotal.textContent = formatPrice(totals.subtotal);
    if (fullDiscount) fullDiscount.textContent = `-${formatPrice(totals.discountSavings)}`;
    if (fullDelivery) fullDelivery.textContent = totals.deliveryFee === 0 ? t('delivery_free') : formatPrice(totals.deliveryFee);
    if (fullTotal) fullTotal.textContent = formatPrice(totals.finalTotal);

    // 3. Update Checkout summary
    const chkSubtotal = document.getElementById('chk-sum-subtotal');
    const chkDiscount = document.getElementById('chk-sum-discount');
    const chkDelivery = document.getElementById('chk-sum-delivery');
    const chkTotal = document.getElementById('chk-sum-total');

    if (chkSubtotal) chkSubtotal.textContent = formatPrice(totals.subtotal);
    if (chkDiscount) chkDiscount.textContent = `-${formatPrice(totals.discountSavings)}`;
    if (chkDelivery) chkDelivery.textContent = totals.deliveryFee === 0 ? t('delivery_free') : formatPrice(totals.deliveryFee);
    if (chkTotal) chkTotal.textContent = formatPrice(totals.finalTotal);

    // Bind Stepper Actions
    bindCartStepperEvents();
  }

  function bindCartStepperEvents() {
    document.querySelectorAll('[data-cart-minus]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cart-minus');
        const color = btn.getAttribute('data-color') || '';
        const size = btn.getAttribute('data-size') || '';
        const items = window.PiyozCart.getItems();
        const found = items.find(i => i.productId === id && (color ? i.color === color : true) && (size ? i.size === size : true));
        if (found) {
          window.PiyozCart.updateQuantity(id, found.quantity - 1, { color, size });
        }
      };
    });

    document.querySelectorAll('[data-cart-plus]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cart-plus');
        const color = btn.getAttribute('data-color') || '';
        const size = btn.getAttribute('data-size') || '';
        const items = window.PiyozCart.getItems();
        const found = items.find(i => i.productId === id && (color ? i.color === color : true) && (size ? i.size === size : true));
        if (found) {
          window.PiyozCart.updateQuantity(id, found.quantity + 1, { color, size });
        }
      };
    });

    document.querySelectorAll('[data-cart-remove]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-cart-remove');
        const color = btn.getAttribute('data-color') || '';
        const size = btn.getAttribute('data-size') || '';
        window.PiyozCart.removeItem(id, { color, size });
        showToast(t('toast_removed_from_cart'), 'info');
      };
    });
  }

  function toggleCartDrawer(open) {
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (!overlay || !drawer) return;

    if (open) {
      renderCart();
      overlay.classList.add('open');
      drawer.classList.add('open');
    } else {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
    }
  }

  // ---------------- WISHLIST VIEW RENDERING ----------------
  function renderWishlistView() {
    const grid = document.getElementById('wishlist-products-grid');
    const emptyState = document.getElementById('wishlist-empty-state');
    const headingCount = document.getElementById('wishlist-count-heading');
    if (!grid) return;

    const ids = window.PiyozWishlist.getItems();
    const products = (window.PIYOZ_PRODUCTS || []).filter(p => ids.includes(p.id));

    if (headingCount) headingCount.textContent = `(${products.length})`;

    grid.innerHTML = '';
    if (products.length === 0) {
      grid.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      grid.classList.remove('hidden');
      if (emptyState) emptyState.classList.add('hidden');
      products.forEach(p => grid.appendChild(createProductCardElement(p)));
    }
  }

  // ---------------- SEARCH AUTOCOMPLETE & HISTORY ----------------
  function initSearch() {
    const searchWrap = document.getElementById('header-search-wrap');
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('header-search-form');
    const clearBtn = document.getElementById('search-clear-btn');
    const suggestionsSection = document.getElementById('search-suggestions-section');
    const suggestionsList = document.getElementById('search-suggestions-list');
    const historyTagsContainer = document.getElementById('search-history-tags');
    const clearHistoryBtn = document.getElementById('btn-clear-history');

    function renderSearchHistory() {
      if (!historyTagsContainer) return;
      historyTagsContainer.innerHTML = '';
      if (!AppState.searchHistory || AppState.searchHistory.length === 0) {
        historyTagsContainer.innerHTML = `<span style="font-size:12px;color:var(--text-muted);">${t('no_history')}</span>`;
        return;
      }
      AppState.searchHistory.forEach(term => {
        const chip = document.createElement('span');
        chip.className = 'search-tag-chip';
        chip.textContent = term;
        chip.addEventListener('click', () => {
          if (searchInput) searchInput.value = term;
          performSearch(term);
        });
        historyTagsContainer.appendChild(chip);
      });
    }

    renderSearchHistory();

    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        AppState.searchHistory = [];
        localStorage.setItem('piyoz_search_history', JSON.stringify([]));
        renderSearchHistory();
      });
    }

    // Popular tags click
    document.querySelectorAll('#popular-search-tags .search-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const term = chip.getAttribute('data-search-term');
        if (searchInput) searchInput.value = term;
        performSearch(term);
      });
    });

    // Input focus & typing
    if (searchInput && searchWrap) {
      searchInput.addEventListener('focus', () => {
        searchWrap.classList.add('active');
      });

      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);

        if (q.length === 0) {
          if (suggestionsSection) suggestionsSection.classList.add('hidden');
          return;
        }

        // Filter products for suggestions
        const matches = (window.PIYOZ_PRODUCTS || []).filter(p => {
          const nameUz = (p.name.uz || '').toLowerCase();
          const nameRu = (p.name.ru || '').toLowerCase();
          const nameEn = (p.name.en || '').toLowerCase();
          return nameUz.includes(q) || nameRu.includes(q) || nameEn.includes(q);
        }).slice(0, 5);

        if (suggestionsSection && suggestionsList) {
          suggestionsList.innerHTML = '';
          if (matches.length > 0) {
            suggestionsSection.classList.remove('hidden');
            matches.forEach(p => {
              const item = document.createElement('div');
              item.className = 'search-suggestion-item';
              const title = p.name[AppState.lang] || p.name.uz;
              const img = (p.images && p.images[0]) || window.PIYOZ_FALLBACK_IMAGE;

              item.innerHTML = `
                <img class="search-suggestion-thumb" src="${img}" alt="${title}" onerror="this.src=window.PIYOZ_FALLBACK_IMAGE">
                <div class="search-suggestion-info">
                  <div class="search-suggestion-name">${title}</div>
                  <div class="search-suggestion-price">${formatPrice(p.price)}</div>
                </div>
              `;
              item.addEventListener('click', () => {
                searchWrap.classList.remove('active');
                openProductDetail(p.id);
              });
              suggestionsList.appendChild(item);
            });
          } else {
            suggestionsSection.classList.remove('hidden');
            suggestionsList.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:8px;">${t('no_results_found')}</div>`;
          }
        }
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        if (suggestionsSection) suggestionsSection.classList.add('hidden');
        searchInput.focus();
      });
    }

    // Submit form
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const term = searchInput.value.trim();
        if (term) {
          performSearch(term);
        }
      });
    }

    function performSearch(term) {
      if (searchWrap) searchWrap.classList.remove('active');

      // Save to search history
      let hist = AppState.searchHistory.filter(t => t.toLowerCase() !== term.toLowerCase());
      hist.unshift(term);
      if (hist.length > 8) hist.pop();
      AppState.searchHistory = hist;
      localStorage.setItem('piyoz_search_history', JSON.stringify(hist));
      renderSearchHistory();

      // Update catalog filters & navigate
      AppState.catalogFilters.search = term;
      window.location.hash = `#catalog?search=${encodeURIComponent(term)}`;
    }

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      if (searchWrap && !searchWrap.contains(e.target)) {
        searchWrap.classList.remove('active');
      }
    });
  }

  // ---------------- MEGA CATALOG TOGGLE ----------------
  function toggleMegaCatalog(force) {
    const btn = document.getElementById('btn-toggle-catalog');
    const overlay = document.getElementById('mega-catalog-overlay');
    const menu = document.getElementById('mega-catalog-menu');
    if (!btn || !overlay || !menu) return;

    const isOpen = force !== undefined ? force : !overlay.classList.contains('open');

    btn.classList.toggle('active', isOpen);
    overlay.classList.toggle('open', isOpen);
    menu.classList.toggle('open', isOpen);
  }

  // ---------------- ROUTER & VIEW SWITCHER ----------------
  function handleRoute() {
    const hash = window.location.hash || '#home';
    const [routePath, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');

    // Reset view visibility
    document.querySelectorAll('.app-view').forEach(v => v.classList.add('hidden'));

    // Handle Route: #product/:id
    if (routePath.startsWith('#product/')) {
      const prodId = routePath.replace('#product/', '');
      openProductDetail(prodId);
      // Keep home view active in background
      const homeView = document.getElementById('view-home');
      if (homeView) homeView.classList.remove('hidden');
      return;
    }

    // Route: #catalog
    if (routePath === '#catalog') {
      const catalogView = document.getElementById('view-catalog');
      if (catalogView) catalogView.classList.remove('hidden');

      const catParam = params.get('category');
      const searchParam = params.get('search');
      const brandParam = params.get('brand');
      const sortParam = params.get('sort');

      if (catParam) AppState.catalogFilters.category = catParam;
      if (searchParam) AppState.catalogFilters.search = searchParam;
      if (brandParam) AppState.catalogFilters.brands = [brandParam];
      if (sortParam) AppState.catalogFilters.sort = sortParam;

      // Update Radio button
      const radio = document.querySelector(`input[name="filter_cat"][value="${AppState.catalogFilters.category}"]`);
      if (radio) radio.checked = true;

      renderCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive('catalog');
      return;
    }

    // Route: #wishlist
    if (routePath === '#wishlist') {
      const wishView = document.getElementById('view-wishlist');
      if (wishView) wishView.classList.remove('hidden');
      renderWishlistView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive('wishlist');
      return;
    }

    // Route: #cart
    if (routePath === '#cart') {
      const cartView = document.getElementById('view-cart');
      if (cartView) cartView.classList.remove('hidden');
      renderCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive('cart');
      return;
    }

    // Route: #checkout
    if (routePath === '#checkout') {
      const chkView = document.getElementById('view-checkout');
      if (chkView) chkView.classList.remove('hidden');
      renderCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive('cart');
      return;
    }

    // Route: #profile
    if (routePath === '#profile') {
      const profView = document.getElementById('view-profile');
      if (profView) profView.classList.remove('hidden');
      renderProfileOrders();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive('profile');
      return;
    }

    // Default: #home
    const homeView = document.getElementById('view-home');
    if (homeView) homeView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNavActive('home');
  }

  function updateNavActive(routeName) {
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => btn.classList.remove('active'));
    const mobBtn = document.getElementById(`mob-nav-${routeName}`);
    if (mobBtn) mobBtn.classList.add('active');
  }

  // ---------------- ORDERS & PROFILE SYSTEM ----------------
  function renderProfileOrders() {
    const listWrap = document.getElementById('orders-list-wrap');
    if (!listWrap) return;

    let orders = JSON.parse(localStorage.getItem('piyoz_orders') || '[]');
    if (orders.length === 0) {
      // Seed default demo orders
      orders = [
        {
          id: 'PZ-829104',
          date: '18.11.2026',
          status: 'delivering',
          itemsCount: 2,
          total: 15649000,
          pickupPoint: 'Toshkent sh., Chilonzor 9-mavze, 24-uy'
        },
        {
          id: 'PZ-652391',
          date: '04.11.2026',
          status: 'delivered',
          itemsCount: 1,
          total: 1390000,
          pickupPoint: 'Toshkent sh., Yunusobod 4-mavze, 12-uy'
        }
      ];
      localStorage.setItem('piyoz_orders', JSON.stringify(orders));
    }

    listWrap.innerHTML = orders.map(ord => `
      <div class="order-history-card anim-fade-up">
        <div class="order-history-header">
          <div>
            <strong>#${ord.id}</strong>
            <span style="font-size:12px;color:var(--text-muted);margin-left:8px;">${ord.date}</span>
          </div>
          <span class="order-badge-status ${ord.status === 'delivering' ? 'order-badge-delivering' : 'order-badge-delivered'}">
            ${ord.status === 'delivering' ? t('order_status_delivering') : t('order_status_delivered')}
          </span>
        </div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">
          ${t('pickup_points')}: <strong>${ord.pickupPoint}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:14px;">
          <span>${ord.itemsCount} ${t('cart_items_count')}</span>
          <strong style="color:var(--primary);">${formatPrice(ord.total)}</strong>
        </div>
      </div>
    `).join('');
  }

  // ---------------- COUNTDOWN TIMER FOR FLASH SALES ----------------
  function initCountdownTimer() {
    let secondsLeft = 8 * 3600 + 45 * 60 + 20;

    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');

    setInterval(() => {
      if (secondsLeft <= 0) {
        secondsLeft = 24 * 3600; // Reset
      }
      secondsLeft--;

      const h = Math.floor(secondsLeft / 3600);
      const m = Math.floor((secondsLeft % 3600) / 60);
      const s = secondsLeft % 60;

      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // ---------------- INITIALIZATION & EVENT BINDINGS ----------------
  function init() {
    // 1. Language selector setup
    const langBtn = document.getElementById('lang-selector-btn');
    const langWrap = document.getElementById('lang-selector-wrap');
    if (langBtn && langWrap) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langWrap.classList.toggle('open');
      });
      document.addEventListener('click', () => langWrap.classList.remove('open'));
    }

    document.querySelectorAll('.lang-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        if (langWrap) langWrap.classList.remove('open');
      });
    });

    // 2. City selector modal
    const cityBtn = document.getElementById('btn-select-city');
    const cityModal = document.getElementById('modal-city-selector');
    const cityCloseBtn = document.getElementById('btn-close-city-modal');
    if (cityBtn && cityModal) {
      cityBtn.addEventListener('click', () => cityModal.classList.add('open'));
    }
    if (cityCloseBtn && cityModal) {
      cityCloseBtn.addEventListener('click', () => cityModal.classList.remove('open'));
    }
    document.querySelectorAll('#cities-options-list button').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.getAttribute('data-city');
        AppState.city = c;
        localStorage.setItem('piyoz_city', c);
        const cityEl = document.getElementById('current-city-name');
        if (cityEl) cityEl.textContent = c;
        if (cityModal) cityModal.classList.remove('open');
        showToast(`${t('city')}: ${c}`, 'info');
      });
    });

    // 3. Header Catalog Toggle & Mobile Catalog
    const catalogToggleBtn = document.getElementById('btn-toggle-catalog');
    const mobCatalogBtn = document.getElementById('mob-nav-catalog');
    const megaOverlay = document.getElementById('mega-catalog-overlay');
    if (catalogToggleBtn) {
      catalogToggleBtn.addEventListener('click', () => toggleMegaCatalog());
    }
    if (mobCatalogBtn) {
      mobCatalogBtn.addEventListener('click', () => {
        window.location.hash = '#catalog';
      });
    }
    if (megaOverlay) {
      megaOverlay.addEventListener('click', (e) => {
        if (e.target === megaOverlay) toggleMegaCatalog(false);
      });
    }

    // Top seller link
    const topSellerLink = document.getElementById('link-top-seller');
    if (topSellerLink) {
      topSellerLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Piyoz Market hamkorlik dasturi: Yangi sotuvchilar qabuli tez orada ochiladi!', 'info');
      });
    }

    // Phone number input formatter (+998 XX XXX XX XX)
    const phoneInput = document.getElementById('chk-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (!val.startsWith('998')) {
          val = '998' + val;
        }
        val = val.substring(0, 12); // 998 + 9 digits
        let formatted = '+998';
        if (val.length > 3) formatted += ' (' + val.substring(3, 5);
        if (val.length >= 5) formatted += ') ' + val.substring(5, 8);
        if (val.length >= 8) formatted += '-' + val.substring(8, 10);
        if (val.length >= 10) formatted += '-' + val.substring(10, 12);
        e.target.value = formatted;
      });
    }

    // 4. Cart Drawer Toggle
    const headerCartBtn = document.getElementById('btn-header-cart');
    const mobCartBtn = document.getElementById('mob-nav-cart');
    const closeDrawerBtn = document.getElementById('btn-close-cart-drawer');
    const drawerOverlay = document.getElementById('cart-drawer-overlay');

    if (headerCartBtn) headerCartBtn.addEventListener('click', () => toggleCartDrawer(true));
    if (mobCartBtn) mobCartBtn.addEventListener('click', () => toggleCartDrawer(true));
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleCartDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleCartDrawer(false));

    // Clear entire cart button
    const clearEntireCartBtn = document.getElementById('btn-clear-entire-cart');
    if (clearEntireCartBtn) {
      clearEntireCartBtn.addEventListener('click', () => {
        window.PiyozCart.clear();
        showToast(t('cart_empty_title'), 'info');
      });
    }

    // Promo code form in cart view
    const promoForm = document.getElementById('cart-promo-form');
    const promoInput = document.getElementById('cart-promo-input');
    const promoStatus = document.getElementById('promo-status-msg');
    if (promoForm && promoInput) {
      promoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const res = window.PiyozCart.applyPromo(promoInput.value);
        if (promoStatus) {
          promoStatus.style.display = 'block';
          if (res.success) {
            promoStatus.style.color = 'var(--success)';
            promoStatus.textContent = t('promo_applied_success');
            showToast(t('promo_applied_success'), 'success');
          } else {
            promoStatus.style.color = 'var(--sale-red)';
            promoStatus.textContent = t('promo_invalid');
            showToast(t('promo_invalid'), 'error');
          }
        }
      });
    }

    // 5. Product Detail Modal close
    const closeProdModalBtn = document.getElementById('btn-close-product-modal');
    const prodModal = document.getElementById('modal-product-detail');
    if (closeProdModalBtn) closeProdModalBtn.addEventListener('click', closeProductDetail);
    if (prodModal) {
      prodModal.addEventListener('click', (e) => {
        if (e.target === prodModal) closeProductDetail();
      });
    }

    // 6. Checkout Delivery Method Toggles
    const pickupOpt = document.getElementById('delivery-opt-pickup');
    const courierOpt = document.getElementById('delivery-opt-courier');
    const pickupBox = document.getElementById('pickup-selector-box');
    const courierBox = document.getElementById('courier-address-box');

    if (pickupOpt && courierOpt) {
      pickupOpt.addEventListener('click', () => {
        pickupOpt.classList.add('active');
        courierOpt.classList.remove('active');
        if (pickupBox) pickupBox.classList.remove('hidden');
        if (courierBox) courierBox.classList.add('hidden');
      });

      courierOpt.addEventListener('click', () => {
        courierOpt.classList.add('active');
        pickupOpt.classList.remove('active');
        if (pickupBox) pickupBox.classList.add('hidden');
        if (courierBox) courierBox.classList.remove('hidden');
      });
    }

    // Payment Method Toggles
    const payCashOpt = document.getElementById('pay-opt-cash');
    const payCardOpt = document.getElementById('pay-opt-card');
    const cardBox = document.getElementById('card-payment-box');

    if (payCashOpt && payCardOpt) {
      payCashOpt.addEventListener('click', () => {
        payCashOpt.classList.add('active');
        payCardOpt.classList.remove('active');
        if (cardBox) cardBox.classList.add('hidden');
      });

      payCardOpt.addEventListener('click', () => {
        payCardOpt.classList.add('active');
        payCashOpt.classList.remove('active');
        if (cardBox) cardBox.classList.remove('hidden');
      });
    }

    // Checkout Form Submission
    const chkForm = document.getElementById('checkout-form');
    if (chkForm) {
      chkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('chk-name').value.trim();
        const phone = document.getElementById('chk-phone').value.trim();

        if (!name || !phone || phone.length < 9) {
          showToast(t('toast_fill_required'), 'error');
          return;
        }

        const totals = window.PiyozCart.getTotals();
        if (totals.itemsCount === 0) {
          showToast(t('cart_empty_title'), 'error');
          return;
        }

        // Generate Order
        const orderId = Math.floor(100000 + Math.random() * 900000);
        const newOrder = {
          id: 'PZ-' + orderId,
          date: new Date().toLocaleDateString('ru-RU'),
          status: 'delivering',
          itemsCount: totals.itemsCount,
          total: totals.finalTotal,
          pickupPoint: document.getElementById('pickup-point-select').value
        };

        const existingOrders = JSON.parse(localStorage.getItem('piyoz_orders') || '[]');
        existingOrders.unshift(newOrder);
        localStorage.setItem('piyoz_orders', JSON.stringify(existingOrders));

        // Clear cart
        window.PiyozCart.clear();

        // Show Success Modal
        const successModal = document.getElementById('modal-order-success');
        const orderIdEl = document.getElementById('order-success-id');
        if (orderIdEl) orderIdEl.textContent = orderId;
        if (successModal) successModal.classList.add('open');

        showToast(t('toast_order_placed'), 'success');
      });
    }

    // Success Modal buttons
    const btnSuccessHome = document.getElementById('btn-success-home');
    const btnSuccessOrders = document.getElementById('btn-success-view-orders');
    const successModal = document.getElementById('modal-order-success');

    if (btnSuccessHome && successModal) {
      btnSuccessHome.addEventListener('click', () => {
        successModal.classList.remove('open');
        window.location.hash = '#home';
      });
    }

    if (btnSuccessOrders && successModal) {
      btnSuccessOrders.addEventListener('click', () => {
        successModal.classList.remove('open');
        window.location.hash = '#profile';
      });
    }

    // 7. Auth Modal & Profile
    const headerProfileBtn = document.getElementById('btn-header-profile');
    const mobProfileBtn = document.getElementById('mob-nav-profile');
    const authModal = document.getElementById('modal-auth');
    const closeAuthBtn = document.getElementById('btn-close-auth-modal');

    const openProfileOrAuth = () => {
      if (AppState.user) {
        window.location.hash = '#profile';
      } else {
        if (authModal) authModal.classList.add('open');
      }
    };

    if (headerProfileBtn) headerProfileBtn.addEventListener('click', openProfileOrAuth);
    if (mobProfileBtn) mobProfileBtn.addEventListener('click', openProfileOrAuth);
    if (closeAuthBtn && authModal) {
      closeAuthBtn.addEventListener('click', () => authModal.classList.remove('open'));
    }

    // Quick demo login
    const demoLoginBtn = document.getElementById('btn-quick-demo-login');
    if (demoLoginBtn) {
      demoLoginBtn.addEventListener('click', () => {
        AppState.user = { name: 'Alisher Navoiy', phone: '+998 90 123 45 67' };
        localStorage.setItem('piyoz_user', JSON.stringify(AppState.user));
        if (authModal) authModal.classList.remove('open');
        const profLabel = document.getElementById('header-profile-label');
        if (profLabel) profLabel.textContent = t('account');
        showToast('Xush kelibsiz, Alisher!', 'success');
        window.location.hash = '#profile';
      });
    }

    const formLogin = document.getElementById('form-auth-login');
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        AppState.user = { name: 'Alisher Navoiy', phone: '+998 90 123 45 67' };
        localStorage.setItem('piyoz_user', JSON.stringify(AppState.user));
        if (authModal) authModal.classList.remove('open');
        const profLabel = document.getElementById('header-profile-label');
        if (profLabel) profLabel.textContent = t('account');
        showToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
        window.location.hash = '#profile';
      });
    }

    // Logout
    const logoutBtn = document.getElementById('btn-profile-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AppState.user = null;
        localStorage.removeItem('piyoz_user');
        const profLabel = document.getElementById('header-profile-label');
        if (profLabel) profLabel.textContent = t('profile');
        showToast('Hisobdan chiqdingiz', 'info');
        window.location.hash = '#home';
      });
    }

    // Profile Sub-tabs
    document.querySelectorAll('.profile-nav-item[data-profile-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.profile-nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-profile-tab');

        document.querySelectorAll('.profile-tab-content').forEach(p => p.classList.add('hidden'));
        const activePane = document.getElementById(`tab-content-${tab}`);
        if (activePane) activePane.classList.remove('hidden');
      });
    });

    // Profile Info Save
    const profInfoForm = document.getElementById('profile-info-form');
    if (profInfoForm) {
      profInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast(t('profile_updated_toast'), 'success');
      });
    }

    // 8. FAQ Modal
    const topFaqLink = document.getElementById('link-top-faq');
    const faqModal = document.getElementById('modal-faq');
    const closeFaqBtn = document.getElementById('btn-close-faq-modal');
    if (topFaqLink && faqModal) {
      topFaqLink.addEventListener('click', (e) => {
        e.preventDefault();
        faqModal.classList.add('open');
      });
    }
    if (closeFaqBtn && faqModal) {
      closeFaqBtn.addEventListener('click', () => faqModal.classList.remove('open'));
    }

    // 9. Hero Carousel Initialization
    if (window.PiyozHeroCarousel) {
      new window.PiyozHeroCarousel('#hero-carousel', { interval: 5000, autoPlay: true });
    }

    // 10. Sticky Header Shadow on Scroll
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    });

    // 11. Custom Cart and Wishlist Events
    window.addEventListener('piyoz:cart-updated', () => renderCart());
    window.addEventListener('piyoz:wishlist-updated', () => {
      if (window.location.hash === '#wishlist') {
        renderWishlistView();
      }
    });

    // 12. Initialize Search & Countdown & Filters
    initSearch();
    initCountdownTimer();
    initCatalogFilters();

    // 13. Update initial badges
    if (window.PiyozWishlist) window.PiyozWishlist.updateBadges();
    if (window.PiyozCart) window.PiyozCart.updateBadges();

    // 14. Initial translation & routing
    applyTranslations();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
  }

  // DOMContentLoaded trigger
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
