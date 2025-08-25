export const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (!value && required) throw new Error(`Missing env var: ${key}`);
  return value || '';
};
