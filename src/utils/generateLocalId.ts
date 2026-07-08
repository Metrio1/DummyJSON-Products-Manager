export const generateLocalId = (existingIds: number[]): number => {
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return maxId + 1 + Math.floor(Math.random() * 1000);
};
