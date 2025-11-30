import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Handle iframe load event
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen bg-background overflow-hidden relative">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="mt-4 text-muted-foreground text-sm font-medium animate-pulse">
            در حال بارگذاری...
          </p>
        </div>
      )}

      {/* Full Screen Iframe */}
      <iframe
        src="https://airaai.co"
        className={`w-full h-full border-0 transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        title="Aira AI"
        onLoad={handleLoad}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
