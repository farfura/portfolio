
export function getResponsiveImageSrc(imageName) {
  try {
    
    return {
      src: imageName,
      srcSet: undefined,
      placeholder: imageName
    };
  } catch (e) {
    console.error("Error generating responsive image sources:", e);
    return { src: imageName }; 
  }
}


export function preloadCriticalImages(imageArray) {
  if (typeof window === 'undefined') return; 
 
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
  
 
  imageArray.forEach(img => {
    if (typeof img === 'string') {
      preloadImage(img);
    } else if (img && img.src) {
      preloadImage(img.src);
    }
  });
}

export function calculateAspectRatio(width, height) {
  return (height / width) * 100;
}


export function getSizesAttribute(defaultSize = '100vw') {
  return defaultSize;
} 