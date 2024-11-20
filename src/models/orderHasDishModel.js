import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


const OrderHasDish = sequelize.define("order_has_dish", {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    
})

export default OrderHasDish;