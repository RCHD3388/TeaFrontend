export const formatDateToLong = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatCurrency = (value: number, locale: string = 'id-ID', currency: string = 'IDR'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
};