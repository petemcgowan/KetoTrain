import { Sequelize } from 'sequelize';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

import { FoodFacts as FoodFactsDef } from '/opt/nodejs/models/FoodFacts.mjs';
import { FavouriteFoods as FavouriteFoodsDef } from '/opt/nodejs/models/FavouriteFoods.mjs';
import { Users as UsersDef } from '/opt/nodejs/models/Users.mjs';
import { setupAssociations } from '/opt/nodejs/db/associations.mjs';

let sequelizeInstance;
let FoodFactsModel;
let FavouriteFoodsModel;
let UsersModel;

const SECRET_NAME = 'keto-train/postgres-credentials';
const REGION = process.env.AWS_REGION || 'us-east-1';

// --- Database Connection and Model Initialization Function ---
async function initializeDatabase() {
    if (sequelizeInstance && FoodFactsModel && FavouriteFoodsModel) {
        console.log('Database and models already initialized.');
        return;
    }

    console.log('Initializing database connection and models...');
    const secretsManager = new SecretsManagerClient({ region: REGION });

    try {
        const data = await secretsManager.send(new GetSecretValueCommand({ SecretId: SECRET_NAME }));
        const secret = JSON.parse(data.SecretString);

        // Instantiate Sequelize with secrets
        sequelizeInstance = new Sequelize({
            database: secret.dbname,
            username: secret.username,
            host: secret.host,
            port: secret.port,
            password: secret.password,
            dialect: 'postgres',
            operatorsAliases: 0,
            freezeTableName: true,
            timestamps: false,
            logging: false,
        });

        await sequelizeInstance.authenticate();
        console.log('Database connection has been established successfully.');

        FoodFactsModel = FoodFactsDef(sequelizeInstance);
        FavouriteFoodsModel = FavouriteFoodsDef(sequelizeInstance);
        UsersModel = UsersDef(sequelizeInstance);

        setupAssociations(sequelizeInstance);

    } catch (error) {
        console.error('Error during database or model initialization:', error);
        throw new Error('Database initialization failed.');
    }
}

export const handler = async (event) => {
    await initializeDatabase();

    const userId = event.pathParameters ? event.pathParameters.userId : event.queryStringParameters ? event.queryStringParameters.userId : null;

    if (!userId) {
        console.error('User ID is required but not provided.');
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'User ID is required.' }),
        };
    }

    console.log(`Fetching favourite food facts for userId: ${userId}`);

    try {
        const allFoodFactsFavs = await FoodFactsModel.findAll({
            raw: true,
            include: {
                model: FavouriteFoodsModel,
                as: 'favouriteFoods',
                where: { user_id: userId },
                required: true,
            },
            attributes: {
                include: [[sequelizeInstance.literal(`true`), 'isFavourite']],
            },
            order: [['food_name', 'ASC']],
        });

        console.log('Successfully fetched favourite food facts.');
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allFoodFactsFavs),
        };
    } catch (error) {
        console.error('getAllFoodFactsFavs Lambda execution error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};