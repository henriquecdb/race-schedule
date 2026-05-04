import { formatDate, isNextRace, isRacePassed } from '../utils/raceDate';

function RaceTable({ races, category, onAddRace }) {
  return (
    <div className="table-wrap">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Corrida</th>
            <th>Data</th>
            <th>Horário</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => {
            const passed = isRacePassed(race.date);
            const next = isNextRace(race.date, races);

            return (
              <tr
                key={race.id}
                className={`${passed ? 'race-passed' : ''} ${next ? 'race-next' : ''}`}
              >
                <td>
                  <span className="race-name">{race.name}</span>
                  {passed && (
                    <span className="race-status race-status-passed">Realizada</span>
                  )}
                  {next && (
                    <span className="race-status race-status-next">Próxima</span>
                  )}
                </td>
                <td>{formatDate(race.date)}</td>
                <td>{race.time || '-'}</td>
                <td className="race-action">
                  {!passed && (
                    <button
                      type="button"
                      className="race-add-btn"
                      title="Adicionar corrida"
                      aria-label={`Adicionar ${race.name}`}
                      onClick={() => onAddRace(race)}
                    >
                      <i className="fa-solid fa-plus" aria-hidden="true"></i>
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RaceTable;
