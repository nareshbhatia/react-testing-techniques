/**
 * formats an ISO 8601 formatted date to local date and time
 *
 * Examples:
 *   formatISODate('2021-01-01T14:00:00.000Z') =>
 */
const formatISODate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const DateUtils = {
  formatISODate,
};
