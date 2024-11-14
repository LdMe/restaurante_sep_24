import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Ingredient = sequelize.define('ingredient',{
    ingredient_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
})

export default Ingredient;