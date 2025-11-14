import React, { useState, useEffect } from 'react';

export const Background: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch a new random image from picsum.photos
    const url = `https://picsum.photos/1920/1080?random=${Date.now()}`;
    
    // Preload the image to ensure it's ready before displaying
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageUrl(url);
      setIsLoading(false);
    };
    img.onerror = () => {
      // If picsum fails for any reason, we can have a fallback or try again
      // For simplicity, we'll just log the error and the app will have a black background
      console.error(`Failed to load image: ${url}`);
      // As a fallback, try again with a different random seed
      const fallbackUrl = `https://picsum.photos/1920/1080?random=${Date.now() + 1}`;
      setImageUrl(fallbackUrl);
      setIsLoading(false);
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: isLoading ? 0 : 1
        }}
        aria-label="Dynamic background image"
      />
    </div>
  );
};