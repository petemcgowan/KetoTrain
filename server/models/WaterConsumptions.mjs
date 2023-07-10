import { sequelize, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'
import { Users } from './Users.mjs'
const { DataTypes } = Sequelize

export const WaterConsumptions = sequelize.define(
  'water_consumptions',
  {
    water_consumptions_id: {
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
    consumption_date: { type: DataTypes.DATE, allowNull: false },
    litre_amount: { type: DataTypes.FLOAT, allowNull: false },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)
