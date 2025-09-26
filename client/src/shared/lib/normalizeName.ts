export const normalizeName = (name: string): string => {
  name = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return name.split('-').join(' ');
};
