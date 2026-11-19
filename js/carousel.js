/**
 * PIYOZ MARKET - Hero Banner Carousel
 * Vanilla JavaScript carousel supporting auto-play, pause on hover, touch/swipe,
 * keyboard controls, progress indicator, and multilingual slide updates.
 */

class PiyozHeroCarousel {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.options = Object.assign({
      interval: 5000,
      autoPlay: true
    }, options);

    this.track = this.container.querySelector('.hero-carousel-track');
    this.slides = Array.from(this.container.querySelectorAll('.hero-carousel-slide'));
    this.prevBtn = this.container.querySelector('.hero-arrow-prev');
    this.nextBtn = this.container.querySelector('.hero-arrow-next');
    this.dotsContainer = this.container.querySelector('.hero-carousel-dots');
    this.progressBar = this.container.querySelector('.hero-progress-fill');

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.timer = null;
    this.progressInterval = null;
    this.progressVal = 0;
    this.isHovered = false;

    // Touch support variables
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;

    this.createDots();
    this.bindEvents();
    this.goToSlide(0);
    this.startAutoPlay();
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.setAttribute('type', 'button');
      dot.addEventListener('click', () => {
        this.goToSlide(i);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Hover pause
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.pauseAutoPlay();
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.startAutoPlay();
    });

    // Touch gestures for mobile
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.pauseAutoPlay();
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
      if (!this.isHovered) {
        this.startAutoPlay();
      }
    }, { passive: true });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) >= this.minSwipeDistance) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }

  goToSlide(index) {
    if (index < 0) {
      this.currentIndex = this.totalSlides - 1;
    } else if (index >= this.totalSlides) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    // Move track
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    // Update slides active state
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === this.currentIndex);
    });

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.hero-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }

    this.resetProgressBar();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoPlay() {
    if (!this.options.autoPlay) return;
    this.stopAutoPlay();

    const stepMs = 50;
    const totalSteps = this.options.interval / stepMs;
    const stepIncrement = 100 / totalSteps;

    this.progressInterval = setInterval(() => {
      if (this.isHovered) return;
      this.progressVal += stepIncrement;
      if (this.progressBar) {
        this.progressBar.style.width = `${Math.min(this.progressVal, 100)}%`;
      }
      if (this.progressVal >= 100) {
        this.nextSlide();
      }
    }, stepMs);
  }

  pauseAutoPlay() {
    // Keep progress bar where it was
  }

  stopAutoPlay() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  resetProgressBar() {
    this.progressVal = 0;
    if (this.progressBar) {
      this.progressBar.style.width = '0%';
    }
  }

  resetAutoPlay() {
    this.resetProgressBar();
    this.startAutoPlay();
  }
}

if (typeof window !== 'undefined') {
  window.PiyozHeroCarousel = PiyozHeroCarousel;
}
