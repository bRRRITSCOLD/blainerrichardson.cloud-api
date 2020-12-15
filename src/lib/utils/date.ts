export const dateUtils = {
  dateTime(dateValue: any): string {
    if (dateValue instanceof Date) {
      return (dateValue as Date).toISOString();
    } else {
      return new Date(dateValue).toISOString();
    }
  },
};
