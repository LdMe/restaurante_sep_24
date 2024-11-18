import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const IngredientHistory = sequelize.define('ingredient_history', {
    ingredient_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    provider_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    ingredient_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provider_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        primaryKey: true
    }
});

export default IngredientHistory;