import { FoodFacts, ConsumptionLog } from '../models/associations.mjs'
import { Op } from 'sequelize'

export async function setAllFoodFacts(newFoodFacts) {
  try {
    console.log('****REWRITE THIS setAllFoodFacts')
  } catch (error) {
    console.error('setAllFoodFacts, error:' + error)
  }
}

export async function getConsumptionLogWithFoodFacts(consumptionDate, userId) {
  try {
    console.log(
      'getConsumptionLogWithFoodFacts, consumptionDate:' +
        consumptionDate +
        ', userId:' +
        userId
    )
    // Perform a join operation to retrieve data from both tables
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
    // Transform the data into the desired format
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

export async function getAllFoodFacts() {
  try {
    const allFoodFacts = await FoodFacts.findAll()
    console.log('****Has retrieved all help')
    return allFoodFacts
  } catch (error) {
    console.error('getAllFoodFacts, error:' + error)
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
