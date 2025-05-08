import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { preloadCriticalImages } from "./utils/imageUtils";

// Critical images that should be preloaded
const criticalImages = [
  // Add other critical images here if needed
];

const Root = () => {
  useEffect(() => {
    // Preload critical images on app start
    preloadCriticalImages(criticalImages);
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered:', registration);
          })
          .catch(error => {
            console.log('SW registration failed:', error);
          });
      });
    }
  }, []);

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
