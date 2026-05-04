import { useEffect, useState } from 'react';
import './App.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const isRacePassed = (dateString) => {
  const raceDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  raceDate.setHours(0, 0, 0, 0);
  return raceDate < today;
};

const isNextRace = (raceDate, allRaces) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureRaces = allRaces
    .filter((race) => {
      const date = new Date(race.date);
      date.setHours(0, 0, 0, 0);
      return date >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (futureRaces.length === 0) return false;

  const date = new Date(raceDate);
  date.setHours(0, 0, 0, 0);
  const nextDate = new Date(futureRaces[0].date);
  nextDate.setHours(0, 0, 0, 0);

  return date.getTime() === nextDate.getTime();
};

function App() {
  const [races, setRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('indy');

  useEffect(() => {
    const fetchRaces = async () => {
      setIsLoading(true);

      try {
        const endpoint = category === 'indy' ? '/api/indy' : '/api/imsa';
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error('Falha ao carregar o cronograma.');
        }

        const racesData = await res.json();
        setRaces(racesData);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaces();
  }, [category]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Season overview</p>
          <h1>Schedule | 2026</h1>
        </div>

        <nav className="app-nav" aria-label="Primary navigation">
          <button
            className={`nav-button ${category === 'imsa' ? 'active' : ''}`}
            onClick={() => setCategory('imsa')}
            aria-pressed={category === 'imsa'}
          >
            IMSA
          </button>
          <button
            className={`nav-button ${category === 'indy' ? 'active' : ''}`}
            onClick={() => setCategory('indy')}
            aria-pressed={category === 'indy'}
          >
            INDY
          </button>
        </nav>
      </header>

      <main className="app-main">
        <section
          className="table-card"
          aria-labelledby="table-title"
          id={category}
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">Calendar</p>
              <h3 id="table-title">{category.toUpperCase()} Schedule</h3>
            </div>
            <span className="table-badge">2026</span>
          </div>

          {isLoading ? (
            <div className="table-state">Loading races...</div>
          ) : error ? (
            <div className="table-state table-state-error">{error}</div>
          ) : races.length === 0 ? (
            <div className="table-state">Sem corridas encontradas.</div>
          ) : (
            <div className="table-wrap">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Corrida</th>
                    <th>Data</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {races.map((race) => {
                    const passed = isRacePassed(race.date);
                    const isNext = isNextRace(race.date, races);
                    return (
                      <tr
                        key={race.id}
                        className={`${passed ? 'race-passed' : ''} ${isNext ? 'race-next' : ''}`}
                      >
                        <td>
                          <span className="race-name">{race.name}</span>
                          {passed && (
                            <span className="race-status race-status-passed">
                              Realizada
                            </span>
                          )}
                          {isNext && (
                            <span className="race-status race-status-next">
                              Próxima
                            </span>
                          )}
                        </td>
                        <td>{formatDate(race.date)}</td>
                        <td>{race.time || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
