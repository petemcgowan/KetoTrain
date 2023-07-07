import {
  FoodFacts,
  FavouriteFoods,
  ConsumptionLogs,
  WaterConsumptions,
  WeightLogs,
} from '../models/associations.mjs'
import Sequelize, { Op } from 'sequelize'
import { sequelize } from '../db/sequelizeSetup.mjs'

export async function getConsumptionLogWithFoodFacts(consumptionDate, userId) {
  try {
    console.log(
      'getConsumptionLogWithFoodFacts, consumptionDate:' +
        consumptionDate +
        ', userId:' +
        userId
    )

    const logs = await ConsumptionLog.findAll({
      where: {
        // consumption_date: consumptionDate,
        user_id: userId,
      },
      include: [
        {
          model: FoodFacts,
          attributes: [
            'food_name',
            'public_food_key',
            'carbohydrates',
            'energy',
            'fat_total',
            'protein',
            'sodium',
            'total_dietary_fibre',
            'total_sugars',
          ],
        },
      ],
      attributes: ['consumption_log_id', 'consumption_date', 'food_facts_id'],
    })

    const result = logs.map((log) => {
      return {
        consumption_log_id: log.consumption_log_id,
        consumption_date: log.consumption_date,
        food_facts_id: log.food_facts_id,
        food_name: log.food_fact.food_name,
        public_food_key: log.food_fact.public_food_key,
        carbohydrates: log.food_fact.carbohydrates,
        energy: log.food_fact.energy,
        fat_total: log.food_fact.fat_total,
        protein: log.food_fact.protein,
        sodium: log.food_fact.sodium,
        total_dietary_fibre: log.food_fact.total_dietary_fibre,
        total_sugars: log.food_fact.total_sugars,
      }
    })

    return result
  } catch (error) {
    console.error('Error fetching consumption logs with food facts:', error)
    throw error
  }
}

export async function getAllFoodFacts(userId) {
  try {
    const allFoodFacts = await FoodFacts.findAll({
      raw: true,
      include: {
        model: FavouriteFoods,
        as: 'favouriteFoods',
        where: { user_id: userId },
        required: false,
      },
      // Customize the returned data using a map function
      attributes: {
        include: [
          [
            // Use Sequelize.literal to check if favourite_foods_id is null or not
            Sequelize.literal(`(
              CASE
                WHEN "favouriteFoods"."favourite_foods_id" IS NOT NULL THEN true
                ELSE false
              END
            )`),
            'isFavourite',
          ],
        ],
      },
    })

    return allFoodFacts
  } catch (error) {
    console.error('getAllFoodFacts, error:' + error)
  }
}

export async function getWaterConsumptions(userId) {
  try {
    const waterConsumptions = await WaterConsumptions.findAll({
      raw: true,
      include: {
        model: WaterConsumptions,
        as: 'waterConsumption',
        where: { user_id: userId },
        required: false,
      },
      attributes: [
        'water_consumption_id',
        'userId',
        'consumption_date',
        'litreAmount',
      ],
    })

    return waterConsumptions
  } catch (error) {
    console.error('getWaterConsumptions, error:' + error)
  }
}

export async function getWeightLogs(userId) {
  try {
    const weightLogs = await WeightLogs.findAll({
      raw: true,
      include: {
        model: WeightLogs,
        as: 'weightLogs',
        where: { user_id: userId },
        required: false,
      },
      attributes: ['weight_logs_id', 'userId', 'weighInTimestamp', 'kgAmount'],
    })

    return weightLogs
  } catch (error) {
    console.error('getWeightLogs, error:' + error)
  }
}

export async function fillFoodFacts() {
  try {
    // In case the tables have been deleted, sync will create them
    // await sequelize.sync()

    FoodFacts.bulkCreate(
      [
        {
          subHeading: 'Units',
          helpText: `Do you weigh yourself in pounds?  Stones and Pounds?  Kg?  Specify that on this page!\n\n\nDo you measure your height in cm (metric) or feet and inches (imperial)?\n\n\nSpecify here and we'll stick to that unless you change it here...\n`,
          References: [
            {
              shortTitle: null,
              title: null,
              link: null,
            },
          ],
        },
      ],
      {
        include: [References],
      }
    ).then((newFoodFacts) => {
      return newFoodFacts
    })
  } catch (error) {
    console.error('fillFoodFacts, error:' + error)
  }
}

export async function getAllConsumptionLog() {
  try {
    const allConsumptionLog = await ConsumptionLog.findAll()

    return allConsumptionLog
  } catch (error) {
    console.error('getAllConsumptionLog, error:' + error)
  }
}

export async function replaceConsumptionLogs(
  logs,
  dayToUpdate,
  toBeDeleted,
  toBeInserted
) {
  let t
  try {
    console.log('replaceConsumptionLogs called, logs: ', JSON.stringify(logs))
    console.log('replaceConsumptionLogs called, toBeDeleted: ', toBeDeleted)

    // Start a transaction
    t = await ConsumptionLog.sequelize.transaction()

    // Delete specific records based on consumption_date and food_facts_id
    if (toBeDeleted) {
      const foodFactsIdsToDelete = logs.map((log) => log.food_facts_id)
      console.log('foodFactsIdsToDelete:' + foodFactsIdsToDelete)

      await ConsumptionLog.destroy({
        where: {
          consumption_date: {
            [Op.eq]: dayToUpdate,
          },
          food_facts_id: {
            [Op.in]: foodFactsIdsToDelete,
          },
        },
        transaction: t,
      })
    }

    // Insert new records
    let newConsumptionLogs = []
    if (toBeInserted) {
      newConsumptionLogs = await ConsumptionLog.bulkCreate(logs, {
        transaction: t,
      })
    }

    // Commit the transaction
    await t.commit()

    return newConsumptionLogs
  } catch (error) {
    // Handle error and maybe rollback the transaction
    if (t) {
      await t.rollback()
    }
    console.error('Error replacing consumption logs:', error)
    throw error
  }
}

export async function setAllFoodFacts(newFoodFacts) {
  try {
  } catch (error) {
    console.error('setAllFoodFacts, error:' + error)
  }
}

export async function setFavouriteFoodsDB(favouriteFoods, userId) {
  try {
    const transaction = await sequelize.transaction()

    try {
      let createdFavouriteFood = null
      // Delete existing favorite foods
      await FavouriteFoods.destroy({
        where: {
          user_id: userId,
          food_facts_id: favouriteFoods[0].food_facts_id,
        },
        transaction,
      })
      console.log(
        'favouriteFoods[0].is_favourite:' + favouriteFoods[0].is_favourite
      )
      if (favouriteFoods[0].is_favourite) {
        console.log('Preparing new record:')
        // Prepare new record
        const newFavouriteFood = {
          food_facts_id: favouriteFoods[0].food_facts_id,
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
        }

        createdFavouriteFood = await FavouriteFoods.create(newFavouriteFood, {
          transaction,
        })
        // const createdFavouriteFood = await FavouriteFoods.create(
        //   newFavouriteFoods,
        //   { transaction }
        // )
      }
      await transaction.commit()

      return createdFavouriteFood
    } catch (error) {
      console.error('Error while setting favorite food:', error)
      throw error
    }
  } catch (error) {
    // Rollback if errors
    await transaction.rollback()
    console.error('Error starting transaction:', error)
    throw error
  }
}

export async function setWaterConsumptions(waterConsumptions) {
  try {
    const result = []
    for (let waterConsumptionEntry of waterConsumptions) {
      const [waterConsumptionRecord, created] = await WaterConsumptions.upsert(
        waterConsumptionEntry,
        {
          returning: true,
          where: {
            userId: waterConsumptionEntry.userId,
            consumptionDate: waterConsumptionEntry.consumptionDate,
          },
        }
      )
      console.log(
        'waterConsumptionRecord created or updated:',
        waterConsumptionRecord.dataValues
      )
      result.push(waterConsumptionRecord.dataValues)
    }
    return result
  } catch (error) {
    console.error('setWaterConsumption, error:', error)
  }
}

export async function setWeightLogs(weightLogs) {
  try {
    const result = []
    for (let weightLog of weightLogs) {
      const [weightLogRecord, created] = await WeightLogs.upsert(weightLog, {
        returning: true,
        where: {
          userId: weightLog.userId,
          consumptionDate: weightLog.consumptionDate,
        },
      })
      console.log('WeightLog created or updated:', weightLogRecord.dataValues)
      result.push(weightLogRecord.dataValues)
    }
    return result
  } catch (error) {
    console.error('setWeightLogs, error:', error)
  }
}
