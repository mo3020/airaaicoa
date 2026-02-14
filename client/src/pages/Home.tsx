import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@assets/sepas.png";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={logoUrl} 
              alt="سپاس" 
              className="w-64 h-64 object-contain drop-shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State (visible only after splash if iframe isn't ready) */}
      {!showSplash && !iframeLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="mt-4 text-muted-foreground text-sm font-medium animate-pulse">
            در حال بارگذاری...
          </p>
        </div>
      )}

      {/* Full Screen Iframe */}
      <iframe
        src="https://eshop.kiosk-online.ir/"
        className={`w-full h-full border-0 transition-opacity duration-700 ${
          !showSplash ? "opacity-100" : "opacity-0"
        }`}
        title="Aira AI"
        onLoad={handleLoad}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
