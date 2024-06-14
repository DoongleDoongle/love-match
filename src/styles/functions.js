export const calculateMainLayoutHeight = (theme) =>
  `calc(var(--vh) * 100 - ${theme.header.height})`;
