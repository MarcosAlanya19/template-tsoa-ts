export const generateSchedule = (): string[] => {
  const schedule: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of ['00', '30']) {
      const time = `${hour.toString().padStart(2, '0')}:${minute}`;
      schedule.push(time);
    }
  }
  return schedule;
}
