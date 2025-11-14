
import React, { useState, useEffect } from 'react';

export const Background: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const newImageUrl = `https://picsum.photos/1920/1080?random=${Date.now()}`;
    
    // Preload image
    const img = new Image();
    img.src = newImageUrl;
    img.onload = () => {
      setImageUrl(newImageUrl);
      setIsLoading(false);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label="Dynamic background image"
    />
  );
};
