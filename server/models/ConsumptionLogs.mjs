import { sequelize } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'

const { DataTypes } = Sequelize

export const ConsumptionLogs = sequelize.define(
  'consumption_logs',
  {
    consumption_log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    food_facts_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'food_facts',
        key: 'food_facts_id',
      },
    },
    consumption_date: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    // created_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: Sequelize.NOW,
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: Sequelize.NOW,
    // },
  },
  {
    timestamps: false,
  }
)
