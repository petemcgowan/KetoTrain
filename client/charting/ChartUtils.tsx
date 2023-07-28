import { TrackerItemType } from '../types/TrackerItemType'
import { DataPoint } from '../components/GlycemicUtils'

export const getLast7Dates = () => {
  const result = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i - 1)
    result.push(d)
  }
  return result
}

export const aggregateCarbAmtByDay = (
  trackerItems: TrackerItemType[]
): DataPoint[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // set to midnight

  // Create Map to store the sum of carbAmt by date
  const carbSumByDay = new Map<string, number>()

  // Initialize map with last 7 days, set initial values to 0
  for (let i = 0; i < 7; i++) {
    const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
    const dateString = day.toISOString().split('T')[0] // Format as YYYY-MM-DD
    carbSumByDay.set(dateString, 0)
  }

  trackerItems.forEach((item) => {
    const consumptionDate = new Date(item.consumptionDate)
    const dateString = consumptionDate.toISOString().split('T')[0] // Format as YYYY-MM-DD

    // Sum carbAmt for each day
    if (carbSumByDay.has(dateString)) {
      carbSumByDay.set(dateString, carbSumByDay.get(dateString)! + item.carbAmt)
    }
  })

  // Convert Map to data points
  const dataPoints: DataPoint[] = Array.from(carbSumByDay).map(
    ([date, carbAmt]) => ({
      date,
      carbAmt,
    })
  )

  return dataPoints
}

export const getBarColor = (value: number) => {
  // // Analogous colors
  // if (value < 25) return 'hsl(180, 80%, 80%)' // Light Teal
  // if (value < 50) return 'hsl(160, 80%, 80%)' // Light Green
  // if (value < 75) return 'hsl(140, 80%, 80%)' // Light Lime
  // if (value < 100) return 'hsl(120, 80%, 80%)' // Light Chartreuse
  // if (value < 150) return 'hsl(100, 80%, 80%)' // Light Yellow
  // if (value < 200) return 'hsl(80, 80%, 80%)' // Light Gold
  // return 'hsl(60, 60%, 80%)' // Light Orange

  // Complementary colors
  // if (value < 25) return 'hsl(240, 80%, 80%)' // Light Blue
  // if (value < 50) return 'hsl(220, 80%, 80%)' // Light Azure
  // if (value < 75) return 'hsl(200, 80%, 80%)' // Light Sky Blue
  // if (value < 100) return 'hsl(180, 80%, 80%)' // Light Teal
  // if (value < 150) return 'hsl(80, 80%, 80%)' // Light Lime
  // if (value < 200) return 'hsl(70, 80%, 80%)' // Light Chartreuse
  // return 'hsl(60, 60%, 80%)' // Light Yellow

  // Triadic colors
  if (value < 20) return 'hsl(240, 80%, 80%)' // Light Blue
  if (value < 40) return 'hsl(200, 80%, 80%)' // Light Sky Blue
  if (value < 60) return 'hsl(160, 80%, 80%)' // Light Sea Green
  if (value < 80) return 'hsl(120, 80%, 80%)' // Light Green
  if (value < 100) return 'hsl(60, 80%, 80%)' // Light Yellow
  if (value < 140) return 'hsl(20, 80%, 80%)' // Light Orange
  return 'hsl(0, 60%, 80%)' // Light Red
}
