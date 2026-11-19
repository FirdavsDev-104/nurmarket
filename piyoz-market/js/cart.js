/**
 * PIYOZ MARKET - Shopping Cart System
 * Robust cart state management with variant options, quantity steppers,
 * promo code validation, totals calculation, and event notifications.
 */

const PiyozCart = {
  STORAGE_KEY: 'piyoz_market_cart',
  PROMO_STORAGE_KEY: 'piyoz_market_promo',

  VALID_PROMOS: {
    'PIYOZ10': { discountPercent: 10, name: 'PIYOZ10 (-10%)' },
    'BAHOR2026': { discountPercent: 15, name: 'BAHOR2026 (-15%)' },
    'EXPRESS': { discountPercent: 5, name: 'EXPRESS (-5%)' }
  },

  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage:', e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('piyoz:cart-updated', {
        detail: { items, count: this.getCount(), totals: this.getTotals() }
      }));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  },

  getAppliedPromo() {
    try {
      const data = localStorage.getItem(this.PROMO_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  applyPromo(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (this.VALID_PROMOS[cleanCode]) {
      const promoData = {
        code: cleanCode,
        discountPercent: this.VALID_PROMOS[cleanCode].discountPercent,
        name: this.VALID_PROMOS[cleanCode].name
      };
      localStorage.setItem(this.PROMO_STORAGE_KEY, JSON.stringify(promoData));
      this.saveItems(this.getItems()); // Re-dispatch event to update totals
      return { success: true, promo: promoData };
    }
    return { success: false, message: 'Invalid promo code' };
  },

  removePromo() {
    localStorage.removeItem(this.PROMO_STORAGE_KEY);
    this.saveItems(this.getItems());
  },

  addItem(productId, quantity = 1, options = {}) {
    const product = (window.PIYOZ_PRODUCTS || []).find(p => p.id === productId);
    if (!product) return false;

    let items = this.getItems();
    const color = options.color || (product.colors && product.colors[0] ? product.colors[0].name : '');
    const size = options.size || (product.sizes && product.sizes[0] ? product.sizes[0] : '');

    // Check if item with identical options already in cart
    const existingIndex = items.findIndex(item => 
      item.productId === productId && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        productId,
        quantity: Math.max(1, quantity),
        color,
        size,
        addedAt: Date.now()
      });
    }

    this.saveItems(items);
    return true;
  },

  updateQuantity(productId, newQty, options = {}) {
    let items = this.getItems();
    const color = options.color || '';
    const size = options.size || '';

    const index = items.findIndex(item => 
      item.productId === productId && 
      (color ? item.color === color : true) && 
      (size ? item.size === size : true)
    );

    if (index > -1) {
      if (newQty <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = newQty;
      }
      this.saveItems(items);
    }
  },

  removeItem(productId, options = {}) {
    let items = this.getItems();
    const color = options.color || '';
    const size = options.size || '';

    items = items.filter(item => {
      if (item.productId !== productId) return true;
      if (color && item.color !== color) return true;
      if (size && item.size !== size) return true;
      return false;
    });

    this.saveItems(items);
  },

  clear() {
    this.saveItems([]);
    this.removePromo();
  },

  getCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotals() {
    const items = this.getItems();
    const products = window.PIYOZ_PRODUCTS || [];

    let originalTotal = 0;
    let subtotal = 0;

    items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const itemOriginalPrice = product.oldPrice || product.price;
        originalTotal += itemOriginalPrice * item.quantity;
        subtotal += product.price * item.quantity;
      }
    });

    let discountSavings = Math.max(0, originalTotal - subtotal);

    // Apply promo code discount on top of subtotal if active
    const promo = this.getAppliedPromo();
    let promoSavings = 0;
    if (promo && promo.discountPercent > 0) {
      promoSavings = Math.round(subtotal * (promo.discountPercent / 100));
      discountSavings += promoSavings;
    }

    const discountedSubtotal = Math.max(0, subtotal - promoSavings);

    // Free delivery rule: Free if subtotal >= 100,000 UZS or cart is empty
    const deliveryFee = (items.length === 0 || discountedSubtotal >= 100000) ? 0 : 20000;
    const finalTotal = items.length === 0 ? 0 : discountedSubtotal + deliveryFee;

    return {
      originalTotal,
      subtotal,
      promoSavings,
      discountSavings,
      deliveryFee,
      finalTotal,
      appliedPromo: promo,
      itemsCount: this.getCount()
    };
  },

  updateBadges() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('badge-bump');
        setTimeout(() => badge.classList.remove('badge-bump'), 300);
      } else {
        badge.classList.add('hidden');
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.PiyozCart = PiyozCart;
}
