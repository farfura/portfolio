import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import for bundling only - not used directly
import cvPdf from '../assets/Fareeha_Nadeem_Cv.pdf';

// Public path is more reliable for direct access
const PUBLIC_PDF_PATH = '/assets/Fareeha_Nadeem_Cv.pdf';

// Helper to detect if using Safari on iOS
const isIOSSafari = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isIOS && isSafari;
};

const ViewCV = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  
  // Function to safely view PDF in a new tab (for non-Safari)
  const viewPdf = (e) => {
    e.preventDefault();
    window.open(PUBLIC_PDF_PATH, '_blank');
  };
  
  // Function to safely download PDF without navigation
  const downloadPdf = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    
    // Create a link and click it - use public path
    const link = document.createElement('a');
    link.href = PUBLIC_PDF_PATH;
    link.setAttribute('download', 'Fareeha_Nadeem_CV.pdf');
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Clean up and reset state after small delay
    setTimeout(() => {
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1000);
  };
  
  useEffect(() => {
    // Set document title
    document.title = 'Fareeha Nadeem - CV';
    
    // Detect Safari
    setIsSafari(isIOSSafari());
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Auto-download if query parameter is present (for non-Safari)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('download') === 'true' && !isIOSSafari()) {
      const autoDownloadTimer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = PUBLIC_PDF_PATH;
        link.setAttribute('download', 'Fareeha_Nadeem_CV.pdf');
        link.setAttribute('target', '_blank');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 1000);
      }, 500);
      
      return () => clearTimeout(autoDownloadTimer);
    }
  }, []);

  return (
    <div className="pt-16 px-4 min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full mb-4">
        <Link 
          to="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      {isSafari ? (
        // Safari-specific renderer with iframe embed
        <motion.div
          className="flex-1 w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <iframe
            src={PUBLIC_PDF_PATH}
            className="w-full h-[80vh]"
            title="Fareeha Nadeem CV"
            frameBorder="0"
          />
        </motion.div>
      ) : (
        // Standard view for all other browsers
        <motion.div 
          className="flex-1 w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Fareeha Nadeem - CV</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              You can view or download my CV using one of the options below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
              <button
                onClick={viewPdf}
                className="flex items-center justify-center bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View PDF
              </button>
              
              <button 
                onClick={downloadPdf}
                disabled={isDownloading}
                className={`flex items-center justify-center ${isDownloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg transition-colors`}
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download CV
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ViewCV; 