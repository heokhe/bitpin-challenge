export const fetcher = async (key) => {
  const res = await fetch(key);
  const data = await res.json();
  return data;
};
