const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || '';

export const getImageSrc = (img, fallback = '/slider/Slider.jpg') => {
  if (!img) return fallback;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('/')) return img;
  return `${BASE_URL}/uploads/${img}`;
};
