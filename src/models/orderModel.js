import { DataTypes, NOW } from "sequelize";
import sequelize from "../config/sequelize.js";
import Client from "./clientModel.js";
import Local from "./localModel.js";
import Dish from "./dishModel.js";
import OrderHasDish from "./orderHasDishModel.js";


const Order = sequelize.define("order", {
    order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    status:{
        type:DataTypes.ENUM("open","closed"),
        defaultValue:"open"
    }
    
    /* 
    client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Client, // 'User' would also work
            key: 'client_id',
        },
    },
    local_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Local, // 'User' would also work
            key: 'local_id',
        },
    } */
})

Order.belongsTo(Client,{
    foreignKey: 'client_id',
  });
Client.hasMany(Order,{foreignKey:"client_id"});

Order.belongsTo(Local,{
    foreignKey: 'local_id',
  });
Local.hasMany(Order,{foreignKey:"local_id"});

Dish.belongsToMany(Order, {through:OrderHasDish,foreignKey:"dish_id"})
Order.belongsToMany(Dish, {through:OrderHasDish,foreignKey:"order_id"})



export default Order;