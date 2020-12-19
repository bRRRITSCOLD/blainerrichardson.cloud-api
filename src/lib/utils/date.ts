(Date as any).prototype.isValid = function () {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return this.getTime() === this.getTime();
};

export const dateUtils = {
  dateTime(dateValue: any): string {
    if (dateValue instanceof Date) {
      return (dateValue as Date).toISOString();
    } else {
      return new Date(dateValue).toISOString();
    }
  },
  isValid(dateValue: any): boolean {
    return (new Date(dateValue) as any).isValid();
  },
};
