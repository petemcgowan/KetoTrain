import { sequelize, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'

const { DataTypes } = Sequelize

export const WeightLogs = sequelize.define(
  'weight_logs',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    emailAddress: { type: DataTypes.STRING, allowNull: false },
    weighInTimestamp: { type: DataTypes.DATE, allowNull: false },
    kgAmount: { type: DataTypes.FLOAT, allowNull: false },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)
