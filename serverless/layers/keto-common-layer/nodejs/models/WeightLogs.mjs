
import { DataTypes, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs';


export const WeightLogs = (sequelizeInstance) => {
  return sequelizeInstance.define(
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
