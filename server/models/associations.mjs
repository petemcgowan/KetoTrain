import { FoodFacts } from './FoodFacts.mjs'
import { ConsumptionLogs } from './ConsumptionLogs.mjs'
import { FavouriteFoods } from './FavouriteFoods.mjs'
import { WaterConsumptions } from './WaterConsumptions.mjs'
import { WeightLogs } from './WeightLogs.mjs'
import { Users } from './Users.mjs'

// Associations between FoodFacts and ConsumptionLogs
FoodFacts.hasMany(ConsumptionLogs, { foreignKey: 'food_facts_id' })
ConsumptionLogs.belongsTo(FoodFacts, { foreignKey: 'food_facts_id' })

FoodFacts.hasOne(FavouriteFoods, {
  foreignKey: 'food_facts_id',
  as: 'favouriteFoods',
})
FavouriteFoods.belongsTo(FoodFacts, { foreignKey: 'food_facts_id' })

// Associations
Users.hasMany(WaterConsumptions, { foreignKey: 'user_id' })
Users.hasMany(WeightLogs, { foreignKey: 'user_id' })
Users.hasMany(FavouriteFoods, { foreignKey: 'user_id' })
Users.hasMany(ConsumptionLogs, { foreignKey: 'user_id' })

export {
  FoodFacts,
  ConsumptionLogs,
  FavouriteFoods,
  WaterConsumptions,
  WeightLogs,
  Users,
}
