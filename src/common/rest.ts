export const fetchJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const fetchSwapi = (endPoint: string) =>
  fetchJson(`https://swapi.dev/api/${endPoint}`);

export const fetchPeople = (query: string) =>
  fetchSwapi(`people${query ? `?search=${query}` : ``}`);
