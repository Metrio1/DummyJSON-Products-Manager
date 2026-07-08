export const productKeys = {
  all: ['products'] as const,
  list: (params?: { limit?: number; skip?: number }) => [...productKeys.all, params] as const,
};
