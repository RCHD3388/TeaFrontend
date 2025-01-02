export const formatDateToLong = (isoString: string, shortMonth: boolean = false): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const monthShortNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = shortMonth ? monthShortNames[date.getMonth()] : monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatCurrency = (value: number, locale: string = 'id-ID', currency: string = 'IDR'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
};