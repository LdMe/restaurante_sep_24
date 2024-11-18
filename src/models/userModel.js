import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const User = sequelize.define("user",{
    user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    last_name:{
        type: DataTypes.STRING(45),
        allowNull:true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    tel:{
        type:DataTypes.STRING(45),
        allowNull:true
    },
    role:{
        type: DataTypes.ENUM("client","staff","admin"),
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull:false
    }

})

export default User;