// Service Worker for caching and offline support
const CACHE_NAME = 'portfolio-cache-v1';

// Assets to cache initially
const INITIAL_CACHED_RESOURCES = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.jsx',
  '/src/App.jsx',
  '/favicon.png'
];

// Install event - cache initial resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(INITIAL_CACHED_RESOURCES);
    })
  );
  self.skipWaiting(); // Take control immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // Take control of all clients
});

// Helper function to determine if request is for an image
const isImageRequest = (request) => {
  const url = new URL(request.url);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico'];
  return imageExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
};

// Helper function to determine if request is for a font
const isFontRequest = (request) => {
  const url = new URL(request.url);
  const fontExtensions = ['.woff', '.woff2', '.ttf', '.otf', '.eot'];
  return fontExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
};

// Helper function to determine if request is for a 3D model
const isModelRequest = (request) => {
  const url = new URL(request.url);
  return url.pathname.toLowerCase().endsWith('.glb');
};

// Stale-while-revalidate strategy for dynamic content
const staleWhileRevalidate = async (request) => {
  // Try to get from cache
  const cachedResponse = await caches.match(request);
  
  // Clone the request for the fetch call
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      // Clone the response before putting it in the cache
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.error('Fetch failed:', error);
    // You might return a custom offline page or fallback here
  });
  
  return cachedResponse || fetchPromise;
};

// Cache-first strategy for static assets like images and fonts
const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache-first fetch failed:', error);
    // Could return a placeholder image or fallback here
  }
};

// Network-first strategy for API requests
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
};

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Only cache GET requests
  if (request.method !== 'GET') return;
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) return;
  
  // Apply different strategies based on request type
  if (isImageRequest(request) || isFontRequest(request) || isModelRequest(request)) {
    // Use cache-first for static assets
    event.respondWith(cacheFirst(request));
  } else if (request.url.includes('/api/')) {
    // Use network-first for API requests
    event.respondWith(networkFirst(request));
  } else {
    // Use stale-while-revalidate for everything else
    event.respondWith(staleWhileRevalidate(request));
  }
}); 