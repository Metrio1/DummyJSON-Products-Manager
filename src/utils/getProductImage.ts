const PALETTE = ['1a1a2e', '16213e', '0f3460', '533483', 'e94560'];

const LOCAL_FALLBACK = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#0f3460"/><text x="50%" y="50%" fill="#eaeaea" font-size="16" text-anchor="middle" dominant-baseline="middle">No image</text></svg>',
)}`;

export const getProductPlaceholder = (title: string, size = 300): string => {
  const color = PALETTE[title.length % PALETTE.length];
  const label = encodeURIComponent(title.slice(0, 24));

  return `https://placehold.co/${size}x${size}/${color}/eaeaea?text=${label}`;
};

export const getProductImageFallback = (): string => LOCAL_FALLBACK;
