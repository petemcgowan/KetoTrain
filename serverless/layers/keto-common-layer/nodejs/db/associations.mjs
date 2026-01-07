// db/associations.mjs (Inside the layer)

import { FoodFacts as FoodFactsDef } from '../models/FoodFacts.mjs';
import { FavouriteFoods as FavouriteFoodsDef } from '../models/FavouriteFoods.mjs';
import { Users as UsersDef } from '../models/Users.mjs';

export const setupAssociations = (sequelizeInstance) => {
  const FoodFactsModel = FoodFactsDef(sequelizeInstance);
  const FavouriteFoodsModel = FavouriteFoodsDef(sequelizeInstance);
  const UsersModel = UsersDef(sequelizeInstance); // Assuming UsersDef is defined

  FoodFactsModel.hasOne(FavouriteFoodsModel, {
    foreignKey: 'food_facts_id',
    as: 'favouriteFoods',
  });
  FavouriteFoodsModel.belongsTo(FoodFactsModel, { foreignKey: 'food_facts_id' });

  UsersModel.hasMany(FavouriteFoodsModel, { foreignKey: 'user_id' });
  FavouriteFoodsModel.belongsTo(UsersModel, { foreignKey: 'user_id' });

  // Return the initialized models so the handler can use them
  return { FoodFactsModel, FavouriteFoodsModel, UsersModel };
};