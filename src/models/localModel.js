import {DataTypes} from "sequelize";
import sequelize from "../config/sequelize.js";

const local = sequelize.define("local",{
    local_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:true
    }


})

export default local;