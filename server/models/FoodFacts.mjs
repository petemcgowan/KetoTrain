import { sequelize, DISABLE_SEQUELIZE_DEFAULTS } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'

const { DataTypes } = Sequelize

export const FoodFacts = sequelize.define(
  'food_facts',
  {
    food_facts_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    food_name: { type: DataTypes.STRING, allowNull: false },
    public_food_key: { type: DataTypes.STRING, allowNull: false },
    calcium: { type: DataTypes.FLOAT, allowNull: false },
    carbohydrates: { type: DataTypes.FLOAT, allowNull: false },
    classification: { type: DataTypes.FLOAT, allowNull: false },
    energy: { type: DataTypes.FLOAT, allowNull: false },
    fat_total: { type: DataTypes.FLOAT, allowNull: false },
    iodine: { type: DataTypes.FLOAT, allowNull: false },
    magnesium: { type: DataTypes.FLOAT, allowNull: false },
    potassium: { type: DataTypes.FLOAT, allowNull: false },
    protein: { type: DataTypes.FLOAT, allowNull: false },
    saturated_fat: { type: DataTypes.FLOAT, allowNull: false },
    sodium: { type: DataTypes.FLOAT, allowNull: false },
    total_dietary_fibre: { type: DataTypes.FLOAT, allowNull: false },
    total_sugars: { type: DataTypes.FLOAT, allowNull: false },
    creation_ts: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    last_modified_ts: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
)
