export const fetchRacesByCategory = async (category) => {
  const endpoint = category === 'indy' ? '/api/indy' : '/api/imsa';
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Falha ao carregar o cronograma.');
  }

  return response.json();
};
