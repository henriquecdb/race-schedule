import { useEffect, useState } from 'react';
import { fetchRacesByCategory } from '../services/raceService';

export const useRaces = (category) => {
  const [races, setRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRaces = async () => {
      setIsLoading(true);

      try {
        const racesData = await fetchRacesByCategory(category);
        setRaces(racesData);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRaces();
  }, [category]);

  return { races, isLoading, error };
};
