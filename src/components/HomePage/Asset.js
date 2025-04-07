import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useIntersectionImageLoader } from '../../customHooks/useIntersectionImageLoader'
import './Asset.css';

function Asset({ title, color, onEnterPress, onFocus, image, data = {} }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: { title, color, image, data }
  });

  const { imgRef, shouldLoad, imageUrl } = useIntersectionImageLoader(image);

  return (
    <div ref={ref} className={`asset-wrapper ${focused ? 'focused' : ''}`}>
      <div className={`card ${focused ? 'focused' : ''}`}>
        {shouldLoad ? (
          <img
            className={`card-image ${focused ? 'focused' : ''}`}
            ref={imgRef}
            src={imageUrl}
            alt={title}
          />
        ) : (
          <div className="shimmer card-image" ref={imgRef} />
        )}
      </div>
    </div>
  );
}

export default Asset;
