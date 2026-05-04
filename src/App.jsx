import { useState } from 'react';
import './App.css';
import RaceTable from './components/RaceTable';
import { useRaces } from './hooks/useRaces';
import { openRaceInGoogleCalendar } from './services/googleCalendarService';

function App() {
  const [category, setCategory] = useState('indy');
  const { races, isLoading, error } = useRaces(category);

  const handleAddToGoogleCalendar = (race) => {
    openRaceInGoogleCalendar({ race, category });
  };

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
            <RaceTable
              races={races}
              onAddRace={handleAddToGoogleCalendar}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
