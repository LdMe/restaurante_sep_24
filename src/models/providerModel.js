import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Provider = sequelize.define('provider', {
    provider_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Provider;