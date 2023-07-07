import { sequelize, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'

const { DataTypes } = Sequelize

export const WaterConsumptions = sequelize.define(
  'water_consumptions',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    emailAddress: { type: DataTypes.STRING, allowNull: false },
    consumptionDate: { type: DataTypes.DATE, allowNull: false },
    litreAmount: { type: DataTypes.FLOAT, allowNull: false },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)
