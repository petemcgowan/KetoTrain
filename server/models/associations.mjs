import { FoodFacts } from './FoodFacts.mjs'
import { ConsumptionLog } from './ConsumptionLog.mjs'

// Associations between FoodFacts and ConsumptionLog
FoodFacts.hasMany(ConsumptionLog, { foreignKey: 'food_facts_id' })
ConsumptionLog.belongsTo(FoodFacts, { foreignKey: 'food_facts_id' })

export { FoodFacts, ConsumptionLog }
