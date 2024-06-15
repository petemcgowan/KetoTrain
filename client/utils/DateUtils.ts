export const normalizeDate = (date: Date): Date => {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const day = date.getUTCDate()
  return new Date(Date.UTC(year, month, day))
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  const normalizedDate1 = normalizeDate(date1)
  const normalizedDate2 = normalizeDate(date2)
  return normalizedDate1.getTime() === normalizedDate2.getTime()
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const normalizedDate = normalizeDate(date)
  const year = normalizedDate.getUTCFullYear()
  const month = (normalizedDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = normalizedDate.getUTCDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
