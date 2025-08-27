export const badges: string[] = [
  'accent',
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
];

export const randomBadge = (): string => {
  return badges[Math.floor(Math.random() * badges.length)];
};

export const mapBadges = (
  data: string[]
): Array<{ element: string; badge: string | undefined }> => {
  const result = data.map((item) => ({
    element: item,
    badge: badges[Math.floor(Math.random() * badges.length)],
  }));
  return result;
};
