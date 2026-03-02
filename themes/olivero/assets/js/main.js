/**
 * Olivero Theme JavaScript
 * Handles navigation interactions, scroll behavior, and accessibility features
 */

(function() {
  'use strict';

  // Global Olivero object
  window.Olivero = window.Olivero || {};

  // Configuration
  const config = {
    headerSelector: '.site-header',
    mobileNavButtonSelector: '.mobile-nav-button',
    mobileNavPanelSelector: '.mobile-nav-panel',
    primaryNavSelector: '.primary-nav',
    dropdownToggleSelector: '.dropdown-toggle',
    mobileSubmenuToggleSelector: '.mobile-submenu-toggle',
    scrollThreshold: 50, // Hide header after scrolling down this many pixels
    debounceDelay: 100
  };

  // State management
  const state = {
    isDesktopNav: false,
    isHeaderHidden: false,
    lastScrollY: 0,
    scrollDirection: 'down',
    resizeTimer: null
  };

  /**
   * Utility functions
   */
  const utils = {
    /**
     * Debounce function to limit how often a function can be called
     */
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Check if we're in desktop navigation mode
     */
    isDesktopNav: function() {
      const mobileNavButton = document.querySelector(config.mobileNavButtonSelector);
      if (!mobileNavButton) return true;
      
      const styles = window.getComputedStyle(mobileNavButton);
      return styles.display === 'none';
    },

    /**
     * Get the current scroll position
     */
    getScrollY: function() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },

    /**
     * Smooth scroll to element
     */
    scrollToElement: function(element, offset = 0) {
      const targetY = element.offsetTop - offset;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    },

    /**
     * Toggle ARIA attributes
     */
    toggleAria: function(element, attribute) {
      const currentValue = element.getAttribute(attribute);
      const newValue = currentValue === 'true' ? 'false' : 'true';
      element.setAttribute(attribute, newValue);
      return newValue;
    },

    /**
     * Set ARIA attributes
     */
    setAria: function(element, attribute, value) {
      element.setAttribute(attribute, value);
    },

    /**
     * Add/remove classes
     */
    addClass: function(element, className) {
      if (element) element.classList.add(className);
    },

    removeClass: function(element, className) {
      if (element) element.classList.remove(className);
    },

    toggleClass: function(element, className) {
      if (element) element.classList.toggle(className);
    },

    hasClass: function(element, className) {
      return element ? element.classList.contains(className) : false;
    }
  };

  /**
   * Header scroll behavior
   */
  const headerScroll = {
    init: function() {
      window.addEventListener('scroll', this.handleScroll.bind(this));
      this.checkInitialScroll();
    },

    handleScroll: function() {
      const currentScrollY = utils.getScrollY();
      const header = document.querySelector(config.headerSelector);
      
      if (!header) return;

      // Determine scroll direction
      if (currentScrollY > state.lastScrollY) {
        state.scrollDirection = 'down';
      } else {
        state.scrollDirection = 'up';
      }

      // Hide/show header based on scroll
      if (currentScrollY > config.scrollThreshold) {
        if (state.scrollDirection === 'down' && !state.isHeaderHidden) {
          utils.addClass(header, 'header-hidden');
          state.isHeaderHidden = true;
        } else if (state.scrollDirection === 'up' && state.isHeaderHidden) {
          utils.removeClass(header, 'header-hidden');
          state.isHeaderHidden = false;
        }
      } else {
        // Always show header when at top
        utils.removeClass(header, 'header-hidden');
        state.isHeaderHidden = false;
      }

      state.lastScrollY = currentScrollY;
    },

    checkInitialScroll: function() {
      const currentScrollY = utils.getScrollY();
      if (currentScrollY > config.scrollThreshold) {
        state.lastScrollY = currentScrollY;
      }
    }
  };

  /**
   * Mobile navigation
   */
  const mobileNav = {
    init: function() {
      this.bindEvents();
      this.checkNavMode();
    },

    bindEvents: function() {
      // Mobile nav button
      const mobileNavButton = document.querySelector(config.mobileNavButtonSelector);
      if (mobileNavButton) {
        mobileNavButton.addEventListener('click', this.toggleMobileNav.bind(this));
      }

      // Mobile submenu toggles
      const mobileSubmenuToggles = document.querySelectorAll(config.mobileSubmenuToggleSelector);
      mobileSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', this.toggleMobileSubmenu.bind(this));
      });

      // Close mobile nav when clicking outside
      document.addEventListener('click', this.handleOutsideClick.bind(this));

      // Handle resize
      window.addEventListener('resize', utils.debounce(this.checkNavMode.bind(this), config.debounceDelay));

      // Handle escape key
      document.addEventListener('keydown', this.handleKeydown.bind(this));
    },

    toggleMobileNav: function(event) {
      const button = event.currentTarget;
      const panel = document.querySelector(config.mobileNavPanelSelector);
      
      if (!panel) return;

      const isExpanded = utils.toggleAria(button, 'aria-expanded');
      utils.setAria(panel, 'aria-hidden', !isExpanded);

      // Focus management
      if (isExpanded) {
        // Focus first link in mobile nav
        const firstLink = panel.querySelector('a');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore body scroll
        document.body.style.overflow = '';
      }
    },

    toggleMobileSubmenu: function(event) {
      const toggle = event.currentTarget;
      const menuItem = toggle.closest('.mobile-primary-menu-item');
      const submenu = menuItem.querySelector('.mobile-submenu');
      
      if (!submenu) return;

      const isExpanded = utils.toggleAria(toggle, 'aria-expanded');
      utils.setAria(submenu, 'aria-hidden', !isExpanded);
    },

    handleOutsideClick: function(event) {
      const mobileNavButton = document.querySelector(config.mobileNavButtonSelector);
      const mobileNavPanel = document.querySelector(config.mobileNavPanelSelector);
      
      if (!mobileNavButton || !mobileNavPanel) return;

      const isClickInsideNav = mobileNavButton.contains(event.target) || 
                              mobileNavPanel.contains(event.target);
      
      if (!isClickInsideNav && mobileNavButton.getAttribute('aria-expanded') === 'true') {
        this.closeMobileNav();
      }
    },

    handleKeydown: function(event) {
      if (event.key === 'Escape') {
        this.closeMobileNav();
      }
    },

    closeMobileNav: function() {
      const mobileNavButton = document.querySelector(config.mobileNavButtonSelector);
      const mobileNavPanel = document.querySelector(config.mobileNavPanelSelector);
      
      if (!mobileNavButton || !mobileNavPanel) return;

      utils.setAria(mobileNavButton, 'aria-expanded', 'false');
      utils.setAria(mobileNavPanel, 'aria-hidden', 'true');
      document.body.style.overflow = '';
      mobileNavButton.focus();
    },

    checkNavMode: function() {
      const wasDesktopNav = state.isDesktopNav;
      state.isDesktopNav = utils.isDesktopNav();

      // If we switched from mobile to desktop, close mobile nav
      if (!wasDesktopNav && state.isDesktopNav) {
        this.closeMobileNav();
      }
    }
  };

  /**
   * Desktop dropdown navigation
   */
  const desktopNav = {
    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      // Handle hover and focus for dropdowns
      const dropdownItems = document.querySelectorAll('.primary-menu-item.has-children');
      dropdownItems.forEach(item => {
        const link = item.querySelector('.primary-menu-link');
        const toggle = item.querySelector('.dropdown-toggle');
        
        if (link) {
          link.addEventListener('mouseenter', () => this.showDropdown(item));
          link.addEventListener('focus', () => this.showDropdown(item));
          link.addEventListener('mouseleave', () => this.hideDropdown(item));
        }
        
        if (toggle) {
          toggle.addEventListener('click', this.handleDropdownToggle.bind(this));
        }
      });

      // Handle escape key for dropdowns
      document.addEventListener('keydown', this.handleKeydown.bind(this));

      // Handle click outside
      document.addEventListener('click', this.handleOutsideClick.bind(this));
    },

    showDropdown: function(item) {
      const dropdown = item.querySelector('.dropdown-menu');
      const toggle = item.querySelector('.dropdown-toggle');
      
      if (dropdown && toggle) {
        utils.setAria(toggle, 'aria-expanded', 'true');
      }
    },

    hideDropdown: function(item) {
      const dropdown = item.querySelector('.dropdown-menu');
      const toggle = item.querySelector('.dropdown-toggle');
      
      if (dropdown && toggle) {
        utils.setAria(toggle, 'aria-expanded', 'false');
      }
    },

    handleDropdownToggle: function(event) {
      event.preventDefault();
      const toggle = event.currentTarget;
      const menuItem = toggle.closest('.primary-menu-item');
      const isExpanded = utils.toggleAria(toggle, 'aria-expanded');
      
      // Close other dropdowns
      const otherDropdowns = document.querySelectorAll('.primary-menu-item.has-children');
      otherDropdowns.forEach(item => {
        if (item !== menuItem) {
          this.hideDropdown(item);
        }
      });
    },

    handleKeydown: function(event) {
      if (event.key === 'Escape') {
        const openDropdown = document.querySelector('.dropdown-toggle[aria-expanded="true"]');
        if (openDropdown) {
          const menuItem = openDropdown.closest('.primary-menu-item');
          this.hideDropdown(menuItem);
          openDropdown.focus();
        }
      }
    },

    handleOutsideClick: function(event) {
      const openDropdown = document.querySelector('.dropdown-toggle[aria-expanded="true"]');
      if (openDropdown && !openDropdown.closest('.primary-menu-item').contains(event.target)) {
        const menuItem = openDropdown.closest('.primary-menu-item');
        this.hideDropdown(menuItem);
      }
    }
  };

  /**
   * Search functionality
   */
  const search = {
    searchIndex: null,
    searchUrl: '/index.json',
    isLoading: false,
    
    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      const searchToggle = document.querySelector('.search-toggle');
      if (searchToggle) {
        searchToggle.addEventListener('click', this.toggleSearch.bind(this));
      }

      const searchBackdrop = document.getElementById('search-backdrop');
      if (searchBackdrop) {
        searchBackdrop.addEventListener('click', this.closeSearch.bind(this));
      }

      const searchClose = document.querySelector('.search-close');
      if (searchClose) {
        searchClose.addEventListener('click', this.closeSearch.bind(this));
      }

      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.addEventListener('input', utils.debounce(this.performSearch.bind(this), 300));
      }

      document.addEventListener('keydown', this.handleKeydown.bind(this));
    },

    toggleSearch: function(event) {
      const modal = document.getElementById('search-modal');
      if (!modal) return;
      
      const isHidden = modal.getAttribute('aria-hidden') !== 'false';
      
      if (isHidden) {
        this.openSearch();
      } else {
        this.closeSearch();
      }
    },

    openSearch: function() {
      const modal = document.getElementById('search-modal');
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      
      if (!modal) return;
      
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Reset search state
      if (searchResults) {
        searchResults.innerHTML = '<p class="search-empty">Start typing to search...</p>';
      }
      
      // Focus input
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
      
      // Load search index if not loaded
      if (!this.searchIndex) {
        this.loadSearchIndex();
      }
    },

    closeSearch: function() {
      const modal = document.getElementById('search-modal');
      const searchInput = document.getElementById('search-input');
      
      if (!modal) return;
      
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      
      // Clear search input
      if (searchInput) {
        searchInput.value = '';
      }
    },

    loadSearchIndex: function() {
      this.isLoading = true;
      
      fetch(this.searchUrl)
        .then(response => response.json())
        .then(data => {
          this.searchIndex = data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error loading search index:', error);
          this.isLoading = false;
        });
    },

    performSearch: function(event) {
      const query = event.target.value.trim().toLowerCase();
      const searchResults = document.getElementById('search-results');
      
      if (!searchResults) return;
      
      if (query.length === 0) {
        searchResults.innerHTML = '<p class="search-empty">Start typing to search...</p>';
        return;
      }
      
      if (this.isLoading) {
        searchResults.innerHTML = '<p class="search-loading"><span class="search-loading-spinner"></span>Loading...</p>';
        return;
      }
      
      if (!this.searchIndex) {
        searchResults.innerHTML = '<p class="search-loading"><span class="search-loading-spinner"></span>Loading index...</p>';
        this.loadSearchIndex();
        return;
      }
      
      const results = this.searchIndex.filter(item => {
        const titleMatch = item.title && item.title.toLowerCase().includes(query);
        const summaryMatch = item.summary && item.summary.toLowerCase().includes(query);
        const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(query));
        return titleMatch || summaryMatch || tagsMatch;
      });
      
      if (results.length === 0) {
        searchResults.innerHTML = '<p class="search-no-results">No results found for "' + query + '"</p>';
        return;
      }
      
      const resultsHtml = results.slice(0, 10).map(item => {
        const excerpt = item.summary ? item.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '';
        return '<a href="' + item.permalink + '" class="search-result-item">' +
          '<h3 class="search-result-title">' + item.title + '</h3>' +
          '<p class="search-result-excerpt">' + excerpt + '</p>' +
          '</a>';
      }).join('');
      
      searchResults.innerHTML = resultsHtml;
    },

    handleKeydown: function(event) {
      // Handle Ctrl/Cmd + K for search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        this.openSearch();
      }
      
      // Handle Escape to close search
      if (event.key === 'Escape') {
        const modal = document.getElementById('search-modal');
        if (modal && modal.getAttribute('aria-hidden') === 'false') {
          this.closeSearch();
        }
      }
    }
  };

  /**
   * Dark Mode / Theme Toggle
   */
  const darkMode = {
    STORAGE_KEY: 'olivero-theme',
    COLOR_SCHEME_KEY: 'olivero-color-scheme',
    
    init: function() {
      this.applyTheme();
      this.applyColorScheme();
      this.bindEvents();
    },

    bindEvents: function() {
      const themeToggle = document.querySelector('.theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));
      }

      // Color scheme selector
      const colorSchemeButtons = document.querySelectorAll('.color-scheme-option button');
      colorSchemeButtons.forEach(button => {
        button.addEventListener('click', this.handleColorSchemeChange.bind(this));
      });

      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleSystemPreferenceChange.bind(this));
    },

    getStoredTheme: function() {
      return localStorage.getItem(this.STORAGE_KEY);
    },

    getSystemPreference: function() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    applyTheme: function() {
      const storedTheme = this.getStoredTheme();
      const theme = storedTheme || this.getSystemPreference();
      
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    },

    toggleTheme: function(event) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      
      localStorage.setItem(this.STORAGE_KEY, newTheme);
    },

    handleSystemPreferenceChange: function(event) {
      // Only apply system preference if user hasn't set a custom preference
      if (!this.getStoredTheme()) {
        this.applyTheme();
      }
    },

    // Color Scheme Management
    getStoredColorScheme: function() {
      return localStorage.getItem(this.COLOR_SCHEME_KEY);
    },

    applyColorScheme: function() {
      const storedScheme = this.getStoredColorScheme() || 'blue';
      this.setColorScheme(storedScheme);
    },

    setColorScheme: function(scheme) {
      // Remove existing color scheme
      document.documentElement.removeAttribute('data-color-scheme');
      
      // Add new color scheme (except default blue)
      if (scheme && scheme !== 'blue') {
        document.documentElement.setAttribute('data-color-scheme', scheme);
      }
      
      // Update UI
      this.updateColorSchemeUI(scheme);
    },

    updateColorSchemeUI: function(activeScheme) {
      const buttons = document.querySelectorAll('.color-scheme-option button');
      buttons.forEach(button => {
        const scheme = button.getAttribute('data-color-scheme');
        if (scheme === activeScheme) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    },

    handleColorSchemeChange: function(event) {
      const button = event.currentTarget;
      const scheme = button.getAttribute('data-color-scheme');
      
      localStorage.setItem(this.COLOR_SCHEME_KEY, scheme);
      this.setColorScheme(scheme);
    }
  };

  /**
   * Accessibility enhancements
   */
  const accessibility = {
    init: function() {
      this.bindEvents();
      this.enhanceFocusManagement();
    },

    bindEvents: function() {
      // Handle focus management for skip links
      const skipLinks = document.querySelectorAll('.skip-link');
      skipLinks.forEach(link => {
        link.addEventListener('click', this.handleSkipLink.bind(this));
      });

      // Enhance keyboard navigation
      document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    },

    handleSkipLink: function(event) {
      const targetId = event.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        event.preventDefault();
        utils.scrollToElement(targetElement, 0);
        targetElement.focus();
      }
    },

    handleKeyboardNavigation: function(event) {
      // Tab navigation enhancements
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    },

    enhanceFocusManagement: function() {
      // Remove keyboard-navigation class when using mouse
      document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
      });
    }
  };

  /**
   * Initialize all components
   */
  const init = function() {
    // Initialize in the right order
    headerScroll.init();
    mobileNav.init();
    desktopNav.init();
    search.init();
    darkMode.init();
    accessibility.init();

    // Expose utilities globally
    Olivero.utils = utils;
    Olivero.state = state;

    console.log('Olivero theme initialized');
  };

  // Start the theme when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();