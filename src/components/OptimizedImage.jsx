import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  placeholder = 'blur', 
  fallbackSrc,
  priority = false,
  sizes = '100vw'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // Generate blurry placeholder
  const blurPlaceholder = !loaded ? 
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjwvc3ZnPg==' : 
    null;

  useEffect(() => {
    // Reset states when src changes
    setLoaded(false);
    setError(false);
    
    // For priority images, eagerly load them
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setLoaded(true);
      };
      img.onerror = () => {
        setError(true);
        if (fallbackSrc) setImageSrc(fallbackSrc);
      };
    } else {
      // For non-priority images, use IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const img = new Image();
          img.src = src;
          
          img.onload = () => {
            setImageSrc(src);
            setLoaded(true);
            observer.disconnect();
          };
          
          img.onerror = () => {
            setError(true);
            if (fallbackSrc) setImageSrc(fallbackSrc);
            observer.disconnect();
          };
        }
      }, { rootMargin: '200px' }); // Start loading when within 200px of viewport
      
      // Create a temporary div to observe
      const div = document.createElement('div');
      document.body.appendChild(div);
      observer.observe(div);
      
      return () => {
        observer.disconnect();
        document.body.removeChild(div);
      };
    }
  }, [src, fallbackSrc, priority]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        backgroundColor: '#f0f0f0' // Light gray background while loading
      }}
    >
      {/* Placeholder or blurred version */}
      {!loaded && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backdropFilter: 'blur(8px)' }}
        />
      )}
      
      {/* Actual image */}
      {(imageSrc || (!error && priority)) && (
        <img
          src={imageSrc || (priority ? src : blurPlaceholder)}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            if (fallbackSrc) setImageSrc(fallbackSrc);
          }}
        />
      )}
      
      {/* Fallback for error */}
      {error && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <span className="text-sm">{alt || 'Image not available'}</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 