import React, { useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className='w-20 h-20 object-cover object-center rounded-fullF'
    />
  );
};

export default ImageWithFallback;
