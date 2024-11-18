import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Drink = sequelize.define('drink', {
    drink_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("juice", "water", "alcoholic", "infusion", "soft-drink"),
        defaultValue: "soft-drink"
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    }
});

export default Drink;