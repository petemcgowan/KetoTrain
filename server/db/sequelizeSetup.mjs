import Sequelize from 'sequelize'

export const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
}
const { DataTypes } = Sequelize

export const sequelize = new Sequelize({
  // TODO let the environment take care of these env variables, once things settle...
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  host: process.env.PGHOST,
  port: 5432,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  operatorsAliases: 0,
  freezeTableName: true,
  timestamps: false,
})
