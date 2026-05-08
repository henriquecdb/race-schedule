export const fetchRacesByCategory = async (category) => {
  const endpointByCategory = {
    indy: '/api/indy',
    imsa: '/api/imsa',
    wec: '/api/wec',
  };
  const endpoint = endpointByCategory[category] ?? '/api/imsa';
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Falha ao carregar o cronograma.');
  }

  return response.json();
};
