import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Ingredient from "./ingredientModel.js";

const Dish = sequelize.define('dish',{
    dish_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    price:{
        type:DataTypes.SMALLINT.UNSIGNED,
        allowNull:false
    },
    type:{
        type:DataTypes.ENUM("starter","first-course","second-course","dessert"),
        allowNull:false
    }
})

export default Dish;

Dish.belongsToMany(Ingredient, {through:"dish_has_ingredient",foreignKey:"dish_id"})
Ingredient.belongsToMany(Dish, {through:"dish_has_ingredient",foreignKey:"ingredient_id"})