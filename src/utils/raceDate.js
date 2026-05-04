export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const parseRaceDate = (dateString) => {
  const [year, month, day] = (dateString || '').split('-').map(Number);

  if ([year, month, day].every(Number.isFinite)) {
    return new Date(year, month - 1, day);
  }

  return new Date(dateString);
};

export const parseRaceTime = (timeString) => {
  if (!timeString || timeString === '-') {
    return null;
  }

  const match = String(timeString).trim().match(/(\d{1,2})[:h](\d{2})/i);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  return { hours, minutes };
};

export const isRacePassed = (dateString) => {
  const raceDate = parseRaceDate(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  raceDate.setHours(0, 0, 0, 0);
  return raceDate < today;
};

export const isNextRace = (raceDate, allRaces) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureRaces = allRaces
    .filter((race) => {
      const date = parseRaceDate(race.date);
      date.setHours(0, 0, 0, 0);
      return date >= today;
    })
    .sort((a, b) => parseRaceDate(a.date) - parseRaceDate(b.date));

  if (futureRaces.length === 0) {
    return false;
  }

  const current = parseRaceDate(raceDate);
  current.setHours(0, 0, 0, 0);

  const nextDate = parseRaceDate(futureRaces[0].date);
  nextDate.setHours(0, 0, 0, 0);

  return current.getTime() === nextDate.getTime();
};
