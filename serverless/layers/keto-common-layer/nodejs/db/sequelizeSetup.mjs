/ db/sequelizeSetup.mjs (Inside the layer)
import Sequelize from 'sequelize';

// We no longer need to export DataTypes directly here if models will import Sequelize itself.
// The actual Sequelize instance creation will be handled in the Lambda handler using secrets.
// This file just provides helper constants if needed, or simply exports Sequelize.
export const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};
export const DataTypes = Sequelize.DataTypes; // Export DataTypes from Sequelize

