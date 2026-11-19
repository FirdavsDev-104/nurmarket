/**
 * PIYOZ MARKET - Wishlist & Favorites System
 * Handles persistent storage, toggle states, counter badges and event dispatching.
 */

const PiyozWishlist = {
  STORAGE_KEY: 'piyoz_market_wishlist',

  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading wishlist from localStorage:', e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('piyoz:wishlist-updated', {
        detail: { items, count: items.length }
      }));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  },

  has(productId) {
    const items = this.getItems();
    return items.includes(productId);
  },

  toggle(productId) {
    let items = this.getItems();
    const index = items.indexOf(productId);
    let added = false;

    if (index > -1) {
      items.splice(index, 1);
      added = false;
    } else {
      items.push(productId);
      added = true;
    }

    this.saveItems(items);
    return added;
  },

  add(productId) {
    let items = this.getItems();
    if (!items.includes(productId)) {
      items.push(productId);
      this.saveItems(items);
    }
  },

  remove(productId) {
    let items = this.getItems();
    items = items.filter(id => id !== productId);
    this.saveItems(items);
  },

  clear() {
    this.saveItems([]);
  },

  getCount() {
    return this.getItems().length;
  },

  updateBadges() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.wishlist-count-badge');
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

    // Update all heart icons currently rendered in DOM
    const heartBtns = document.querySelectorAll(`[data-wishlist-id]`);
    heartBtns.forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      const isFav = this.has(id);
      btn.classList.toggle('active', isFav);
      btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
    });
  }
};

if (typeof window !== 'undefined') {
  window.PiyozWishlist = PiyozWishlist;
}
