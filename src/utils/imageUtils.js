// Helper function to get responsive image sources
export function getResponsiveImageSrc(imageName) {
  try {
    // Just return the original image without optimization
    return {
      src: imageName,
      srcSet: undefined,
      placeholder: imageName
    };
  } catch (e) {
    console.error("Error generating responsive image sources:", e);
    return { src: imageName }; // Fallback to original image
  }
}

// Function to preload critical images
export function preloadCriticalImages(imageArray) {
  if (typeof window === 'undefined') return; // Skip on server-side
  
  // Use requestIdleCallback for non-blocking preloading
  const preloadImage = (src) => {
    if (!src) return;
    
    const doPreload = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };
    
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => doPreload());
    } else {
      setTimeout(doPreload, 1);
    }
  };
  
  // Preload each image
  imageArray.forEach(img => {
    if (typeof img === 'string') {
      preloadImage(img);
    } else if (img && img.src) {
      preloadImage(img.src);
    }
  });
}

// Calculate aspect ratio for image placeholders
export function calculateAspectRatio(width, height) {
  return (height / width) * 100;
}

// Generate appropriate sizes attribute for img tag
export function getSizesAttribute(defaultSize = '100vw') {
  return defaultSize;
} 