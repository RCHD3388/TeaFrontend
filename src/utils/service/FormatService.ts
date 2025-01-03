import { RequestStatus } from "../../types/staticData.types";

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

export const RequestStatusColors: { [key in RequestStatus]: string } = {
  [RequestStatus.MENUNGGU]: 'bg-yellow-100 text-yellow-800',
  [RequestStatus.DISETUJUI]: 'bg-green-100 text-green-800',
  [RequestStatus.DITOLAK]: 'bg-red-100 text-red-800',
  [RequestStatus.PROSES]: 'bg-blue-100 text-blue-800',
  [RequestStatus.PENGIRIMAN]: 'bg-indigo-100 text-indigo-800',
  [RequestStatus.DIBATALKAN]: 'bg-gray-100 text-gray-800',
  [RequestStatus.SELESAI]: 'bg-purple-100 text-purple-800',
};