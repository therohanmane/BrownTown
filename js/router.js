/**
 * INBrownTown - SPA URL Hash Router
 * Handles seamless view navigation, browser history, and syncs desktop & mobile navs
 */

class INBrownTownRouter {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
    this.currentParams = {};
    
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  register(pattern, handler) {
    this.routes[pattern] = handler;
  }

  navigate(path) {
    window.location.hash = path.startsWith('#') ? path : '#' + path;
  }

  handleRouting() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathOnly, queryString] = rawHash.split('?');
    
    // Parse query params if any
    const queryParams = {};
    if (queryString) {
      new URLSearchParams(queryString).forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    let matched = false;

    // Direct match
    if (this.routes[pathOnly]) {
      this.currentRoute = pathOnly;
      this.currentParams = { ...queryParams };
      this.routes[pathOnly](this.currentParams);
      matched = true;
    } else {
      // Pattern match with params e.g. /article/:id or /category/:id
      for (const pattern in this.routes) {
        if (pattern.includes(':')) {
          const patternParts = pattern.split('/');
          const pathParts = pathOnly.split('/');

          if (patternParts.length === pathParts.length) {
            const params = { ...queryParams };
            let isMatch = true;

            for (let i = 0; i < patternParts.length; i++) {
              if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].slice(1);
                params[paramName] = decodeURIComponent(pathParts[i]);
              } else if (patternParts[i] !== pathParts[i]) {
                isMatch = false;
                break;
              }
            }

            if (isMatch) {
              this.currentRoute = pattern;
              this.currentParams = params;
              this.routes[pattern](params);
              matched = true;
              break;
            }
          }
        }
      }
    }

    // Fallback to Home if not matched
    if (!matched && this.routes['/']) {
      this.currentRoute = '/';
      this.currentParams = {};
      this.routes['/']({});
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Highlight active nav item and sync bottom bar
    this.updateActiveNavUI(pathOnly);
    if (window.UI && window.UI.updateBottomNavUI) {
      window.UI.updateBottomNavUI(pathOnly);
    }
  }

  updateActiveNavUI(currentPath) {
    document.querySelectorAll('.nav-item-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.replace('#', '') || '/';
      if (linkPath === currentPath || (currentPath.startsWith('/category/') && linkPath === currentPath)) {
        link.classList.add('active');
      } else if (currentPath === '/' && (linkPath === '/' || linkPath === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

window.INB_ROUTER = new INBrownTownRouter();
