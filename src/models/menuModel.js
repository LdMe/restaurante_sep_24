import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Menu = sequelize.define('menu',{
    menu_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.SMALLINT.UNSIGNED,
        allowNull:false
    }
})

export default Menu;