import { parseRaceDate, parseRaceTime } from '../utils/raceDate';

const pad = (value) => String(value).padStart(2, '0');

const formatCalendarDate = (date) => {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
};

const formatCalendarDateTime = (date) => {
  return `${formatCalendarDate(date)}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
};

export const createGoogleCalendarUrl = ({ race, category }) => {
  const dateOnly = race.date?.split('T')[0];
  const eventDate = parseRaceDate(dateOnly || race.date);
  const time = parseRaceTime(race.time);

  let dates;

  if (!time) {
    const endDate = new Date(eventDate);
    endDate.setDate(endDate.getDate() + 1);
    dates = `${formatCalendarDate(eventDate)}/${formatCalendarDate(endDate)}`;
  } else {
    const start = new Date(eventDate);
    start.setHours(time.hours, time.minutes, 0, 0);

    const end = new Date(start);
    end.setHours(end.getHours() + 2);

    dates = `${formatCalendarDateTime(start)}/${formatCalendarDateTime(end)}`;
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: race.name,
    dates,
    details: `Corrida ${category.toUpperCase()} adicionada pelo Race Schedule.`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const openRaceInGoogleCalendar = ({ race, category }) => {
  const url = createGoogleCalendarUrl({ race, category });
  window.open(url, '_blank', 'noopener,noreferrer');
};
