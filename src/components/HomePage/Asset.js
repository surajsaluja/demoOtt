// Asset.js
import React, { useState, useRef, useEffect } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import './Asset.css';

const imageCache = new Set(); // Global cache

function Asset({ title, color, onEnterPress, onFocus, image, data = {} }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: { title, color, image, data },
  });

  const imgRef = useRef();
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(imageCache.has(image));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "450px", // preload just before coming into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    imageCache.add(image);
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className={`asset-wrapper ${focused ? 'focused' : ''}`}>
      <div className={`card ${focused ? 'focused' : ''}`} ref={imgRef}>
        {!isLoaded && <div className="shimmer-placeholder" />} {/* show shimmer only if not loaded */}

        {isInView && (
          <img
            src={image}
            alt={title}
            onLoad={handleImageLoad}
            className={`card-image ${focused ? 'focused' : ''} ${isLoaded ? 'fade-in' : 'hidden'}`}
          />
        )}
      </div>
    </div>
  );
}

export default Asset;
