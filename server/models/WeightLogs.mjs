import { sequelize, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'
import { Users } from './Users.mjs'

const { DataTypes } = Sequelize

export const WeightLogs = sequelize.define(
  'weight_logs',
  {
    weight_logs_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'user_id',
      },
    },
    weigh_in_timestamp: { type: DataTypes.DATE, allowNull: false },
    kg_amount: { type: DataTypes.FLOAT, allowNull: false },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)
