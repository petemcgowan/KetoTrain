
import { Users } from './Users.mjs'
import { DataTypes, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs';

export const WaterConsumptions = (sequelizeInstance) => {
  return sequelizeInstance.define(
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
