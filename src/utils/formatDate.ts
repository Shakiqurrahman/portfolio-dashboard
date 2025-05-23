export const formatDate = (
    date: string | Date,
    options?: Intl.DateTimeFormatOptions,
    locale: string = 'en-US'
  ): string => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
    return parsedDate.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    });
  };
  