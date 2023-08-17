import { sequelize } from '../db/sequelizeSetup.mjs'
import Sequelize from 'sequelize'

const { DataTypes } = Sequelize

export const FavouriteFoods = sequelize.define(
  'favourite_foods',
  {
    favourite_foods_id: {
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)
