const ranges = {
  years: 3600 * 24 * 365,
  months: 3600 * 24 * 30,
  weeks: 3600 * 24 * 7,
  days: 3600 * 24,
  hours: 3600,
  minutes: 60,
  seconds: 1,
}

export function relativeTime(
  input: Date | string | number,
) {
  const date = new Date(input);
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  const elapsed = (date.getTime() - Date.now()) / 1000;

  for (const [unit, seconds] of Object.entries(ranges)) {
    if (Math.abs(elapsed) > seconds || unit === 'seconds') {
      return rtf.format(Math.round(elapsed / seconds), unit as Intl.RelativeTimeFormatUnit);
    }
  }

}