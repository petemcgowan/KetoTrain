// converts Camelcase objects to snake case, which is the database standard
export function toSnakeCase(obj) {
  const snakeCasedObject = {}

  for (const key in obj) {
    const snakeCasedKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    snakeCasedObject[snakeCasedKey] = obj[key]
  }

  return snakeCasedObject
}
